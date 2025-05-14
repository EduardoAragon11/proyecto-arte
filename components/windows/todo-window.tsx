"use client"

import { useState } from "react"
import Window from "@/components/windows/window"
import { cn } from "@/lib/utils"

interface TodoWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  increaseWellbeingMeter: (amount: number) => void
  decreaseStress: (amount: number) => void
  increaseAcademicMeter: (amount: number) => void
  showNotification: (message: string) => void
}

interface TodoItem {
  id: string
  label: string
  priority: "urgent" | "today" | "upcoming" | "completed"
  completed: boolean
}

export default function TodoWindow({
  isActive,
  onClose,
  onActivate,
  increaseWellbeingMeter,
  decreaseStress,
  increaseAcademicMeter,
  showNotification,
}: TodoWindowProps) {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "todo1",
      label: "Entregar proyecto final (ATRASADO)",
      priority: "urgent",
      completed: false,
    },
    {
      id: "todo2",
      label: "Estudiar para examen de Estadística (MAÑANA)",
      priority: "today",
      completed: false,
    },
    {
      id: "todo3",
      label: "Asistir a cita con psicólogo (HOY 15:00)",
      priority: "today",
      completed: false,
    },
    {
      id: "todo4",
      label: "Devolver libros a biblioteca (Esta semana)",
      priority: "upcoming",
      completed: false,
    },
    {
      id: "todo5",
      label: "Inscribirse a exámenes finales",
      priority: "upcoming",
      completed: false,
    },
    {
      id: "todo6",
      label: "Enviar correo al profesor",
      priority: "completed",
      completed: true,
    },
  ])

  const handleTodoChange = (todoId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          const completed = !todo.completed

          // Special event for the therapy appointment
          if (todoId === "todo3" && completed) {
            showNotification(
              "Has asistido a tu cita con el psicólogo. Te sientes un poco mejor después de hablar sobre tu situación.",
            )
            increaseWellbeingMeter(15)
            decreaseStress(20)
          }

          // Project submission
          if (todoId === "todo1" && completed) {
            showNotification(
              "¡Has enviado el proyecto atrasado! Te sientes aliviado, aunque preocupado por la calificación.",
            )
            increaseAcademicMeter(10)
            increaseWellbeingMeter(10)
            decreaseStress(15)
          }

          return {
            ...todo,
            completed,
            priority: completed ? "completed" : todo.priority,
          }
        }
        return todo
      }),
    )
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600"
      case "today":
        return "text-[#8b0000]"
      case "upcoming":
        return "text-[#4682b4]"
      case "completed":
        return "text-gray-500 line-through"
      default:
        return ""
    }
  }

  return (
    <Window
      title="Lista de Tareas"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 80, left: 120 }}
    >
      <div className="todo-list border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] h-[200px] overflow-y-auto bg-white">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item p-[5px] border-b border-[#ddd] flex items-center">
            <input
              type="checkbox"
              id={todo.id}
              checked={todo.completed}
              onChange={() => handleTodoChange(todo.id)}
              className="mr-[10px]"
            />
            <label htmlFor={todo.id} className={cn(getPriorityClass(todo.priority))}>
              {todo.label}
            </label>
          </div>
        ))}
      </div>
    </Window>
  )
}
