import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { GameState } from '../../hooks/useGameEngine'
import { Leaderboard } from './Leaderboard'
import { MobileControls } from './MobileControls'

interface GameUIProps {
  gameState: GameState
  playCount: number
  onStartGame: () => void
  onStopGame: () => void
  onTouchUp: () => void
  onTouchDown: () => void
  onTouchBoostToggle: (active: boolean) => void
  onTouchTrick: () => void
}

export function GameUI({ 
  gameState, 
  playCount, 
  onStartGame, 
  onStopGame,
  onTouchUp,
  onTouchDown,
  onTouchBoostToggle,
  onTouchTrick,
}: GameUIProps) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Mobile Controls - Only visible during gameplay */}
      {gameState.isPlaying && !gameState.isGameOver && (
        <MobileControls
          onUp={onTouchUp}
          onDown={onTouchDown}
          onBoostToggle={onTouchBoostToggle}
          onTrick={onTouchTrick}
        />
      )}
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Score */}
        <Card className="bg-black/70 text-white border-gray-600 p-3">
          <div className="text-sm opacity-80">SCORE</div>
          <div className="text-2xl font-bold text-yellow-400">{gameState.score}</div>
          {gameState.player.comboMultiplier > 1 && (
            <div className="text-xs text-orange-400 mt-1">
              x{gameState.player.comboMultiplier.toFixed(1)} COMBO!
            </div>
          )}
        </Card>

        {/* Lives */}
        <Card className="bg-black/70 text-white border-gray-600 p-3">
          <div className="text-sm opacity-80">LIVES</div>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < gameState.lives ? 'bg-red-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </Card>

        {/* Level */}
        <Card className="bg-black/70 text-white border-gray-600 p-3">
          <div className="text-sm opacity-80">LEVEL</div>
          <div className="text-xl font-bold text-blue-400">{gameState.level}</div>
        </Card>
      </div>
      
      {/* Trick Score Display */}
      {gameState.isPlaying && gameState.player.trickScore > 0 && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none">
          <Card className="bg-purple-600/90 text-white border-purple-400 p-2 animate-bounce">
            <div className="text-lg font-bold">+{gameState.player.trickScore} TRICK!</div>
          </Card>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-auto overflow-y-auto py-8">
          <div className="flex flex-col items-center gap-4 max-w-2xl w-full px-4">
            <Card className="bg-gray-900 border-gray-600 p-8 text-center w-full max-w-md pointer-events-auto">
              <h2 className="text-3xl font-bold text-red-400 mb-4">GAME OVER!</h2>
              <p className="text-gray-300 mb-2">Final Score: <span className="text-yellow-400 font-bold">{gameState.score}</span></p>
              <p className="text-gray-400 mb-6">Level Reached: {gameState.level}</p>
              <Button
                onClick={onStartGame}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                Play Again
              </Button>
            </Card>
            
            {/* Leaderboard */}
            <Leaderboard currentScore={gameState.score} isVisible={true} />
          </div>
        </div>
      )}

      {/* Start Screen */}
      {!gameState.isPlaying && !gameState.isGameOver && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center pointer-events-auto p-4">
          <Card className="bg-gray-900/95 border-cyan-500 border-2 p-4 sm:p-6 text-center max-w-sm w-full pointer-events-auto shadow-2xl shadow-cyan-500/50 max-h-[90vh] overflow-y-auto">
            {/* Title with better visibility */}
            <div className="mb-3">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 drop-shadow-lg">
                SKY RACER
              </h1>
              <p className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                Fly Through The City!
              </p>
            </div>

            {/* Play Count */}
            <div className="mb-3">
              <div className="inline-block bg-black/80 px-4 py-2 rounded-full border-2 border-white/20">
                <span className="text-xl sm:text-2xl font-bold text-white">{playCount} PLAYS</span>
              </div>
            </div>

            <p className="text-white text-sm sm:text-base mb-3 font-medium">
              Dodge obstacles, collect rings, rack up points!
            </p>

            <div className="mb-3 text-left text-xs sm:text-sm text-gray-300 space-y-0.5 bg-black/40 p-3 rounded-lg">
              <div className="text-cyan-400 font-bold mb-1">Controls:</div>
              <div>• <span className="text-white font-semibold">W/↑</span> Fly Up</div>
              <div>• <span className="text-white font-semibold">S/↓</span> Fly Down</div>
              <div>• <span className="text-white font-semibold">A</span> Barrel Roll</div>
              <div>• <span className="text-white font-semibold">Space</span> Boost</div>
              <div className="text-yellow-400 mt-1">★ Rings = +100 pts!</div>
            </div>

            <Button
              onClick={onStartGame}
              className="bg-white hover:bg-gray-100 text-black px-6 py-3 text-lg sm:text-xl font-bold w-full rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              PLAY
            </Button>
          </Card>
        </div>
      )}

      {/* Pause/Stop Button */}
      {gameState.isPlaying && (
        <div className="absolute top-4 right-4 pointer-events-auto">
          <Button
            onClick={onStopGame}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Stop Game
          </Button>
        </div>
      )}

      {/* Altitude & Speed indicator */}
      {gameState.isPlaying && (
        <div className="absolute bottom-4 left-4 space-y-2">
          <Card className="bg-black/70 text-white border-gray-600 p-2">
            <div className="text-xs opacity-80">ALTITUDE</div>
            <div className="text-sm font-mono">
              {Math.floor(600 - gameState.player.y)} ft
            </div>
          </Card>
          <Card className="bg-black/70 text-white border-gray-600 p-2">
            <div className="text-xs opacity-80">SPEED</div>
            <div className="text-sm font-mono">
              {Math.abs(gameState.player.velocityX).toFixed(1)}x
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
