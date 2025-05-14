"use client"

import { useState, useRef, useEffect } from "react"
import Window from "@/components/windows/window"

interface ChatWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  triggerThought: (text: string) => void
  increaseSocialMeter: (amount: number) => void
}

interface Message {
  sender?: string
  content: string
  time: string
  isSent: boolean
}

export default function ChatWindow({
  isActive,
  onClose,
  onActivate,
  triggerThought,
  increaseSocialMeter,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Lucía",
      content: "Alguien tiene las respuestas del ejercicio 5? Estoy atascada 😫",
      time: "10:24",
      isSent: false,
    },
    {
      content: "Yo tampoco pude terminarlo, este semestre está siendo demasiado",
      time: "10:30",
      isSent: true,
    },
    {
      sender: "Diego",
      content: "Nos reunimos para estudiar esta tarde? A las 4 en la biblioteca?",
      time: "10:45",
      isSent: false,
    },
    {
      sender: "Sara",
      content: "Yo no puedo, tengo que trabajar 😔 Se me están acumulando los deberes",
      time: "10:50",
      isSent: false,
    },
    {
      sender: "Lucía",
      content: "Alguien más tiene problemas para dormir antes de los exámenes?",
      time: "11:02",
      isSent: false,
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}`

    const newMessage: Message = {
      content: inputValue,
      time: timeString,
      isSent: true,
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Social interaction increases social meter
    increaseSocialMeter(5)

    // Simulate response after delay
    if (inputValue.toLowerCase().includes("reunión") || inputValue.toLowerCase().includes("estudiar")) {
      setTimeout(() => {
        const responseMessage: Message = {
          sender: "Diego",
          content: "¡Perfecto! Te esperamos en la biblioteca a las 4. Trae tus apuntes si puedes.",
          time: `${hours}:${(Number.parseInt(minutes) + 1).toString().padStart(2, "0")}`,
          isSent: false,
        }

        setMessages((prev) => [...prev, responseMessage])
        triggerThought(
          "Debería ir, pero no he avanzado nada en el proyecto... aunque estudiar con ellos me podría ayudar con el examen de mañana.",
        )
      }, 2000)
    } else if (
      inputValue.toLowerCase().includes("estresado") ||
      inputValue.toLowerCase().includes("cansado") ||
      inputValue.toLowerCase().includes("ayuda")
    ) {
      setTimeout(() => {
        const responseMessage: Message = {
          sender: "Lucía",
          content:
            "Todos estamos igual... ¿Has considerado hablar con alguien del centro de bienestar? A mí me está ayudando.",
          time: `${hours}:${(Number.parseInt(minutes) + 1).toString().padStart(2, "0")}`,
          isSent: false,
        }

        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }
  }

  return (
    <Window
      title="Mensajes - Grupo de Estudio"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 120, left: 180 }}
    >
      <div className="chat-container flex flex-col h-full">
        <div className="chat-messages flex-grow border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] p-[5px] overflow-y-auto bg-white mb-[10px]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message mb-[8px] max-w-[80%] ${message.isSent ? "message-sent ml-auto bg-[#e0e0e0]" : "message-received mr-auto bg-[#f0f0f0]"} p-[5px] rounded-[5px]`}
            >
              {message.sender && <div className="message-sender font-bold mb-[2px]">{message.sender}</div>}
              <div className="message-content">{message.content}</div>
              <div className="message-time text-[10px] text-[#888] text-right">{message.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container flex">
          <input
            type="text"
            className="chat-input flex-grow border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] p-[3px] mr-[5px]"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="chat-send" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </Window>
  )
}
