import React from 'react'
import { motion } from 'framer-motion'
import { Player } from '../../hooks/useGameEngine'

interface BMXPlayerProps {
  player: Player
}

export function BMXPlayer({ player }: BMXPlayerProps) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${player.x}px`,
        top: `${player.y}px`,
        transform: `rotate(${player.rotation}deg)`,
      }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: player.bikeTilt,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        {/* Your Custom Rider Image */}
        <motion.div
          className="relative w-20 h-20"
          animate={{
            scale: player.isJumping ? 1.1 : 1,
            y: player.isGrinding ? [0, -2, 0] : 0,
          }}
          transition={{
            duration: 0.3,
            repeat: player.isGrinding ? Infinity : 0,
          }}
        >
          <img
            src="/assets/rider.png"
            alt="BMX Rider"
            className="w-full h-full object-contain"
            style={{
              filter: player.isGrinding ? 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,0,0.5))' : 'none',
              transition: 'filter 0.2s ease'
            }}
            onError={(e) => {
              // Fallback to SVG if image not found
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'block'
            }}
          />
          
          {/* Fallback SVG (hidden by default, shows if image fails to load) */}
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 80 80" 
            style={{ display: 'none' }}
            className="absolute inset-0"
          >
            {/* Bike Frame */}
            <g transform="translate(10, 20)">
              <path d="M 10 30 L 45 30 L 25 15 Z" stroke="#333" strokeWidth="2" fill="none" />
              <line x1="25" y1="15" x2="25" y2="10" stroke="#333" strokeWidth="2" />
              <line x1="25" y1="15" x2="20" y2="12" stroke="#333" strokeWidth="2" />
              <line x1="15" y1="12" x2="25" y2="12" stroke="#333" strokeWidth="3" />
              <line x1="45" y1="30" x2="50" y2="25" stroke="#333" strokeWidth="2" />
              <circle cx="12" cy="32" r="8" stroke="#333" strokeWidth="2" fill="none" />
              <circle cx="47" cy="32" r="8" stroke="#333" strokeWidth="2" fill="none" />
              <circle cx="25" cy="25" r="3" stroke="#333" strokeWidth="2" fill="none" />
              
              {/* Rider */}
              <g transform="translate(15, -8)">
                <rect x="0" y="0" width="8" height="12" fill="#3b82f6" rx="4" />
                <ellipse cx="4" cy="-2" rx="5" ry="4" fill="#ef4444" />
              </g>
            </g>
          </svg>
        </motion.div>

        {/* Speed lines when moving fast */}
        {Math.abs(player.velocityX) > 3 && (
          <motion.div
            className="absolute -right-8 top-1/2 -translate-y-1/2"
            animate={{
              opacity: [0, 1, 0],
              x: [0, -20, -40],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            <div className="w-12 h-1 bg-white/50 rounded-full" />
            <div className="w-8 h-1 bg-white/30 rounded-full mt-1" />
            <div className="w-6 h-1 bg-white/20 rounded-full mt-1" />
          </motion.div>
        )}

        {/* Grinding sparks */}
        {player.isGrinding && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <div className="w-2 h-2 bg-yellow-300 rounded-full" />
              <div className="w-1 h-1 bg-orange-300 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Jump particles */}
        {player.isJumping && !player.isGrounded && (
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            animate={{
              opacity: [1, 0.5, 0],
              y: [0, -10, -20],
              scale: [1, 0.8, 0.6],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Trick indicator */}
        {player.trickScore > 0 && !player.isGrounded && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{
              y: [0, -10, -20],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="text-yellow-400 font-bold text-sm drop-shadow-lg">
              +{player.trickScore}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
