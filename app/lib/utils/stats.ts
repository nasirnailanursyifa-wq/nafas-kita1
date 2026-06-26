import fs from 'fs'
import path from 'path'
import { createClient } from '@vercel/kv'

const STATS_FILE = path.join(process.cwd(), 'data', 'visitor-stats.json')

interface VisitorStats {
  totalVisits: number
}

// Memory global fallback agar server tidak crash di Vercel ketika filesystem bersifat read-only
const globalStore = global as any
if (!globalStore.activeSessions) {
  globalStore.activeSessions = new Map<string, number>()
}
if (typeof globalStore.localTotalVisits !== 'number') {
  globalStore.localTotalVisits = 0
}

const activeSessions = globalStore.activeSessions as Map<string, number>

// Mendapatkan kredensial Redis secara dinamis dari berbagai kemungkinan prefix yang dibuat Vercel/Upstash
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_URL
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_TOKEN

const isKVConfigured = !!(redisUrl && redisToken)

const kvClient = isKVConfigured ? createClient({
  url: redisUrl,
  token: redisToken,
}) : null

// Menyiapkan folder dan file data lokal jika memungkinkan
function initializeStatsFile() {
  try {
    const dir = path.dirname(STATS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(STATS_FILE)) {
      fs.writeFileSync(STATS_FILE, JSON.stringify({ totalVisits: 0 }, null, 2))
    }
  } catch (err) {
    // Mengabaikan error jika filesystem read-only di Vercel
    console.warn('Filesystem is read-only, using memory fallback.')
  }
}

// Membersihkan session lokal yang tidak aktif (> 25 detik)
function cleanAndGetActiveCountLocal() {
  const now = Date.now()
  const timeout = 25000
  for (const [id, timestamp] of activeSessions.entries()) {
    if (now - timestamp > timeout) {
      activeSessions.delete(id)
    }
  }
  return Math.max(1, activeSessions.size)
}

export async function getStats() {
  if (isKVConfigured && kvClient) {
    try {
      const now = Date.now()
      const timeout = 25000
      
      // Hapus session kedaluwarsa dari Redis sorted set
      await kvClient.zremrangebyscore('active_users', 0, now - timeout)
      
      // Ambil total kunjungan dan user aktif
      const totalVisitsVal = await kvClient.get<number>('total_visits')
      const activeUsersCount = await kvClient.zcard('active_users')
      
      return {
        totalVisits: totalVisitsVal || 0,
        activeUsers: Math.max(1, activeUsersCount)
      }
    } catch (error) {
      console.error('Error fetching stats from Vercel KV:', error)
    }
  }
  
  // Local fallback (file system or in-memory)
  initializeStatsFile()
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf-8')
      const parsed = JSON.parse(data) as VisitorStats
      globalStore.localTotalVisits = Math.max(globalStore.localTotalVisits, parsed.totalVisits || 0)
    }
  } catch (error) {
    console.warn('Failed to read stats file, using memory value.')
  }

  return {
    totalVisits: globalStore.localTotalVisits,
    activeUsers: cleanAndGetActiveCountLocal()
  }
}

export async function registerVisit(sessionId: string) {
  if (isKVConfigured && kvClient) {
    try {
      const total = await kvClient.incr('total_visits')
      await trackActive(sessionId)
      const activeCount = await kvClient.zcard('active_users')
      return {
        totalVisits: total,
        activeUsers: Math.max(1, activeCount)
      }
    } catch (error) {
      console.error('Error registering visit in Vercel KV:', error)
    }
  }

  // Local fallback (file system or in-memory)
  globalStore.localTotalVisits += 1
  initializeStatsFile()
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify({ totalVisits: globalStore.localTotalVisits }, null, 2))
  } catch (error) {
    console.warn('Failed to write stats file, updated in-memory total to', globalStore.localTotalVisits)
  }
  
  trackActiveLocal(sessionId)
  
  return {
    totalVisits: globalStore.localTotalVisits,
    activeUsers: cleanAndGetActiveCountLocal()
  }
}

export async function trackActive(sessionId: string) {
  if (isKVConfigured && kvClient) {
    try {
      const now = Date.now()
      await kvClient.zadd('active_users', { score: now, member: sessionId })
      const timeout = 25000
      await kvClient.zremrangebyscore('active_users', 0, now - timeout)
      
      const totalVisitsVal = await kvClient.get<number>('total_visits')
      const activeCount = await kvClient.zcard('active_users')
      
      return {
        totalVisits: totalVisitsVal || 0,
        activeUsers: Math.max(1, activeCount)
      }
    } catch (error) {
      console.error('Error tracking active in Vercel KV:', error)
    }
  }

  // Local fallback
  trackActiveLocal(sessionId)
  return await getStats()
}

function trackActiveLocal(sessionId: string) {
  activeSessions.set(sessionId, Date.now())
}
