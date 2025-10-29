import { Devvit, useState, useAsync, useInterval } from '@devvit/public-api'

interface GamePostProps {
  postId: string
  username: string
  userId: string
}

export const GamePost = (props: GamePostProps, context: Devvit.Context) => {
  const [gameActive, setGameActive] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [leaderboard, setLeaderboard] = useState<Array<{ username: string; score: number }>>([])

  // Load user's high score
  useAsync(async () => {
    const score = await context.redis.get(`user:${props.userId}:highscore`)
    if (score) {
      setHighScore(parseInt(score))
    }
  }, [props.userId])

  // Load leaderboard
  const loadLeaderboard = async () => {
    const scores = await context.redis.zRange('global:leaderboard', 0, 9, { 
      reverse: true, 
      by: 'score' 
    })
    
    const formattedScores = scores.map(entry => ({
      username: entry.member,
      score: entry.score
    }))
    
    setLeaderboard(formattedScores)
  }

  useAsync(loadLeaderboard, [])

  // Submit score function
  const submitScore = async (score: number) => {
    if (score > highScore) {
      // Update personal high score
      await context.redis.set(`user:${props.userId}:highscore`, score.toString())
      setHighScore(score)

      // Update global leaderboard
      await context.redis.zAdd('global:leaderboard', {
        member: props.username,
        score: score
      })

      // Reload leaderboard
      await loadLeaderboard()

      context.ui.showToast(`New High Score: ${score}! 🎉`)
    }
  }

  // Handle messages from the game iframe
  const onMessage = async (msg: any) => {
    if (msg.type === 'gameStart') {
      setGameActive(true)
      setCurrentScore(0)
    } else if (msg.type === 'gameOver') {
      setGameActive(false)
      const finalScore = msg.score || 0
      setCurrentScore(finalScore)
      await submitScore(finalScore)
    } else if (msg.type === 'scoreUpdate') {
      setCurrentScore(msg.score || 0)
    }
  }

  return (
    <vstack height="100%" width="100%" gap="medium">
      {/* Header */}
      <vstack padding="medium" backgroundColor="#1a1a2e" gap="small">
        <hstack width="100%" alignment="space-between middle">
          <text size="xxlarge" weight="bold" color="#00d4ff">
            🛩️ SKY RACER
          </text>
          <vstack alignment="end">
            <text size="small" color="#888">
              Pilot: {props.username}
            </text>
            <text size="medium" weight="bold" color="#ffd700">
              High Score: {highScore}
            </text>
          </vstack>
        </hstack>
        
        {gameActive && (
          <text size="large" weight="bold" color="#00ff88">
            Current: {currentScore}
          </text>
        )}
      </vstack>

      {/* Game Container */}
      <vstack grow>
        <webview
          id="game-webview"
          url="game.html"
          width="100%"
          height="100%"
          onMessage={onMessage}
        />
      </vstack>

      {/* Leaderboard Sidebar */}
      <vstack 
        padding="medium" 
        backgroundColor="rgba(0,0,0,0.8)" 
        gap="small"
        maxHeight="300px"
      >
        <text size="large" weight="bold" color="#ffd700">
          🏆 TOP 10 PILOTS
        </text>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <hstack key={`${entry.username}-${index}`} gap="small">
              <text 
                size="medium" 
                color={index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#ffffff'}
                weight={index < 3 ? 'bold' : 'regular'}
              >
                {index + 1}. {entry.username}
              </text>
              <text size="medium" color="#00d4ff">
                {entry.score}
              </text>
            </hstack>
          ))
        ) : (
          <text size="medium" color="#888">
            No scores yet. Be the first!
          </text>
        )}
      </vstack>

      {/* Controls Help */}
      <vstack padding="small" backgroundColor="#0f0f1e" gap="none">
        <text size="small" color="#888">
          Controls: W/↑ Up • S/↓ Down • A/D ←/→ Barrel Roll • Space Boost • Q/E Loop
        </text>
      </vstack>
    </vstack>
  )
}
