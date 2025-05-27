"use client"

import Image from "next/image"

interface DesktopIconProps {
  id: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ id, label, onClick }: DesktopIconProps) {
  //src based on label
  const iconSrc = `/icons/${id}.png`
  return (
    <div className="flex flex-col items-center w-[70px] m-[10px] cursor-pointer" onClick={onClick}>
      <Image src={iconSrc} alt={label} width={32} height={32} className="mb-[5px]" />
      <div className="text-white text-center text-xs shadow-[1px_1px_1px_black]">{label}</div>
    </div>
  )
}
