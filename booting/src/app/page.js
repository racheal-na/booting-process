"use client"

import { useState } from "react"
import PowerScreen from "../components/PowerScreen"
import BiosScreen from "../components/BiosScreen"
import PostScreen from "../components/PostScreen"
import BootloaderScreen from "../components/BootloaderScreen"
import KernelScreen from "../components/KernelScreen"
import LoginScreen from "../components/LoginScreen"

export default function Home() {
  const [stage, setStage] = useState("power")
  const [speed, setSpeed] = useState(1)

  return (
    <>
      {/* Speed slider */}
      {stage !== "power" && stage !== "login" && (
        <div className="fixed top-4 right-4 z-50 bg-black/70 text-white p-3 rounded">
          <p className="text-xs mb-1">Speed</p>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      )}

      {stage === "power" && <PowerScreen onPowerOn={() => setStage("bios")} />}
      {stage === "bios" && <BiosScreen speed={speed} onComplete={() => setStage("post")} />}
      {stage === "post" && <PostScreen speed={speed} onComplete={() => setStage("bootloader")} />}
      {stage === "bootloader" && <BootloaderScreen onSelect={() => setStage("kernel")} />}
      {stage === "kernel" && <KernelScreen speed={speed} onComplete={() => setStage("login")} />}
      {stage === "login" && <LoginScreen onRestart={() => setStage("power")} />}
    </>
  )
}
