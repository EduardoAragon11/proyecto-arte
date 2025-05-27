"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Taskbar from "@/components/desktop/taskbar"
import DesktopIcon from "@/components/desktop/desktop-icon"
import EmailWindow from "@/components/windows/email-window"
import TodoWindow from "@/components/windows/todo-window"
import CalendarWindow from "@/components/windows/calendar-window"
import ChatWindow from "@/components/windows/chat-window"
import BrowserWindow from "@/components/windows/browser-window"
import JournalWindow from "@/components/windows/journal-window"
import HealthWindow from "@/components/windows/health-window"
import ThoughtBubble from "@/components/ui/thought-bubble"
import Notification from "@/components/ui/notification"
import { useGameState } from "@/hooks/use-game-state"
import StartScreen from "../screens/StartScreen"

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [thought, setThought] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)	
  const {
    gameTime,
    gameStarted,
    startGame,
    stressLevel,
    socialMeter,
    academicMeter,
    wellbeingMeter,
    increaseStress,
    decreaseStress,
    increaseSocialMeter,
    increaseAcademicMeter,
    increaseWellbeingMeter,
    decreaseAcademicMeter,
    decreaseWellbeingMeter,
  } = useGameState()

  const handleStartGame = (username: string) => {
    setUsername(username)
    startGame()
  }

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
    }
    setActiveWindow(windowId)

    // Trigger specific thoughts based on which app is opened
    if (windowId === "email") {
      triggerThought(
        "Debería revisar el email del profesor Méndez primero... pero me da ansiedad ver qué dice sobre mi entrega atrasada.",
      )
    } else if (windowId === "todo") {
      triggerThought("Tantas cosas pendientes... ¿por dónde empiezo?")
    } else if (windowId === "health") {
      triggerThought("No quiero ni ver esto ahora mismo, pero sé que debería prestarle atención.")
    }
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== windowId))
    if (activeWindow === windowId) {
      setActiveWindow(openWindows.length > 1 ? openWindows[0] : null)
    }
  }

  const triggerThought = (text: string) => {
    setThought(text)
    setTimeout(() => setThought(null), 6000)
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  // Game loop and random events
  useEffect(() => {
    if(!gameStarted) return
    const gameLoopInterval = setInterval(() => {
      // Gradually increase stress if nothing is done
      if (gameTime % 100 === 0) {
        increaseStress(2)
      }

      // Random events
      if (gameTime % 50 === 0) {
        const randomEvent = Math.floor(Math.random() * 5)

        switch (randomEvent) {
          case 0:
            triggerThought("Me siento tan cansado... ¿cuándo fue la última vez que dormí bien?")
            break
          case 1:
            triggerThought("No he hablado con mi familia en semanas... debería llamarlos.")
            break
          case 2:
            triggerThought("¿Valdrá la pena todo este esfuerzo al final?")
            break
          case 3:
            showNotification("Tienes 3 tareas pendientes para esta semana.")
            break
          case 4:
            // Add a new message in chat
            const messages = [
              { sender: "Sara", content: "¿Alguien más se siente abrumado por todo?" },
              { sender: "Diego", content: "¿Pudiste avanzar con el proyecto de Metodología?" },
              { sender: "Lucía", content: "¿Vamos a tomar algo este fin de semana? Necesito despejarme" },
            ]

            const randomMessage = messages[Math.floor(Math.random() * messages.length)]

            if (!openWindows.includes("chat")) {
              showNotification(`Nuevo mensaje de ${randomMessage.sender}: "${randomMessage.content}"`)
            }
            break
        }
      }
    }, 1000)

    // Initial events
    const initialEventsTimeout = setTimeout(() => {
      showNotification("Tienes un nuevo correo del Dr. Méndez sobre tu proyecto atrasado.")

      setTimeout(() => {
        triggerThought("Otro día más... tengo tanto que hacer y me siento tan cansado.")
      }, 2000)
    }, 3000)

    return () => {
      clearInterval(gameLoopInterval)
      clearTimeout(initialEventsTimeout)
    }
  }, [gameTime, openWindows,gameStarted])

    if(!gameStarted){
    return <StartScreen onStartGame={handleStartGame} />
  }

  return (
    <div className="desktop h-screen w-full relative overflow-hidden p-5 cursor-default select-none">
      {/* Desktop Background */}
      <Image
        src="/backgrounds/xp-bliss.jpg"
        alt="Windows XP Desktop Background"
        fill
        className="object-cover"
        priority
      />

      {/* Desktop Icons */}
      <div className="relative z-10 h-full w-full p-5">
        <DesktopIcon id="email" label="Correo" onClick={() => openWindow("email")} />
        <DesktopIcon id="todo" label="Tareas" onClick={() => openWindow("todo")} />
        <DesktopIcon id="calendar" label="Calendario" onClick={() => openWindow("calendar")} />
        <DesktopIcon id="chat" label="Mensajes" onClick={() => openWindow("chat")} />
        <DesktopIcon id="browser" label="Internet" onClick={() => openWindow("browser")} />
        <DesktopIcon id="journal" label="Diario" onClick={() => openWindow("journal")} />
        <DesktopIcon id="health" label="Bienestar" onClick={() => openWindow("health")} />
      </div>

      {/* Windows */}
      {openWindows.includes("email") && (
        <EmailWindow
          isActive={activeWindow === "email"}
          onClose={() => closeWindow("email")}
          onActivate={() => setActiveWindow("email")}
          triggerThought={triggerThought}
          showNotification={showNotification}
          increaseStress={increaseStress}
          decreaseStress={decreaseStress}
          increaseAcademicMeter={increaseAcademicMeter}
          decreaseAcademicMeter={decreaseAcademicMeter}
          increaseWellbeingMeter={increaseWellbeingMeter}
        />
      )}

      {openWindows.includes("todo") && (
        <TodoWindow
          isActive={activeWindow === "todo"}
          onClose={() => closeWindow("todo")}
          onActivate={() => setActiveWindow("todo")}
          increaseWellbeingMeter={increaseWellbeingMeter}
          decreaseStress={decreaseStress}
          increaseAcademicMeter={increaseAcademicMeter}
          showNotification={showNotification}
        />
      )}

      {openWindows.includes("calendar") && (
        <CalendarWindow
          isActive={activeWindow === "calendar"}
          onClose={() => closeWindow("calendar")}
          onActivate={() => setActiveWindow("calendar")}
        />
      )}

      {openWindows.includes("chat") && (
        <ChatWindow
          isActive={activeWindow === "chat"}
          onClose={() => closeWindow("chat")}
          onActivate={() => setActiveWindow("chat")}
          triggerThought={triggerThought}
          increaseSocialMeter={increaseSocialMeter}
        />
      )}

      {openWindows.includes("browser") && (
        <BrowserWindow
          isActive={activeWindow === "browser"}
          onClose={() => closeWindow("browser")}
          onActivate={() => setActiveWindow("browser")}
          triggerThought={triggerThought}
          showNotification={showNotification}
        />
      )}

      {openWindows.includes("journal") && (
        <JournalWindow
          isActive={activeWindow === "journal"}
          onClose={() => closeWindow("journal")}
          onActivate={() => setActiveWindow("journal")}
          triggerThought={triggerThought}
        />
      )}

      {openWindows.includes("health") && (
        <HealthWindow
          isActive={activeWindow === "health"}
          onClose={() => closeWindow("health")}
          onActivate={() => setActiveWindow("health")}
          stressLevel={stressLevel}
          wellbeingMeter={wellbeingMeter}
          socialMeter={socialMeter}
          showNotification={showNotification}
          decreaseStress={decreaseStress}
          increaseWellbeingMeter={increaseWellbeingMeter}
          increaseStress={increaseStress}
          decreaseAcademicMeter={decreaseAcademicMeter}
          decreaseWellbeingMeter={decreaseWellbeingMeter}
        />
      )}

      {/* Thought Bubble */}
      {thought && <ThoughtBubble text={thought} />}

      {/* Notification */}
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} activeWindow={activeWindow} />
    </div>
  )
}
