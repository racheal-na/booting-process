"use client"
import { motion } from "framer-motion"

export default function HardwareBar({ label, value, status }) {
  return (
    <div className="w-full max-w-md mb-4 group">
      <div className="flex justify-between text-xs font-mono text-green-400 mb-1">
        <span>{label}</span>
        <span>{status || (value < 100 ? "CHECKING..." : "OK")}</span>
      </div>
      <div className="h-2 bg-gray-900 border border-green-900 relative overflow-hidden">
        {/* Grid lines background */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

        <motion.div
          className="h-full bg-green-500 shadow-[0_0_10px_#0f0]"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>
    </div>
  )
}
