"use client"

import { useState, useEffect } from "react"

interface ThoughtBubbleProps {
  text: string
}

export default function ThoughtBubble({ text }: ThoughtBubbleProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Position the thought bubble randomly on screen
    const x = 100 + Math.random() * (window.innerWidth - 350)
    const y = 100 + Math.random() * (window.innerHeight - 200)

    setPosition({ x, y })
  }, [text])

  return (
    <div
      className="thought-bubble absolute bg-[#ffffcc] border border-[#ddd] p-[10px] rounded-[10px] shadow-[2px_2px_5px_rgba(0,0,0,0.2)] max-w-[200px] text-xs italic text-[#555] z-[1000]"
      style={{
        left: position.x,
        top: position.y,
        display: "block",
      }}
    >
      {text}
    </div>
  )
}
