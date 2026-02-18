import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { playBiosBeep } from "../utils/sound"

export default function BiosScreen({ speed, onComplete }) {
  const [lines, setLines] = useState([])

  const bootSequence = [
    { text: "AMIBIOS(C) 2024 American Megatrends, Inc.", delay: 0 },
    { text: "ASUS PRIME Z790-A ACPI BIOS Revision 1604", delay: 200 },
    { text: "CPU: Intel(R) Core(TM) i9-13900K CPU @ 3.00GHz", delay: 400 },
    { text: " Speed: 5.80 GHz", delay: 500 },
    { text: "", delay: 600 },
    { text: "DRAM Clock: 6000MHz", delay: 800 },
    { text: "DRAM Status: OK", delay: 1000 },
    { text: "USB Devices: 1 Keyboard, 1 Mouse, 2 Hubs", delay: 1200 },
    { text: "Detected Devices...", delay: 1500 },
    { text: " NVMe-0: Samsung SSD 990 PRO 2TB", delay: 1800 },
    { text: " Auto-Detecting USB Mass Storage Devices... Done", delay: 2200 },
    { text: "00USB mass storage devices found and configured.", delay: 2500 },
    { text: "", delay: 2600 },
    { text: "CMOS Settings Wrong", delay: 2800 },
    { text: "CMOS Memory Size Mismatch", delay: 2900 },
    { text: "Press F1 to Run SETUP", delay: 3000 },
    { text: "Press F2 to load default values and continue", delay: 3000 },
  ]

  useEffect(() => {
    // Play POST beep on start
    playBiosBeep()

    let timeouts = []

    // Process lines sequentially
    bootSequence.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, item.text])

        // Check if this is the last item
        if (index === bootSequence.length - 1) {
          setTimeout(onComplete, 2000 / speed)
        }
      }, item.delay / speed)
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [speed])

  return (
    <div className="h-screen w-full bg-black text-gray-300 font-mono p-10 flex flex-col justify-between overflow-hidden relative">
      <div className="z-10 flex flex-col gap-1 text-sm md:text-base leading-snug">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <span className="text-white font-bold">American Megatrends</span>
            <span className="text-xs">www.ami.com</span>
          </div>
          <div className="w-24 h-24 border-4 border-white flex items-center justify-center">
            <span className="text-[10px] text-center font-bold">ENERGY STAR</span>
          </div>
        </div>

        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre-wrap"
          >
            {line}
          </motion.div>
        ))}

        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-3 h-5 bg-gray-300 ml-1 align-middle"
        />
      </div>

      <div className="z-10 border-t border-gray-600 pt-2 text-xs text-gray-500 w-full flex justify-between">
        <span>63-0100-000001-00101111-122211-Chipset</span>
        <span>(C) 2018-2024 American Megatrends, Inc.</span>
      </div>
    </div>
  )
}
