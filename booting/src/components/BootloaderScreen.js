"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BootloaderScreen({ onSelect }) {
  const options = [
    { name: "Ubuntu 24.04 LTS", kernel: "Linux 6.8.0-generic" },
    { name: "Windows 11 Pro", kernel: "NT Kernel" },
    { name: "System Setup", kernel: "UEFI Firmware" },
    { name: "Memory Diagnostic", kernel: "MemTest86+" }
  ]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      onSelect()
    }
  }, [countdown, onSelect])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        setCountdown(30) // Reset countdown on interaction
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        setCountdown(30)
      } else if (e.key === "Enter") {
        onSelect()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onSelect, options.length])

  return (
    <div className="h-screen bg-[#1a0524] text-gray-300 font-mono flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-2xl bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-xl font-bold text-purple-400">GNU GRUB version 2.12</h1>
          <span className="text-xs text-gray-500">Secure Boot: ENABLED</span>
        </div>

        <div className="space-y-2">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              onClick={() => {
                setSelectedIndex(i)
                setCountdown(30)
              }}
              className={`p-4 rounded cursor-pointer transition-all duration-200 flex justify-between items-center ${selectedIndex === i
                ? "bg-purple-900/40 border-l-4 border-purple-500 text-white shadow-lg"
                : "hover:bg-white/5 border-l-4 border-transparent"
                }`}
            >
              <span className="font-semibold">{opt.name}</span>
              <span className="text-xs opacity-50">{opt.kernel}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Use the &uarr; and &darr; keys to select which entry is highlighted.</p>
          <p>Press enter to boot the selected OS, &lsquo;e&rsquo; to edit command.</p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center text-xs">
          <span>The selected entry will be started automatically in {countdown}s.</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
