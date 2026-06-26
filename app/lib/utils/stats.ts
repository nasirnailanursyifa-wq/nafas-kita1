import fs from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'

const STATS_FILE = path.join(process.cwd(), 'data', 'visitor-stats.json')

interface VisitorStats {
  totalVisits: number
}

// Menyiapkan folder dan file data lokal jika belum ada (fallback)
function initializeStatsFile() {
  const dir = path.dirname(STATS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(STATS_FILE, JSON.stringify({ totalVisits: 0 }, null, 2))
  }
}

// Store lokal untuk session aktif
const globalStore = global as any
if (!globalStore.activeSessions) {
  globalStore.activeSessions = new Map<string, number>()
}
const activeSessions = globalStore.activeSessions as Map<string, number>

// Membersihkan session lokal yang tidak aktif (> 25 detik)
function cleanAndGetActiveCountLocal() {
  const now = Date.now()
  const timeout = 25000 // 25 detik tanpa heartbeat dianggap offline
  for (const [id, timestamp] of activeSessions.entries()) {
    if (now - timestamp > timeout) {
      activeSessions.delete(id)
    }
  }
  return Math.max(1, activeSessions.size)
}

// Cek apakah kredensial Vercel KV terkonfigurasi di env variable
const isKVConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

export async function getStats() {
  if (isKVConfigured) {
    try {
      const now = Date.now()
      const timeout = 25000
      
      // Hapus session kedaluwarsa dari Redis sorted set
      await kv.zremrangebyscore('active_users', 0, now - timeout)
      
      // Dapatkan total kunjungan dan jumlah user aktif dari Redis
      const totalVisitsVal = await kv.get<number>('total_visits')
      const activeUsersCount = await kv.zcard('active_users')
      
      return {
        totalVisits: totalVisitsVal || 0,
        activeUsers: Math.max(1, activeUsersCount)
      }
    } catch (error) {
      console.error('Error fetching stats from Vercel KV:', error)
      // Jika terjadi error, backend akan otomatis fallback ke penyimpanan lokal di bawah
    }
  }
  
  // Penyimpanan lokal (fallback)
  initializeStatsFile()
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    const parsed = JSON.parse(data) as VisitorStats
    return {
      totalVisits: parsed.totalVisits || 0,
      activeUsers: cleanAndGetActiveCountLocal()
    }
  } catch (error) {
    console.error('Error reading local stats file:', error)
    return {
      totalVisits: 0,
      activeUsers: cleanAndGetActiveCountLocal()
    }
  }
}

export async function registerVisit(sessionId: string) {
  if (isKVConfigured) {
    try {
      // Tingkatkan total kunjungan di Redis
      const total = await kv.incr('total_visits')
      
      // Catat sebagai user aktif
      await trackActive(sessionId)
      
      const activeCount = await kv.zcard('active_users')
      return {
        totalVisits: total,
        activeUsers: Math.max(1, activeCount)
      }
    } catch (error) {
      console.error('Error registering visit in Vercel KV:', error)
      // Jika gagal, gunakan fallback lokal
    }
  }

  // Penyimpanan lokal (fallback)
  initializeStatsFile()
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    const parsed = JSON.parse(data) as VisitorStats
    parsed.totalVisits = (parsed.totalVisits || 0) + 1
    fs.writeFileSync(STATS_FILE, JSON.stringify(parsed, null, 2))
    
    trackActiveLocal(sessionId)
    
    return {
      totalVisits: parsed.totalVisits,
      activeUsers: cleanAndGetActiveCountLocal()
    }
  } catch (error) {
    console.error('Error registering local visit:', error)
    return await getStats()
  }
}

export async function trackActive(sessionId: string) {
  if (isKVConfigured) {
    try {
      const now = Date.now()
      // Tambahkan atau perbarui session dengan timestamp saat ini sebagai score
      await kv.zadd('active_users', { score: now, member: sessionId })
      
      // Hapus session kedaluwarsa dari Redis
      const timeout = 25000
      await kv.zremrangebyscore('active_users', 0, now - timeout)
      
      const totalVisitsVal = await kv.get<number>('total_visits')
      const activeCount = await kv.zcard('active_users')
      
      return {
        totalVisits: totalVisitsVal || 0,
        activeUsers: Math.max(1, activeCount)
      }
    } catch (error) {
      console.error('Error tracking active in Vercel KV:', error)
      // Jika gagal, gunakan fallback lokal
    }
  }

  // Penyimpanan lokal (fallback)
  trackActiveLocal(sessionId)
  return await getStats()
}

function trackActiveLocal(sessionId: string) {
  activeSessions.set(sessionId, Date.now())
}
