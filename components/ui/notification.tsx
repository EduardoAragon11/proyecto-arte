"use client"

interface NotificationProps {
  message: string
  onClose: () => void
}

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <div className="notification absolute bottom-[40px] right-[10px] w-[300px] bg-silver border border-[#fff] border-solid border-t-[#fff] border-l-[#fff] border-b-[#888] border-r-[#888] shadow-[1px_1px_0_black] z-[1000] p-[10px] block">
      <div>{message}</div>
      <button className="notification-close mt-2 px-2 py-1" onClick={onClose}>
        Cerrar
      </button>
    </div>
  )
}
