"use client"

import { useState, useEffect } from "react"
import Window from "@/components/windows/window"
import { cn } from "@/lib/utils"

interface HealthWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  stressLevel: number
  wellbeingMeter: number
  socialMeter: number
  showNotification: (message: string) => void
  decreaseStress: (amount: number) => void
  increaseWellbeingMeter: (amount: number) => void
  increaseStress: (amount: number) => void
  decreaseAcademicMeter: (amount: number) => void
  decreaseWellbeingMeter: (amount: number) => void
}

interface Meter {
  label: string
  value: number
  getValue: () => number
}

export default function HealthWindow({
  isActive,
  onClose,
  onActivate,
  stressLevel,
  wellbeingMeter,
  socialMeter,
  showNotification,
  decreaseStress,
  increaseWellbeingMeter,
  increaseStress,
  decreaseAcademicMeter,
  decreaseWellbeingMeter,
}: HealthWindowProps) {
  const [showCriticalEvent, setShowCriticalEvent] = useState(false)

  useEffect(() => {
    // Trigger critical event if stress is too high
    if (stressLevel > 80 && !showCriticalEvent) {
      setShowCriticalEvent(true)
    }
  }, [stressLevel])

  const meters: Meter[] = [
    {
      label: "Energía:",
      value: 40 - stressLevel / 10,
      getValue: () => Math.max(10, Math.min(100, 40 - stressLevel / 10)),
    },
    {
      label: "Ánimo:",
      value: wellbeingMeter,
      getValue: () => Math.max(10, Math.min(100, wellbeingMeter)),
    },
    {
      label: "Concentración:",
      value: 30 - stressLevel / 10,
      getValue: () => Math.max(10, Math.min(100, 30 - stressLevel / 10)),
    },
    {
      label: "Descanso:",
      value: 25 - stressLevel / 10,
      getValue: () => Math.max(10, Math.min(100, 25 - stressLevel / 10)),
    },
    {
      label: "Social:",
      value: socialMeter,
      getValue: () => Math.max(10, Math.min(100, socialMeter)),
    },
  ]

  const getMeterClass = (value: number) => {
    if (value < 30) return "bg-[#ff0000]"
    if (value < 60) return "bg-[#ffcc00]"
    return "bg-[#00aa00]"
  }

  const handleSeekHelp = () => {
    showNotification("Has decidido priorizar tu bienestar. Programando cita con el Centro de Salud...")
    decreaseStress(20)
    increaseWellbeingMeter(15)
    setShowCriticalEvent(false)
  }

  const handleIgnoreWarning = () => {
    showNotification("Has ignorado las señales de tu cuerpo. Tu concentración y rendimiento disminuyen...")
    increaseStress(10)
    decreaseAcademicMeter(10)
    decreaseWellbeingMeter(10)
    setShowCriticalEvent(false)
  }

  return (
    <Window
      title="Monitor de Bienestar"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 180, left: 270 }}
    >
      <div>
        <h3>Estado de Bienestar Actual</h3>
        <div className="health-meters flex flex-col gap-[10px]">
          {meters.map((meter, index) => (
            <div key={index} className="meter-container flex items-center">
              <div className="meter-label w-[100px]">{meter.label}</div>
              <div className="meter h-[15px] flex-grow border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] bg-[#eee]">
                <div
                  className={cn("meter-fill h-full", getMeterClass(meter.getValue()))}
                  style={{ width: `${meter.getValue()}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <h3>Recomendaciones:</h3>
        <ul>
          <li>Tu nivel de descanso está bajo. Considera dormir al menos 7 horas.</li>
          <li>Tu concentración está disminuyendo. Toma descansos breves cada hora.</li>
          <li>Recuerda asistir a tu cita con el psicólogo hoy a las 15:00.</li>
        </ul>

        {showCriticalEvent && (
          <div className="critical-event mt-4 p-4 border-2 border-red-600 bg-red-100">
            <h3 className="text-red-600 font-bold">¡Tu nivel de estrés es crítico!</h3>
            <p>Has estado ignorando señales importantes de tu bienestar.</p>
            <p>Por favor, tómate un descanso y considera buscar ayuda.</p>
            <div className="mt-4 flex gap-2">
              <button className="px-2 py-1 bg-blue-500 text-white" onClick={handleSeekHelp}>
                Buscar ayuda
              </button>
              <button className="px-2 py-1 bg-gray-300" onClick={handleIgnoreWarning}>
                Continuar trabajando
              </button>
            </div>
          </div>
        )}
      </div>
    </Window>
  )
}
