import { useEffect, useCallback, useState } from 'react'

interface DevvitMessage {
  type: 'gameStart' | 'gameOver' | 'scoreUpdate'
  score?: number
  data?: any
}

export function useDevvitBridge() {
  const isInDevvit = typeof window !== 'undefined' && window.parent !== window
  const [playCount, setPlayCount] = useState(0)

  // Fetch play count on mount
  useEffect(() => {
    const fetchPlayCount = async () => {
      try {
        const response = await fetch('/api/play-count')
        const data = await response.json()
        setPlayCount(data.count || 0)
      } catch (e) {
        console.error('Failed to fetch play count:', e)
      }
    }
    fetchPlayCount()
  }, [])

  const sendMessage = useCallback((message: DevvitMessage) => {
    if (isInDevvit) {
      window.parent.postMessage(message, '*')
    }
  }, [isInDevvit])

  const notifyGameStart = useCallback(async () => {
    sendMessage({ type: 'gameStart' })
    
    // Increment play count
    try {
      const response = await fetch('/api/increment-plays', { method: 'POST' })
      const data = await response.json()
      setPlayCount(data.count || 0)
    } catch (e) {
      console.error('Failed to increment plays:', e)
    }
  }, [sendMessage])

  const notifyGameOver = useCallback(async (score: number) => {
    sendMessage({ type: 'gameOver', score })
    
    // Save score to Redis
    if (isInDevvit) {
      try {
        await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score })
        })
      } catch (e) {
        console.error('Failed to save score:', e)
      }
    }
  }, [sendMessage, isInDevvit])

  const notifyScoreUpdate = useCallback((score: number) => {
    sendMessage({ type: 'scoreUpdate', score })
  }, [sendMessage])

  return {
    isInDevvit,
    playCount,
    notifyGameStart,
    notifyGameOver,
    notifyScoreUpdate,
  }
}
