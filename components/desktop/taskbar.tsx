"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
}

export default function Taskbar({ openWindows, activeWindow }: TaskbarProps) {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-silver border-t border-white flex z-[1000]">
      <div className="flex items-center p-0 px-[5px] m-[2px] h-[22px] font-bold bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888]">
        <Image src="/placeholder.svg?height=16&width=16" alt="Start" width={16} height={16} className="mr-[2px]" />
        Inicio
      </div>
      <div className="taskbar-items"></div>
      <div className="ml-auto p-[5px] border-l border-[#888]">{time}</div>
    </div>
  )
}
