import fs from 'fs'
import path from 'path'

const STATS_FILE = path.join(process.cwd(), 'data', 'visitor-stats.json')

interface VisitorStats {
  totalVisits: number
}

// Menyiapkan folder dan file data jika belum ada
function initializeStatsFile() {
  const dir = path.dirname(STATS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(STATS_FILE, JSON.stringify({ totalVisits: 0 }, null, 2))
  }
}

// Mendapatkan store activeSession di level global node agar terhindar dari reset HMR (Hot Module Replacement)
const globalStore = global as any

if (!globalStore.activeSessions) {
  globalStore.activeSessions = new Map<string, number>()
}

const activeSessions = globalStore.activeSessions as Map<string, number>

// Membersihkan session yang sudah tidak aktif (timeout > 25 detik)
function cleanAndGetActiveCount() {
  const now = Date.now()
  const timeout = 25000 // 25 detik tanpa heartbeat dianggap offline
  for (const [id, timestamp] of activeSessions.entries()) {
    if (now - timestamp > timeout) {
      activeSessions.delete(id)
    }
  }
  // Selalu minimal 1 jika ada request masuk (karena pengirim request pasti aktif)
  return Math.max(1, activeSessions.size)
}

export function getStats() {
  initializeStatsFile()
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    const parsed = JSON.parse(data) as VisitorStats
    return {
      totalVisits: parsed.totalVisits || 0,
      activeUsers: cleanAndGetActiveCount()
    }
  } catch (error) {
    console.error('Error reading stats file:', error)
    return {
      totalVisits: 0,
      activeUsers: cleanAndGetActiveCount()
    }
  }
}

export function registerVisit(sessionId: string) {
  initializeStatsFile()
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8')
    const parsed = JSON.parse(data) as VisitorStats
    parsed.totalVisits = (parsed.totalVisits || 0) + 1
    fs.writeFileSync(STATS_FILE, JSON.stringify(parsed, null, 2))
    
    // Daftarkan juga sebagai sesi aktif
    trackActive(sessionId)
    
    return {
      totalVisits: parsed.totalVisits,
      activeUsers: cleanAndGetActiveCount()
    }
  } catch (error) {
    console.error('Error registering visit:', error)
    return getStats()
  }
}

export function trackActive(sessionId: string) {
  activeSessions.set(sessionId, Date.now())
  return {
    totalVisits: getStats().totalVisits,
    activeUsers: cleanAndGetActiveCount()
  }
}
