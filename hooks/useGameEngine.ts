import { useState, useEffect, useCallback, useRef } from 'react'
import { useDevvitBridge } from './useDevvitBridge'

export interface GameState {
  isPlaying: boolean
  isGameOver: boolean
  score: number
  lives: number
  level: number
  player: Player
  obstacles: Obstacle[]
}

export interface Player {
  x: number
  y: number
  velocityX: number
  velocityY: number
  isGrounded: boolean
  isJumping: boolean // Reusing for boost
  rotation: number
  bikeTilt: number // Reusing for barrel roll
  isGrinding: boolean // Reusing for near-miss bonus
  trickScore: number
  comboMultiplier: number
}

export interface Obstacle {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: 'building' | 'crane' | 'ring' | 'billboard' | 'box'
  passed: boolean
}

const GRAVITY = 0.3 // Lighter gravity for flight
const LIFT_FORCE = -0.8 // Upward force when ascending
const GROUND_HEIGHT = 128 // Height of road (matches h-32 in background)
const PLAYER_HEIGHT = 128 // Height of plane sprite (bigger now)
const PLAYER_SPEED = 6
const MAX_SPEED = 10
const VERTICAL_SPEED = 6
const ACCELERATION = 0.4
const FRICTION = 0.96 // Less friction in air
const BOOST_MULTIPLIER = 1.5

// Calculate ground Y position dynamically
const getGroundY = () => {
  if (typeof window !== 'undefined') {
    return window.innerHeight - GROUND_HEIGHT
  }
  return 600 // Fallback for SSR
}

// Calculate ceiling
const getCeilingY = () => {
  return 50 // Top boundary
}

export function useGameEngine() {
  const { notifyGameStart, notifyGameOver, notifyScoreUpdate } = useDevvitBridge()
  const gameLoopRef = useRef<number>()
  const keysRef = useRef<Set<string>>(new Set())
  const lastScoreUpdate = useRef<number>(0)
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    lives: 3,
    level: 1,
    player: {
      x: 100,
      y: getGroundY() - PLAYER_HEIGHT,
      velocityX: 0,
      velocityY: 0,
      isGrounded: true,
      isJumping: false,
      rotation: 0,
      bikeTilt: 0,
      isGrinding: false,
      trickScore: 0,
      comboMultiplier: 1
    },
    obstacles: []
  })

  // Generate obstacles
  const generateObstacles = useCallback((level: number): Obstacle[] => {
    const obstacles: Obstacle[] = []
    const obstacleCount = 12 // More obstacles for difficulty
    const groundY = getGroundY()
    const ceilingY = getCeilingY()
    const flyZone = groundY - ceilingY - 100 // Safe flying zone

    for (let i = 0; i < obstacleCount; i++) {
      // Weighted distribution: MORE boxes, some buildings on ground, rings for bonus
      const rand = Math.random()
      let type: Obstacle['type']
      
      if (rand < 0.6) {
        type = 'box' // 60% - MORE floating boxes
      } else if (rand < 0.75) {
        type = 'ring' // 15% - bonus points
      } else if (rand < 0.9) {
        type = 'building' // 15% - ground buildings
      } else {
        type = 'crane' // 10%
      }
      
      let height, width, y
      
      if (type === 'box') {
        // Simple floating boxes - like BMX obstacles
        height = 40 + Math.random() * 30
        width = 40 + Math.random() * 30
        // Scattered throughout flying zone
        y = ceilingY + 60 + Math.random() * (flyZone - 100)
      } else if (type === 'building') {
        height = 100 + Math.random() * 80
        width = 50 + Math.random() * 30
        // Buildings sit ON the ground
        y = groundY - height
      } else if (type === 'crane') {
        height = 120 + Math.random() * 60
        width = 40
        // Cranes sit ON the ground
        y = groundY - height
      } else if (type === 'ring') {
        height = 80
        width = 80
        // Position rings in the middle flying zone
        y = ceilingY + 80 + Math.random() * (flyZone - 160)
      }

      obstacles.push({
        id: `obstacle-${i}-${Date.now()}-${Math.random()}`,
        x: 600 + i * 400, // More consistent spacing
        y: y,
        width: width,
        height: height,
        type,
        passed: false
      })
    }

    return obstacles
  }, [])

  // Collision detection - need to be very close to take damage
  const checkCollision = useCallback((player: Player, obstacle: Obstacle): boolean => {
    const playerWidth = 128 // Plane size (bigger now)
    const playerHeight = 128
    
    // Big margin - need to be really close to take damage (30px on all sides)
    const margin = 30
    
    return (
      player.x + margin < obstacle.x + obstacle.width &&
      player.x + playerWidth - margin > obstacle.x &&
      player.y + margin < obstacle.y + obstacle.height &&
      player.y + playerHeight - margin > obstacle.y
    )
  }, [])

  // Update player physics
  const updatePlayer = useCallback((player: Player, keys: Set<string>): Player => {
    let newPlayer = { ...player }

    // Vertical controls (up/down) - no rotation, just movement
    if (keys.has('ArrowUp') || keys.has('KeyW')) {
      newPlayer.velocityY += LIFT_FORCE
      newPlayer.velocityY = Math.max(newPlayer.velocityY, -VERTICAL_SPEED)
    } else if (keys.has('ArrowDown') || keys.has('KeyS')) {
      newPlayer.velocityY += GRAVITY * 2
      newPlayer.velocityY = Math.min(newPlayer.velocityY, VERTICAL_SPEED)
    }
    
    // Keep plane level (no rotation)
    newPlayer.rotation = 0

    // Barrel roll (A key only)
    if (keys.has('KeyA')) {
      newPlayer.bikeTilt -= 8
      if (Math.abs(newPlayer.bikeTilt) > 180) {
        newPlayer.trickScore += 50 // Barrel roll complete!
        newPlayer.bikeTilt = 0
      }
    } else {
      // Auto-level barrel roll
      newPlayer.bikeTilt *= 0.85
      if (Math.abs(newPlayer.bikeTilt) < 2) {
        newPlayer.bikeTilt = 0
      }
    }

    // Speed control (D for speed boost, Space for turbo)
    if (keys.has('Space')) {
      newPlayer.isJumping = true // Reusing for turbo visual
      newPlayer.velocityX = PLAYER_SPEED * BOOST_MULTIPLIER * 1.3 // Extra fast
    } else if (keys.has('KeyD') || keys.has('ArrowRight')) {
      newPlayer.isJumping = true // Show boost effect
      newPlayer.velocityX = PLAYER_SPEED * BOOST_MULTIPLIER
    } else {
      newPlayer.isJumping = false
      newPlayer.velocityX = PLAYER_SPEED
    }

    // Trick buttons (Q/E for instant trick points)
    if (keys.has('KeyQ') && !newPlayer.isGrounded) {
      // Quick trick bonus
      if (newPlayer.trickScore === 0 || Date.now() % 500 < 50) { // Throttle
        newPlayer.trickScore += 25
      }
    }
    if (keys.has('KeyE') && !newPlayer.isGrounded) {
      // Quick trick bonus
      if (newPlayer.trickScore === 0 || Date.now() % 500 < 50) { // Throttle
        newPlayer.trickScore += 25
      }
    }

    // Apply gentle gravity
    newPlayer.velocityY += GRAVITY
    newPlayer.y += newPlayer.velocityY

    // Boundaries
    const groundY = getGroundY()
    const ceilingY = getCeilingY()
    const playerGroundY = groundY - PLAYER_HEIGHT
    
    // Ground collision (crash into road!)
    const wasInAir = !newPlayer.isGrounded
    if (newPlayer.y >= playerGroundY) {
      newPlayer.y = playerGroundY
      newPlayer.velocityY = 0
      
      // If we just hit the ground (were in air before), lose a life
      if (wasInAir) {
        setGameState(prev => ({
          ...prev,
          lives: Math.max(0, prev.lives - 1),
          isGameOver: prev.lives <= 1,
          player: {
            ...prev.player,
            comboMultiplier: 1,
            trickScore: 0,
            isGrounded: true
          }
        }))
      }
      newPlayer.isGrounded = true
    } else {
      newPlayer.isGrounded = false
    }

    // Ceiling collision
    if (newPlayer.y <= ceilingY) {
      newPlayer.y = ceilingY
      newPlayer.velocityY = Math.max(0, newPlayer.velocityY)
    }

    // Update horizontal position (auto-scroll)
    newPlayer.x += newPlayer.velocityX * 0.5 // Slight forward drift

    // Keep player in visible zone - further left for mobile
    const minX = typeof window !== 'undefined' ? window.innerWidth * 0.08 : 60
    const maxX = typeof window !== 'undefined' ? window.innerWidth * 0.35 : 300
    newPlayer.x = Math.max(minX, Math.min(newPlayer.x, maxX))

    return newPlayer
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.isGameOver) return prevState

      const keys = keysRef.current
      let newState = { ...prevState }

      // Update player
      newState.player = updatePlayer(newState.player, keys)

      // Update obstacles (move them left as player progresses)
      // Speed increases with D key or Space
      const scrollSpeed = newState.player.isJumping ? 6 : 3 // Faster when boosting
      newState.obstacles = newState.obstacles.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - scrollSpeed
      }))

      // Check collisions and scoring
      newState.obstacles = newState.obstacles.map(obstacle => {
        if (checkCollision(newState.player, obstacle)) {
          // Handle different obstacle types
          if (obstacle.type === 'ring') {
            // Flying through ring = bonus!
            if (!obstacle.passed) {
              newState.score += Math.floor(100 * newState.player.comboMultiplier)
              newState.player.comboMultiplier = Math.min(newState.player.comboMultiplier + 0.5, 5)
              newState.player.trickScore += 50
              newState.player.isGrinding = true // Visual effect
              setTimeout(() => {
                setGameState(prev => ({
                  ...prev,
                  player: { ...prev.player, isGrinding: false }
                }))
              }, 300)
              return { ...obstacle, passed: true }
            }
          } else if (obstacle.type === 'box') {
            // Hit floating box - damage
            newState.lives -= 1
            newState.player.comboMultiplier = 1
            newState.player.trickScore = 0
            newState.player.velocityY = 2
            if (newState.lives <= 0) {
              newState.isGameOver = true
            }
          } else if (obstacle.type === 'building' || obstacle.type === 'crane') {
            // Crash into building/crane
            newState.lives -= 1
            newState.player.comboMultiplier = 1
            newState.player.trickScore = 0
            newState.player.velocityY = 2
            newState.player.rotation = 0
            newState.player.bikeTilt = 0
            if (newState.lives <= 0) {
              newState.isGameOver = true
            }
          }
        }

        // Score for passing obstacles
        if (!obstacle.passed && newState.player.x > obstacle.x + obstacle.width) {
          // Simple scoring: rings already scored on collision, others get distance points
          const baseScore = obstacle.type === 'ring' ? 0 : obstacle.type === 'box' ? 10 : obstacle.type === 'building' ? 25 : 30
          
          if (baseScore > 0) {
            newState.score += Math.floor(baseScore * newState.player.comboMultiplier)
          }
          
          // Add trick score bonus when passing obstacles
          if (newState.player.trickScore > 0) {
            newState.score += Math.floor(newState.player.trickScore * newState.player.comboMultiplier)
            newState.player.trickScore = 0
          }
          
          return { ...obstacle, passed: true }
        }

        return obstacle
      })

      // Remove off-screen obstacles and add new ones
      newState.obstacles = newState.obstacles.filter(obstacle => obstacle.x > -150)

      // Add new obstacles if needed
      if (newState.obstacles.length < 8) {
        const groundY = getGroundY()
        const ceilingY = getCeilingY()
        const flyZone = groundY - ceilingY - 100
        const lastObstacle = newState.obstacles[newState.obstacles.length - 1]
        const startX = lastObstacle ? lastObstacle.x + 400 : 800

        // Add 3-4 new obstacles
        for (let i = 0; i < 4; i++) {
          const rand = Math.random()
          let type: Obstacle['type']
          
          if (rand < 0.6) {
            type = 'box'
          } else if (rand < 0.75) {
            type = 'ring'
          } else if (rand < 0.9) {
            type = 'building'
          } else {
            type = 'crane'
          }
          
          let height, width, y
          
          if (type === 'box') {
            height = 40 + Math.random() * 30
            width = 40 + Math.random() * 30
            y = ceilingY + 60 + Math.random() * (flyZone - 100)
          } else if (type === 'building') {
            height = 100 + Math.random() * 80
            width = 50 + Math.random() * 30
            y = groundY - height
          } else if (type === 'crane') {
            height = 120 + Math.random() * 60
            width = 40
            y = groundY - height
          } else if (type === 'ring') {
            height = 80
            width = 80
            y = ceilingY + 80 + Math.random() * (flyZone - 160)
          } else {
            height = 60
            width = 100
            y = ceilingY + 60 + Math.random() * (flyZone - 120)
          }

          newState.obstacles.push({
            id: `obstacle-${Date.now()}-${i}-${Math.random()}`,
            x: startX + i * 400,
            y: y,
            width: width,
            height: height,
            type,
            passed: false
          })
        }
      }

      return newState
    })

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [updatePlayer, checkCollision, generateObstacles])

  // Start game
  const startGame = useCallback(() => {
    const groundY = getGroundY()
    const ceilingY = getCeilingY()
    const midY = ceilingY + (groundY - ceilingY) / 2 - PLAYER_HEIGHT / 2
    
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isGameOver: false,
      score: 0,
      lives: 3,
      player: {
        x: typeof window !== 'undefined' ? window.innerWidth / 5 : 150,
        y: midY, // Start in middle of flying zone
        velocityX: 0,
        velocityY: 0,
        isGrounded: false,
        isJumping: false,
        rotation: 0,
        bikeTilt: 0,
        isGrinding: false,
        trickScore: 0,
        comboMultiplier: 1
      },
      obstacles: generateObstacles(1)
    }))
  }, [generateObstacles])

  // Stop game
  const stopGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
  }, [])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysRef.current.add(event.code)
      
      // Prevent default for game controls
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE'].includes(event.code)) {
        event.preventDefault()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.code)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Game loop effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isGameOver, gameLoop])

  // Notify Devvit when game starts
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      notifyGameStart()
    }
  }, [gameState.isPlaying, gameState.isGameOver, notifyGameStart])

  // Notify Devvit when game ends
  useEffect(() => {
    if (gameState.isGameOver) {
      notifyGameOver(gameState.score)
    }
  }, [gameState.isGameOver, gameState.score, notifyGameOver])

  // Notify Devvit of score updates (throttled to every 100 points)
  useEffect(() => {
    if (gameState.isPlaying && gameState.score > lastScoreUpdate.current + 100) {
      notifyScoreUpdate(gameState.score)
      lastScoreUpdate.current = gameState.score
    }
  }, [gameState.isPlaying, gameState.score, notifyScoreUpdate])

  // Touch control handlers for mobile
  const handleTouchUp = useCallback(() => {
    keysRef.current.add('ArrowUp')
    setTimeout(() => keysRef.current.delete('ArrowUp'), 150)
  }, [])

  const handleTouchDown = useCallback(() => {
    keysRef.current.add('ArrowDown')
    setTimeout(() => keysRef.current.delete('ArrowDown'), 150)
  }, [])

  const handleTouchBoostToggle = useCallback((active: boolean) => {
    if (active) {
      keysRef.current.add('Space')
    } else {
      keysRef.current.delete('Space')
    }
  }, [])

  const handleTouchTrick = useCallback(() => {
    keysRef.current.add('KeyA')
    setTimeout(() => keysRef.current.delete('KeyA'), 300)
  }, [])

  return {
    gameState,
    startGame,
    stopGame,
    handleTouchUp,
    handleTouchDown,
    handleTouchBoostToggle,
    handleTouchTrick,
  }
}
