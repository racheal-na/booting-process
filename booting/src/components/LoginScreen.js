"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LoginScreen({ onRestart }) {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        // Simulate login delay
        setTimeout(() => {
            setLoading(false)
            // For demo purposes, any password works or we can just restart
            onRestart()
        }, 2000)
    }

    return (
        <div className="h-screen w-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Background Animated Gradient */}
            <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 animate-gradient-xy" />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 mb-4 flex items-center justify-center text-4xl shadow-lg"
                    >
                        👤
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h2>
                    <p className="text-blue-200 text-sm mt-1">System Ready</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all font-mono"
                            disabled={loading}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Authenticating...
                            </span>
                        ) : "Login"}
                    </motion.button>
                </form>
            </motion.div>

            {/* Footer Info */}
            <div className="absolute bottom-6 text-center w-full text-gray-500 text-xs font-mono">
                <p>SECURE BOOT ENVIRONMENT v1.0</p>
            </div>
        </div>
    )
}
