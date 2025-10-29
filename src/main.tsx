import { Devvit, useState, useAsync, useChannel } from '@devvit/public-api'

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
})

// Custom post type for the game
Devvit.addCustomPostType({
  name: 'Sky Racer',
  height: 'tall',
  render: (context) => {
    const [username] = useState(async () => {
      const user = await context.reddit.getCurrentUser()
      return user?.username ?? 'Player'
    })

    const [userId] = useState(async () => {
      const user = await context.reddit.getCurrentUser()
      return user?.id ?? 'anonymous'
    })

    const [highScore, setHighScore] = useState(0)
    const [currentScore, setCurrentScore] = useState(0)
    const [gameActive, setGameActive] = useState(false)
    const [leaderboard, setLeaderboard] = useState<Array<{ member: string; score: number }>>([])

    // Load user's high score
    useAsync(async () => {
      const user = await context.reddit.getCurrentUser()
      if (!user) return
      const score = await context.redis.get(`user:${user.id}:highscore`)
      if (score) {
        setHighScore(parseInt(score))
      }
    })

    // Load leaderboard
    const loadLeaderboard = async () => {
      const scores = await context.redis.zRange('global:leaderboard', 0, 9, { reverse: true })
      setLeaderboard(scores)
    }

    useAsync(loadLeaderboard)

    // Handle game messages
    const onMessage = async (msg: any) => {
      if (msg.type === 'gameStart') {
        setGameActive(true)
        setCurrentScore(0)
      } else if (msg.type === 'gameOver') {
        setGameActive(false)
        const finalScore = msg.score || 0
        setCurrentScore(finalScore)
        
        // Submit score
        if (finalScore > highScore) {
          const user = await context.reddit.getCurrentUser()
          if (user) {
            await context.redis.set(`user:${user.id}:highscore`, finalScore.toString())
            await context.redis.zAdd('global:leaderboard', {
              member: user.username,
              score: finalScore
            })
            setHighScore(finalScore)
            await loadLeaderboard()
            context.ui.showToast(`🎉 New High Score: ${finalScore}!`)
          }
        }
      } else if (msg.type === 'scoreUpdate') {
        setCurrentScore(msg.score || 0)
      }
    }

    return (
      <vstack height="100%" width="100%" gap="none">
        {/* Header */}
        <vstack padding="medium" backgroundColor="#1a1a2e" gap="small">
          <hstack width="100%" alignment="space-between middle">
            <text size="xxlarge" weight="bold" color="#00d4ff">
              🛩️ SKY RACER
            </text>
            <vstack alignment="end">
              <text size="small" color="#888">
                Pilot: {username}
              </text>
              <text size="medium" weight="bold" color="#ffd700">
                Best: {highScore}
              </text>
            </vstack>
          </hstack>
          
          {gameActive && (
            <text size="large" weight="bold" color="#00ff88">
              Score: {currentScore}
            </text>
          )}
        </vstack>

        {/* Game Container - Temporary: Using local build */}
        <vstack grow alignment="center middle" backgroundColor="#1a1a2e">
          <text size="xxlarge" color="#00d4ff">🛩️</text>
          <spacer size="medium" />
          <text size="large" color="#ffffff">Sky Racer</text>
          <spacer size="small" />
          <text size="medium" color="#888">Game loading...</text>
          <spacer size="small" />
          <text size="small" color="#666">
            Webview integration in progress
          </text>
        </vstack>

        {/* Leaderboard */}
        <vstack 
          padding="medium" 
          backgroundColor="rgba(0,0,0,0.9)" 
          gap="small"
          maxHeight="250px"
        >
          <text size="large" weight="bold" color="#ffd700">
            🏆 TOP 10 PILOTS
          </text>
          {leaderboard.length > 0 ? (
            leaderboard.slice(0, 10).map((entry, index) => (
              <hstack key={`${entry.member}-${index}`} gap="medium" alignment="space-between">
                <text 
                  size="medium" 
                  color={index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#ffffff'}
                  weight={index < 3 ? 'bold' : 'regular'}
                >
                  {index + 1}. {entry.member}
                </text>
                <text size="medium" color="#00d4ff" weight="bold">
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

        {/* Controls */}
        <vstack padding="small" backgroundColor="#0f0f1e">
          <text size="small" color="#888" alignment="center">
            W/↑ Up • S/↓ Down • A Barrel Roll • D/Space Boost • Q/E Loop
          </text>
        </vstack>
      </vstack>
    )
  },
})

// Menu action to create a game post
Devvit.addMenuItem({
  label: 'Create Sky Racer Game',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context
    const subreddit = await reddit.getCurrentSubreddit()

    const post = await reddit.submitPost({
      title: '🛩️ Sky Racer - Fly Through The City!',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="center middle" backgroundColor="#0a0a1e" padding="large">
          <vstack 
            backgroundColor="rgba(0, 212, 255, 0.1)" 
            padding="xlarge" 
            cornerRadius="large"
            border="thick"
            borderColor="#00d4ff"
            alignment="center middle"
            gap="medium"
          >
            <text size="xxlarge" weight="bold" color="#00d4ff">🛩️</text>
            <text size="xxlarge" weight="bold" color="#00d4ff">SKY RACER</text>
            <text size="large" weight="bold" color="#ffffff">Click to Play!</text>
            <spacer size="small" />
            <text size="medium" color="#00ff88" alignment="center">
              Fly through the city
            </text>
            <text size="medium" color="#ffd700" alignment="center">
              Compete for high scores
            </text>
          </vstack>
        </vstack>
      ),
    })

    ui.showToast('🛩️ Sky Racer game created!')
    ui.navigateTo(post)
  },
})

export default Devvit
