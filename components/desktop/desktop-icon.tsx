"use client"

import Image from "next/image"

interface DesktopIconProps {
  id: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ id, label, onClick }: DesktopIconProps) {
  return (
    <div className="flex flex-col items-center w-[70px] m-[10px] cursor-pointer" onClick={onClick}>
      <Image src={`/placeholder.svg?height=32&width=32`} alt={label} width={32} height={32} className="mb-[5px]" />
      <div className="text-white text-center text-xs shadow-[1px_1px_1px_black]">{label}</div>
    </div>
  )
}
