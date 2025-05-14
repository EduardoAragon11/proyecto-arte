"use client"

import { useState } from "react"
import Window from "@/components/windows/window"
import { cn } from "@/lib/utils"

interface CalendarWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
}

export default function CalendarWindow({ isActive, onClose, onActivate }: CalendarWindowProps) {
  const [currentMonth, setCurrentMonth] = useState("Mayo 2025")

  // Calendar days data
  const days = [
    { day: "L" },
    { day: "M" },
    { day: "X" },
    { day: "J" },
    { day: "V" },
    { day: "S" },
    { day: "D" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5" },
    { day: "6" },
    { day: "7" },
    { day: "8" },
    { day: "9" },
    { day: "10" },
    { day: "11" },
    { day: "12", hasEvent: true, isCurrentDay: true },
    { day: "13", hasEvent: true },
    { day: "14" },
    { day: "15", hasEvent: true },
    { day: "16" },
    { day: "17" },
    { day: "18" },
  ]

  const prevMonth = () => {
    setCurrentMonth("Abril 2025")
  }

  const nextMonth = () => {
    setCurrentMonth("Junio 2025")
  }

  return (
    <Window
      title="Calendario"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 100, left: 150 }}
    >
      <div className="calendar-header flex justify-between items-center mb-[10px]">
        <button className="prev-month" onClick={prevMonth}>
          ◀
        </button>
        <div className="current-month">{currentMonth}</div>
        <button className="next-month" onClick={nextMonth}>
          ▶
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-[2px]">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "calendar-day h-[30px] border border-[#ddd] flex items-center justify-center relative",
              day.hasEvent &&
                "has-event after:content-[''] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2 after:w-[4px] after:h-[4px] after:bg-red-600 after:rounded-full",
              day.isCurrentDay && "bg-[#e0e0e0]",
            )}
          >
            {day.day}
          </div>
        ))}
      </div>
    </Window>
  )
}
