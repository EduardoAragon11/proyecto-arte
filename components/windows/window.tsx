"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface WindowProps {
  title: string
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  children: React.ReactNode
  initialPosition?: { top: number; left: number }
  initialSize?: { width: number; height: number }
}

export default function Window({
  title,
  isActive,
  onClose,
  onActivate,
  children,
  initialPosition = { top: 50, left: 50 },
  initialSize = { width: 500, height: 300 },
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("window-control")) return

    onActivate()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const x = e.clientX - dragOffset.x
      const y = e.clientY - dragOffset.y

      setPosition({
        left: Math.max(0, x),
        top: Math.max(0, y),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888] flex flex-col z-10",
        isActive && "z-[100]",
      )}
      style={{
        top: position.top,
        left: position.left,
        width: initialSize.width,
        height: initialSize.height,
      }}
      onClick={onActivate}
    >
      <div
        className="h-[18px] bg-[#000080] text-white flex items-center px-[2px] cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex-grow font-bold text-xs whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        <div className="flex">
          <div className="window-control w-[16px] h-[14px] ml-[2px] flex items-center justify-center bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888] text-[10px]">
            _
          </div>
          <div className="window-control w-[16px] h-[14px] ml-[2px] flex items-center justify-center bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888] text-[10px]">
            □
          </div>
          <div
            className="window-control w-[16px] h-[14px] ml-[2px] flex items-center justify-center bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888] text-[10px]"
            onClick={onClose}
          >
            ×
          </div>
        </div>
      </div>
      <div className="flex-grow p-[10px] overflow-auto bg-white m-[2px] relative">{children}</div>
    </div>
  )
}
