import React from 'react'
import { motion } from 'framer-motion'
import { Obstacle } from '../../hooks/useGameEngine'

interface GameObstaclesProps {
  obstacles: Obstacle[]
}

export function GameObstacles({ obstacles }: GameObstaclesProps) {
  return (
    <div className="absolute inset-0 z-5">
      {obstacles.map((obstacle) => (
        <ObstacleComponent key={obstacle.id} obstacle={obstacle} />
      ))}
    </div>
  )
}

function ObstacleComponent({ obstacle }: { obstacle: Obstacle }) {
  const { x, y, width, height, type } = obstacle

  switch (type) {
    case 'building':
      return (
        <motion.div
          className="absolute"
          style={{ left: `${x}px`, top: `${y}px` }}
          animate={{
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 border-2 border-gray-900 relative shadow-2xl"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {/* Windows */}
            {Array.from({ length: Math.floor(height / 20) }).map((_, i) => (
              <div key={i} className="absolute left-2 right-2 flex gap-2" style={{ top: `${i * 20 + 5}px` }}>
                <div className="w-3 h-3 bg-yellow-300/80 rounded-sm" />
                <div className="w-3 h-3 bg-yellow-300/60 rounded-sm" />
                <div className="w-3 h-3 bg-yellow-300/80 rounded-sm" />
              </div>
            ))}
          </div>
        </motion.div>
      )

    case 'crane':
      return (
        <motion.div
          className="absolute"
          style={{ left: `${x}px`, top: `${y}px` }}
          animate={{
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
            {/* Crane tower */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-t from-orange-600 to-orange-500 border-2 border-orange-700">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-400" />
              <div className="absolute top-1/4 left-0 w-full h-1 bg-orange-400" />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-orange-400" />
              <div className="absolute top-3/4 left-0 w-full h-1 bg-orange-400" />
            </div>
            {/* Crane arm */}
            <div className="absolute top-0 left-0 w-full h-4 bg-orange-600 border-2 border-orange-700" />
            {/* Hook */}
            <motion.div
              className="absolute top-4 right-2 w-2 h-8 bg-gray-700"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )

    case 'ring':
      return (
        <motion.div
          className="absolute"
          style={{ left: `${x}px`, top: `${y}px` }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-8 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.6)]" />
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full border-4 border-cyan-300/50" />
            {/* Center sparkle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      )

    case 'billboard':
      // Converted to floating box
      return (
        <motion.div
          className="absolute"
          style={{ left: `${x}px`, top: `${y}px` }}
          animate={{
            y: [0, -2, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-900 relative shadow-lg"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {/* Box details */}
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-400" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-900" />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-900/50 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-orange-900/50 -translate-x-1/2" />
          </div>
        </motion.div>
      )

    case 'box':
      return (
        <motion.div
          className="absolute"
          style={{ left: `${x}px`, top: `${y}px` }}
          animate={{
            y: [0, -2, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-900 relative shadow-lg"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {/* Box details - simple like BMX */}
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-400" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-900" />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-900/50 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-orange-900/50 -translate-x-1/2" />
          </div>
        </motion.div>
      )

    default:
      return null
  }
}
