import React, { useState } from 'react'
import { Button } from '../ui/button'

interface MobileControlsProps {
  onUp: () => void
  onDown: () => void
  onBoostToggle: (active: boolean) => void
  onTrick: () => void
}

export function MobileControls({ onUp, onDown, onBoostToggle, onTrick }: MobileControlsProps) {
  const [boostActive, setBoostActive] = useState(false)
  
  // Only show on mobile/touch devices
  const isMobile = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  if (!isMobile) return null

  const handleBoostToggle = () => {
    const newState = !boostActive
    setBoostActive(newState)
    onBoostToggle(newState)
  }

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {/* Left side - Up/Down */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
        <Button
          onTouchStart={onUp}
          className="w-20 h-20 rounded-full bg-cyan-600/80 hover:bg-cyan-700 active:bg-cyan-800 text-white text-2xl font-bold shadow-lg border-2 border-white/30"
        >
          ↑
        </Button>
        <Button
          onTouchStart={onDown}
          className="w-20 h-20 rounded-full bg-cyan-600/80 hover:bg-cyan-700 active:bg-cyan-800 text-white text-2xl font-bold shadow-lg border-2 border-white/30"
        >
          ↓
        </Button>
      </div>

      {/* Right side - Boost Toggle/Trick */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
        <Button
          onClick={handleBoostToggle}
          className={`w-20 h-20 rounded-full text-white text-xl font-bold shadow-lg border-2 transition-all ${
            boostActive 
              ? 'bg-orange-500 border-orange-300 scale-110 animate-pulse' 
              : 'bg-orange-600/80 hover:bg-orange-700 border-white/30'
          }`}
        >
          🚀
        </Button>
        <Button
          onTouchStart={onTrick}
          className="w-20 h-20 rounded-full bg-purple-600/80 hover:bg-purple-700 active:bg-purple-800 text-white text-xl font-bold shadow-lg border-2 border-white/30"
        >
          ⭐
        </Button>
      </div>
    </div>
  )
}
