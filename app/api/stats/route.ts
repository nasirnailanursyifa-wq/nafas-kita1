import { NextResponse } from 'next/server'
import { getStats, registerVisit, trackActive } from '@/app/lib/utils/stats'

export async function GET() {
  try {
    const stats = getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error in GET /api/stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { type, sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }
    
    let stats
    if (type === 'visit') {
      stats = registerVisit(sessionId)
    } else {
      stats = trackActive(sessionId)
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error in POST /api/stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
