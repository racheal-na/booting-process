"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { playBootSound } from "../utils/sound"

export default function PowerScreen({ onPowerOn }) {
  const [isPowering, setIsPowering] = useState(false)

  const handleClick = () => {
    if (isPowering) return
    setIsPowering(true)
    playBootSound()

    setTimeout(() => {
      onPowerOn()
    }, 1500)
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-950 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-gray-900 to-black opacity-80" />

      {/* Circuit Lines Background (CSS only for simplicity, could be SVG) */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Status LEDs */}
      <div className="absolute top-10 left-10 flex space-x-4">
        {["PWR", "HDD", "NET"].map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div
              className={`w-3 h-3 rounded-full ${i === 0 && isPowering ? "bg-green-500 shadow-[0_0_10px_#0f0]" : "bg-red-900"}`}
              animate={i === 0 && isPowering ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            <span className="text-[10px] text-gray-500 font-mono tracking-wider">{label}</span>
          </div>
        ))}
      </div>

      {/* Main Power Button Container */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative w-48 h-48 flex items-center justify-center rounded-full cursor-pointer group"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer Ring */}
          <div className={`absolute inset-0 rounded-full border-4 border-gray-800 transition-colors duration-500 ${isPowering ? "border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.3)]" : "group-hover:border-gray-700"}`} />

          {/* Inner Ring with Rotation */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-dashed border-gray-600"
            animate={isPowering ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Button Core */}
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isPowering ? "bg-green-900/20 shadow-inner" : "bg-gray-900 shadow-xl group-hover:bg-gray-800"}`}>
            <motion.span
              className={`text-6xl transition-colors duration-300 ${isPowering ? "text-green-500 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]" : "text-gray-600 group-hover:text-gray-400"}`}
            >
              ⏻
            </motion.span>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-gray-500 font-mono text-sm tracking-[0.2em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPowering ? "INITIALIZING SEQUENCE..." : "SYSTEM STANDBY"}
        </motion.p>
      </div>
    </div>
  )
}
