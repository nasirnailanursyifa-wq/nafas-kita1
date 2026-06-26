'use client'

import { useState, useEffect } from 'react'

interface Stats {
  totalVisits: number
  activeUsers: number
}

// Global listener list to share state across components using the hook
const listeners = new Set<(stats: Stats) => void>()
let globalStats: Stats = { totalVisits: 0, activeUsers: 0 }
let hasInitialized = false
let globalSessionId = ''

export function useVisitorStats() {
  const [stats, setStats] = useState<Stats>(globalStats)
  const [loading, setLoading] = useState(!hasInitialized)

  useEffect(() => {
    // Sync local component state with global stats
    setStats(globalStats)
    const listener = (newStats: Stats) => {
      setStats(newStats)
      setLoading(false)
    }
    listeners.add(listener)

    if (hasInitialized) {
      setLoading(false)
      return () => {
        listeners.delete(listener)
      }
    }

    hasInitialized = true

    // Generate unique session ID for the tab if not present
    let sessionId = sessionStorage.getItem('visitor_session_id')
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now()
      sessionStorage.setItem('visitor_session_id', sessionId)
    }
    globalSessionId = sessionId

    // Check if this is a first-time visit in this browser (using localStorage)
    const hasVisited = localStorage.getItem('has_visited_udara_yang_sama')

    const updateStats = (newStats: Stats) => {
      globalStats = newStats
      listeners.forEach(l => l(newStats))
    }

    const sendRequest = async (type: 'visit' | 'heartbeat') => {
      try {
        const response = await fetch('/api/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, sessionId: globalSessionId }),
        })
        if (response.ok) {
          const data = await response.json()
          updateStats(data)
        }
      } catch (error) {
        console.error('Error sending visitor stats request:', error)
      }
    }

    const initStats = async () => {
      if (!hasVisited) {
        // First time visitor -> register visit
        await sendRequest('visit')
        localStorage.setItem('has_visited_udara_yang_sama', 'true')
      } else {
        // Returning visitor -> send heartbeat and get stats
        await sendRequest('heartbeat')
      }
    }

    initStats()

    // Setup interval for heartbeat (every 15 seconds)
    const intervalId = setInterval(() => {
      sendRequest('heartbeat')
    }, 15000)

    return () => {
      listeners.delete(listener)
      clearInterval(intervalId)
    }
  }, [])

  return { stats, loading }
}
