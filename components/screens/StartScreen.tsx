"use client"

import { useState } from "react"
import Image from "next/image"

interface StartScreenProps {
  onStartGame: (username: string) => void
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoading(true)
      // Simple 1 second delay before starting
      setTimeout(() => onStartGame(username), 1000)
    }
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Image
        src="/backgrounds/xp-login.jpg"
        alt="Windows XP Login Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Welcome text */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-center text-white">
        <div className="text-4xl font-light mb-2 drop-shadow-lg">welcome</div>
        <div className="text-sm drop-shadow-lg">Click your user name to begin</div>
      </div>

      {/* User login */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72">
        <div 
          onClick={handleLogin}
          className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded flex items-center gap-3 cursor-pointer"
        >
          <img 
            src="/icons/user.jpg" 
            alt="User" 
            className="w-12 h-12 rounded"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type username here"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50"
            disabled={isLoading}
            autoFocus
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-[#015db9] to-[#015db9]/50 flex items-center justify-between px-4">
        <button className="text-white text-sm opacity-80 hover:opacity-100 flex items-center gap-2">
          <span>⚡</span> Turn off computer
        </button>
        <div className="text-white text-sm opacity-80">
          {isLoading ? "Logging in..." : "Type your name and click to begin"}
        </div>
      </div>
    </div>
  )
}