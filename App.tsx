// Sky Racer - Jet Plane Game
import React from 'react'
import { CityBackground } from './CityBackground'
import { JetPlane } from './components/game/JetPlane'
import { GameObstacles } from './components/game/GameObstacles'
import { GameUI } from './components/game/GameUI'
import { useGameEngine } from './hooks/useGameEngine'
import { useDevvitBridge } from './hooks/useDevvitBridge'

export function App() {
  const { 
    gameState, 
    startGame, 
    stopGame,
    handleTouchUp,
    handleTouchDown,
    handleTouchBoostToggle,
    handleTouchTrick,
  } = useGameEngine()
  const { playCount } = useDevvitBridge()

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-blue-600 to-orange-300 relative">
      {/* Animated City Background */}
      <CityBackground />

      {/* Game World */}
      <div className="absolute inset-0">
        {/* City Skyline at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-800 via-gray-700 to-transparent">
          {/* Building silhouettes */}
          <div className="absolute bottom-0 left-0 w-32 h-40 bg-gray-900/80" />
          <div className="absolute bottom-0 left-36 w-24 h-32 bg-gray-900/70" />
          <div className="absolute bottom-0 left-64 w-40 h-36 bg-gray-900/80" />
          <div className="absolute bottom-0 right-64 w-28 h-44 bg-gray-900/75" />
          <div className="absolute bottom-0 right-36 w-36 h-28 bg-gray-900/70" />
          <div className="absolute bottom-0 right-0 w-32 h-38 bg-gray-900/80" />
        </div>

        {/* Game Objects Layer */}
        <div className="absolute inset-0 z-10">
          {/* Player */}
          <JetPlane player={gameState.player} />

          {/* Obstacles */}
          <GameObstacles obstacles={gameState.obstacles} />
        </div>

        {/* Game UI */}
        <GameUI
          gameState={gameState}
          playCount={playCount}
          onStartGame={startGame}
          onStopGame={stopGame}
          onTouchUp={handleTouchUp}
          onTouchDown={handleTouchDown}
          onTouchBoostToggle={handleTouchBoostToggle}
          onTouchTrick={handleTouchTrick}
        />
      </div>
    </div>
  )
}
