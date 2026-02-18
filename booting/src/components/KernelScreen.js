"use client"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function KernelScreen({ speed, onComplete }) {
  const [logs, setLogs] = useState([])
  const bottomRef = useRef(null)

  const kernelLogs = [
    "[    0.000000] Linux version 6.8.0-generic (buildd@lcy02-amd64-001) (gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, GNU ld (GNU Binutils for Ubuntu) 2.38)",
    "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.0-generic root=UUID=1234-5678 ro quiet splash vt.handoff=7",
    "[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
    "[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'",
    "[    0.000000] x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'",
    "[    0.000000] x86/fpu: Enabled xstate features 0x2e7, context size is 2440 bytes, using 'compacted' format.",
    "[    0.000000] BIOS-provided physical RAM map:",
    "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009efff] usable",
    "[    0.000000] BIOS-e820: [mem 0x000000000009f000-0x00000000000fffff] reserved",
    "[    0.004000] Console: colour dummy device 80x25",
    "[    0.004000] printk: console [tty0] enabled",
    "[    0.452000] ACPI: Core revision 20230628",
    "[    0.510000] APIC: Switch to symmetric I/O mode setup",
    "[    0.620000] Switched to clocksource tsc",
    "[    1.200000] tcp_listen_portaddr_hash hash table entries: 16384 (order: 6, 262144 bytes)",
    "[    1.201000] Table-defined volumetric hash table entries: 16384 (order: 6, 262144 bytes)",
    "[    1.350000] Workqueue: events_unbound helper",
    "[    1.420000] Block layer SCSI generic (bsg) driver version 0.4",
    "[    1.500000] io scheduler mq-deadline registered",
    "[    1.500000] io scheduler kyber registered",
    "[    1.800000] Serial: 8250/16550 driver, 4 ports, IRQ sharing enabled",
    "[    2.100000] input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input/input0",
    "[    2.500000] rtc_cmos 00:01: setting system clock to 2024-05-20T10:00:00 UTC (1716199200)",
    "[    2.800000] EXT4-fs (nvme0n1p2): mounted filesystem with ordered data mode. Opts: (null)",
    "[    3.100000] systemd[1]: Inserted module 'autofs4'",
    "[    3.200000] systemd[1]: Detected architecture x86-64.",
    "[    3.500000] systemd[1]: Set hostname to <Antigravity-OS>.",
    "[    4.000000] Starting Network Service...",
    "[    4.200000] Starting User Login Management Service...",
    "[    5.000000] Welcome to Antigravity OS!"
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index >= kernelLogs.length) {
        clearInterval(interval)
        setTimeout(onComplete, 1000 / speed)
        return
      }

      const newLog = kernelLogs[index]
      if (newLog) {
        setLogs(prev => [...prev, newLog])
      }
      index++

      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 150 / speed)

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className="h-screen w-full bg-black text-white font-mono text-xs md:text-sm p-4 overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className={`mb-1 ${log.includes("panic") ? "text-red-500" :
              log.includes("warn") ? "text-yellow-500" :
                log.includes("Welcome") ? "text-green-400 font-bold text-lg mt-4" :
                  "text-gray-300"
              }`}
          >
            {log}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Loading Spinner Overlay */}
      <div className="fixed bottom-10 right-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-gray-600 border-t-green-500 rounded-full"
        />
      </div>
    </div>
  )
}
