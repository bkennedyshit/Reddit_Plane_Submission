import { Devvit } from '@devvit/public-api'
import { useState, useEffect, useCallback } from '@devvit/public-api'
import { BMXBackground } from '../../components/BMXBackground'
import { BMXPlayer } from '../../components/game/BMXPlayer'
import { GameObstacles } from '../../components/game/GameObstacles'
import { GameUI } from '../../components/game/GameUI'

interface GameSessionData {
  id: string
  players: PlayerData[]
  spectators: string[]
  status: 'waiting' | 'active' | 'finished'
  settings: GameSettings
  createdAt: number
  finishedAt?: number
}

interface PlayerData {
  userId: string
  username: string
  score: number
  position: number
  isAlive: boolean
  joinedAt: number
}

interface GameSettings {
  mode: 'single' | 'challenge' | 'global'
  difficulty: 'easy' | 'medium' | 'hard'
  maxPlayers: number
  timeLimit?: number
}

export function GameSession({ sessionId, postId }: { sessionId: string; postId: string }) {
  const [session, setSession] = useState<GameSessionData | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PlayerData | null>(null)
  const [gameState, setGameState] = useState<any>(null)

  // Load session data
  useEffect(() => {
    loadSession()
  }, [sessionId])

  const loadSession = useCallback(async () => {
    try {
      const sessionData = await Devvit.redis.get(`game-session:${sessionId}`)
      if (sessionData) {
        setSession(JSON.parse(sessionData))
      }
    } catch (error) {
      console.error('Failed to load session:', error)
    }
  }, [sessionId])

  // Join game session
  const joinGame = useCallback(async () => {
    if (!session) return

    try {
      const user = await Devvit.reddit.getCurrentUser()

      const playerData: PlayerData = {
        userId: user.id,
        username: user.username,
        score: 0,
        position: session.players.length + 1,
        isAlive: true,
        joinedAt: Date.now()
      }

      const updatedPlayers = [...session.players, playerData]
      const updatedSession = { ...session, players: updatedPlayers }

      await Devvit.redis.set(`game-session:${sessionId}`, JSON.stringify(updatedSession))
      setCurrentPlayer(playerData)
      setSession(updatedSession)

      // Notify other players
      await Devvit.redis.publish(
        `game-updates:${postId}`,
        JSON.stringify({
          type: 'player_joined',
          player: playerData,
          sessionId
        })
      )
    } catch (error) {
      console.error('Failed to join game:', error)
    }
  }, [session, sessionId, postId])

  // Update player score
  const updateScore = useCallback(async (newScore: number) => {
    if (!currentPlayer || !session) return

    try {
      const updatedPlayer = { ...currentPlayer, score: newScore }
      const updatedPlayers = session.players.map(p =>
        p.userId === currentPlayer.userId ? updatedPlayer : p
      )

      const updatedSession = { ...session, players: updatedPlayers }
      await Devvit.redis.set(`game-session:${sessionId}`, JSON.stringify(updatedSession))

      setCurrentPlayer(updatedPlayer)
      setSession(updatedSession)

      // Publish score update
      await Devvit.redis.publish(
        `game-updates:${postId}`,
        JSON.stringify({
          type: 'score_update',
          player: updatedPlayer,
          sessionId
        })
      )
    } catch (error) {
      console.error('Failed to update score:', error)
    }
  }, [currentPlayer, session, sessionId, postId])

  // Listen for game updates
  useEffect(() => {
    const unsubscribe = Devvit.redis.subscribe(
      `game-updates:${postId}`,
      (message) => {
        const update = JSON.parse(message)
        if (update.sessionId === sessionId) {
          switch (update.type) {
            case 'player_joined':
              setSession(prev => prev ? {
                ...prev,
                players: [...prev.players, update.player]
              } : null)
              break
            case 'score_update':
              setSession(prev => prev ? {
                ...prev,
                players: prev.players.map(p =>
                  p.userId === update.player.userId ? update.player : p
                )
              } : null)
              break
          }
        }
      }
    )

    return unsubscribe
  }, [postId, sessionId])

  if (!session) {
    return (
      <vstack alignment="center" height="100%" width="100%">
        <text>Loading game session...</text>
      </vstack>
    )
  }

  if (!currentPlayer && session.status === 'waiting') {
    return (
      <vstack alignment="center" gap="medium" padding="large">
        <text size="large" weight="bold">Join BMX Challenge</text>
        <text>Players: {session.players.length}/{session.settings.maxPlayers}</text>

        <vstack gap="small">
          {session.players.map(player => (
            <text key={player.userId}>
              {player.username} - Score: {player.score}
            </text>
          ))}
        </vstack>

        <button onPress={joinGame}>Join Game</button>
      </vstack>
    )
  }

  return (
    <vstack height="100%" width="100%">
      {/* Game Header */}
      <hstack padding="medium" backgroundColor="#1a1a1a">
        <text color="white" weight="bold">BMX Challenge</text>
        <spacer />
        <text color="white">Players: {session.players.length}</text>
      </hstack>

      {/* Game Area */}
      <vstack height="400px" width="100%" backgroundColor="#87ceeb">
        <BMXBackground />

        {/* Game Objects Layer */}
        <zstack height="100%" width="100%">
          {/* Player */}
          {currentPlayer && (
            <BMXPlayer player={{
              x: 100,
              y: 340,
              velocityX: 0,
              velocityY: 0,
              isGrounded: true,
              isJumping: false,
              rotation: 0,
              bikeTilt: 0
            }} />
          )}

          {/* Obstacles */}
          <GameObstacles obstacles={[
            { id: '1', x: 300, y: 340, width: 60, height: 40, type: 'ramp', passed: false },
            { id: '2', x: 500, y: 340, width: 40, height: 30, type: 'rail', passed: false },
          ]} />
        </zstack>

        {/* Game UI Overlay */}
        <GameUI
          gameState={{
            isPlaying: session.status === 'active',
            isGameOver: session.status === 'finished',
            score: currentPlayer?.score || 0,
            lives: 3,
            level: 1,
            player: {
              x: 100,
              y: 340,
              velocityX: 0,
              velocityY: 0,
              isGrounded: true,
              isJumping: false,
              rotation: 0,
              bikeTilt: 0
            },
            obstacles: []
          }}
          onStartGame={() => {}} // Handled by session
          onStopGame={() => {}}  // Handled by session
        />
      </vstack>

      {/* Leaderboard */}
      <vstack padding="medium" backgroundColor="#f0f0f0">
        <text size="medium" weight="bold">Live Leaderboard</text>
        <vstack gap="small">
          {session.players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <hstack key={player.userId} alignment="middle">
                <text width="20px">#{index + 1}</text>
                <text>{player.username}</text>
                <spacer />
                <text weight="bold">{player.score} pts</text>
              </hstack>
            ))
          }
        </vstack>
      </vstack>
    </vstack>
  )
}
