"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import HardwareBar from "./HardwareBar"

export default function PostScreen({ speed, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [activeItem, setActiveItem] = useState(0)

  const hardwareItems = [
    { label: "CPU REGISTERS", duration: 1000 },
    { label: "MMU MAPPING", duration: 800 },
    { label: "I/O CONTROLLERS", duration: 1200 },
    { label: "GPU INITIALIZATION", duration: 1500 },
    { label: "NETWORK INTERFACE", duration: 1000 },
  ]

  useEffect(() => {
    let currentProgress = 0

    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)

      // Calculate active item based on progress chunks
      const itemIndex = Math.floor((currentProgress / 100) * hardwareItems.length)
      setActiveItem(Math.min(itemIndex, hardwareItems.length - 1))

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(onComplete, 500 / speed)
      }
    }, 50 / speed)

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className="h-screen w-full bg-black text-green-500 font-mono flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />

      <h2 className="text-xl mb-8 tracking-widest border-b border-green-800 pb-2 w-full max-w-md text-center">
        SYSTEM DIAGNOSTICS
      </h2>

      <div className="w-full max-w-md space-y-2 z-0">
        {hardwareItems.map((item, i) => (
          <HardwareBar
            key={i}
            label={item.label}
            value={activeItem > i ? 100 : activeItem === i ? (progress % (100 / hardwareItems.length)) * hardwareItems.length : 0}
            status={activeItem > i ? "OK" : activeItem === i ? "SCANNING" : "WAITING"}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-xs w-full max-w-md">
        <div className="border border-green-900 p-2">
          <p>MEM: 32768MB OK</p>
          <p>VRAM: 16384MB OK</p>
        </div>
        <div className="border border-green-900 p-2">
          <p>TEMP: 34°C</p>
          <p>FAN: 1200RPM</p>
        </div>
      </div>

      <p className="mt-6 text-green-700 animate-pulse">
        {progress < 100 ? `DIAGNOSTIC PROGRESS: ${progress}%` : "SYSTEM GREEN. READY TO BOOT."}
      </p>
    </div>
  )
}
