import React from 'react'
import { motion } from 'framer-motion'

export function CityBackground() {
  const cloudSpeed = 60
  const buildingSpeed = 40
  const groundSpeed = 15

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky with clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-orange-200">
        {/* Sun */}
        <div className="absolute top-20 right-32 w-24 h-24 bg-yellow-300 rounded-full blur-sm opacity-80" />
        
        {/* Clouds layer */}
        <motion.div
          className="absolute top-0 left-0 h-full flex"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: cloudSpeed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[2000px] h-full relative">
              <Cloud x={100} y={80} scale={1} />
              <Cloud x={400} y={120} scale={0.8} />
              <Cloud x={700} y={60} scale={1.2} />
              <Cloud x={1100} y={100} scale={0.9} />
              <Cloud x={1500} y={140} scale={1.1} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Far buildings layer */}
      <motion.div
        className="absolute bottom-0 left-0 h-2/3 flex"
        style={{ zIndex: 1 }}
        animate={{ x: [0, -3000] }}
        transition={{
          duration: buildingSpeed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="min-w-[3000px] h-full relative flex items-end">
            <Building height={200} width={120} color="bg-purple-900/40" x={100} />
            <Building height={280} width={100} color="bg-purple-800/40" x={240} />
            <Building height={160} width={140} color="bg-purple-900/30" x={360} />
            <Building height={240} width={110} color="bg-purple-800/35" x={520} />
            <Building height={300} width={130} color="bg-purple-900/40" x={650} />
            <Building height={180} width={100} color="bg-purple-800/30" x={800} />
            <Building height={260} width={120} color="bg-purple-900/40" x={920} />
            <Building height={220} width={140} color="bg-purple-800/35" x={1060} />
            <Building height={200} width={110} color="bg-purple-900/40" x={1220} />
            <Building height={280} width={130} color="bg-purple-800/40" x={1350} />
            <Building height={240} width={100} color="bg-purple-900/35" x={1500} />
            <Building height={160} width={120} color="bg-purple-800/30" x={1620} />
            <Building height={300} width={140} color="bg-purple-900/40" x={1760} />
            <Building height={190} width={110} color="bg-purple-800/35" x={1920} />
            <Building height={270} width={130} color="bg-purple-900/40" x={2050} />
            <Building height={210} width={120} color="bg-purple-800/35" x={2200} />
            <Building height={250} width={100} color="bg-purple-900/40" x={2340} />
            <Building height={180} width={140} color="bg-purple-800/30" x={2460} />
            <Building height={290} width={110} color="bg-purple-900/40" x={2620} />
            <Building height={230} width={130} color="bg-purple-800/35" x={2750} />
          </div>
        ))}
      </motion.div>

      {/* Ground layer */}
      <motion.div
        className="absolute bottom-0 left-0 h-32 flex"
        style={{ zIndex: 3 }}
        animate={{ x: [0, -2000] }}
        transition={{
          duration: groundSpeed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="min-w-[2000px] h-full">
            {/* Ground surface */}
            <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-700 relative">
              {/* Ground pattern/cracks */}
              <div className="absolute top-2 left-20 w-40 h-1 bg-gray-800/40" />
              <div className="absolute top-4 left-300 w-60 h-1 bg-gray-800/40" />
              <div className="absolute top-6 left-600 w-80 h-1 bg-gray-800/40" />
              <div className="absolute top-3 left-900 w-50 h-1 bg-gray-800/40" />
              <div className="absolute top-5 left-1200 w-70 h-1 bg-gray-800/40" />
              <div className="absolute top-2 left-1500 w-90 h-1 bg-gray-800/40" />
              <div className="absolute top-7 left-1800 w-60 h-1 bg-gray-800/40" />
              
              {/* Ground details */}
              <div className="absolute top-0 w-full h-2 bg-gray-500" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Cloud component
function Cloud({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `scale(${scale})`
      }}
    >
      <div className="relative">
        <div className="w-20 h-12 bg-white/70 rounded-full" />
        <div className="absolute top-2 -left-4 w-16 h-10 bg-white/70 rounded-full" />
        <div className="absolute top-1 left-12 w-14 h-11 bg-white/70 rounded-full" />
      </div>
    </div>
  )
}

// Building component
function Building({ height, width, color, x }: { height: number; width: number; color: string; x: number }) {
  return (
    <div
      className={`absolute bottom-0 ${color}`}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        left: `${x}px`
      }}
    >
      {/* Windows */}
      <div className="grid grid-cols-3 gap-2 p-2 h-full">
        {[...Array(Math.floor(height / 30) * 3)].map((_, i) => (
          <div key={i} className="bg-yellow-200/20 rounded-sm" />
        ))}
      </div>
    </div>
  )
}
