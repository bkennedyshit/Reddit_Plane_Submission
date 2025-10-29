import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'

interface LeaderboardEntry {
  member: string
  score: number
}

interface LeaderboardProps {
  currentScore?: number
  isVisible: boolean
}

export function Leaderboard({ currentScore, isVisible }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isVisible) {
      fetchLeaderboard()
    }
  }, [isVisible, currentScore])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()
      setLeaderboard(data.leaderboard || [])
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <Card className="bg-black/90 border-gray-600 p-4 max-w-md w-full">
      <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
        🏆 TOP PILOTS
      </h3>
      
      {loading ? (
        <div className="text-gray-400 text-center py-4">Loading...</div>
      ) : leaderboard.length === 0 ? (
        <div className="text-gray-400 text-center py-4">
          No scores yet. Be the first!
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <div
              key={`${entry.member}-${index}`}
              className={`flex items-center justify-between p-2 rounded ${
                index === 0
                  ? 'bg-yellow-600/20 border border-yellow-600/50'
                  : index === 1
                  ? 'bg-gray-400/20 border border-gray-400/50'
                  : index === 2
                  ? 'bg-orange-600/20 border border-orange-600/50'
                  : 'bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-300' :
                  index === 2 ? 'text-orange-400' :
                  'text-gray-500'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </span>
                <span className="text-white font-medium">
                  u/{entry.member}
                </span>
              </div>
              <span className="text-cyan-400 font-bold">
                {entry.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {currentScore !== undefined && currentScore > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between p-2 bg-cyan-600/20 border border-cyan-600/50 rounded">
            <span className="text-white font-medium">Your Score</span>
            <span className="text-cyan-400 font-bold">
              {currentScore.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </Card>
  )
}
