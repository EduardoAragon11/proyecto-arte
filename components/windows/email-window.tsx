"use client"

import { useState } from "react"
import Window from "@/components/windows/window"
import { cn } from "@/lib/utils"

interface EmailWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  triggerThought: (text: string) => void
  showNotification: (message: string) => void
  increaseStress: (amount: number) => void
  decreaseStress: (amount: number) => void
  increaseAcademicMeter: (amount: number) => void
  decreaseAcademicMeter: (amount: number) => void
  increaseWellbeingMeter: (amount: number) => void
}

interface Email {
  sender: string
  subject: string
  date: string
  content: string
}

export default function EmailWindow({
  isActive,
  onClose,
  onActivate,
  triggerThought,
  showNotification,
  increaseStress,
  decreaseStress,
  increaseAcademicMeter,
  decreaseAcademicMeter,
  increaseWellbeingMeter,
}: EmailWindowProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [readEmails, setReadEmails] = useState<string[]>([])

  const emails: Record<string, Email> = {
    "1": {
      sender: "Dr. Méndez <mendez@universidad.edu>",
      subject: "Entrega atrasada de Proyecto Final",
      date: "12/05/2025 09:15",
      content: `Estimado estudiante,

Me dirijo a usted para recordarle que el proyecto final de Metodología de Investigación debió ser entregado hace tres días. Esta es la tercera extensión que solicitó este semestre.

Entiendo que puede estar pasando por dificultades, pero es mi deber informarle que de no recibir el trabajo antes del viernes, deberé asignar una calificación reprobatoria para el curso.

Le recomiendo que se ponga en contacto con el Centro de Bienestar Estudiantil si está experimentando problemas que afectan su rendimiento académico.

Saludos cordiales,
Dr. Alejandro Méndez
Departamento de Metodología`,
    },
    "2": {
      sender: "Biblioteca Central <biblioteca@universidad.edu>",
      subject: "Recordatorio: Libros pendientes",
      date: "11/05/2025 14:30",
      content: `Estimado usuario,

Le recordamos que tiene 3 libros con fecha de devolución vencida:
- "Estadística para Ciencias Sociales" (vencido hace 12 días)
- "Manual de Investigación Cuantitativa" (vencido hace 7 días)
- "Economía: Principios y Aplicaciones" (vencido hace 5 días)

Por favor, devuelva los materiales a la brevedad para evitar multas adicionales. Su cuenta actualmente registra una multa de $15.50.

Atentamente,
Biblioteca Central Universitaria`,
    },
    "3": {
      sender: "Secretaría Académica <secretaria@universidad.edu>",
      subject: "Inscripción a exámenes",
      date: "10/05/2025 10:00",
      content: `Estimado estudiante,

Le informamos que el período de inscripción para exámenes finales está abierto desde hoy hasta el 20 de mayo.

Recuerde que debe estar al día con sus obligaciones administrativas y académicas para poder inscribirse correctamente.

Para inscribirse, acceda a la plataforma virtual con su usuario y contraseña.

Saludos cordiales,
Secretaría Académica`,
    },
    "4": {
      sender: "Centro de Salud <salud@universidad.edu>",
      subject: "Confirmación cita psicología",
      date: "09/05/2025 16:45",
      content: `Hola,

Este es un recordatorio de tu cita programada para HOY:

Fecha: 12/05/2025
Hora: 15:00
Profesional: Lic. Camila Torres
Servicio: Consulta Psicológica

Por favor, llega 10 minutos antes. Si necesitas cancelar o reprogramar, hazlo con al menos 24 horas de anticipación.

Recuerda que estos servicios son gratuitos para todos los estudiantes. Tu bienestar es nuestra prioridad.

Centro de Salud y Bienestar Estudiantil`,
    },
    "5": {
      sender: "Grupo de Estudio <lucia@mail.com>",
      subject: "Reunión de mañana",
      date: "09/05/2025 20:10",
      content: `Hola a todos,

Confirmando nuestra reunión de estudio para mañana a las 16:00 en la biblioteca central, sala de estudio 3.

Vamos a repasar para el examen de Estadística. Diego va a traer sus apuntes de clase y Sara preparó un resumen de los últimos capítulos.

¿Puedes traer los ejercicios resueltos que mencionaste? Sería de gran ayuda.

Todos estamos igual de estresados, pero juntos podemos lograrlo.

¡Nos vemos mañana!
Lucía`,
    },
  }

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId)

    if (!readEmails.includes(emailId)) {
      setReadEmails([...readEmails, emailId])
    }

    // Trigger thoughts based on email
    if (emailId === "1") {
      triggerThought("No puedo creer que ya es la tercera extensión... ¿Cómo voy a terminar este proyecto a tiempo?")
      setTimeout(() => {
        showNotification("El proyecto de Metodología está muy atrasado. Deberías trabajar en él ahora.")
        increaseStress(15)
        decreaseAcademicMeter(10)
      }, 3000)
    } else if (emailId === "4") {
      triggerThought("Tengo la cita hoy, pero no sé si tengo tiempo de ir con todo pendiente...")
    }
  }

  return (
    <Window title="Correo Universitario" isActive={isActive} onClose={onClose} onActivate={onActivate}>
      <div className="email-list border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] h-[150px] overflow-y-auto mb-[10px] bg-white">
        {Object.entries(emails).map(([id, email]) => (
          <div
            key={id}
            className={cn(
              "email-item p-[3px_5px] border-b border-[#ddd] cursor-pointer",
              !readEmails.includes(id) && "font-bold",
              selectedEmail === id && "bg-[#e0e0e0]",
            )}
            onClick={() => handleEmailClick(id)}
          >
            <strong>{email.subject.split(" - ")[0]}</strong> - {email.subject.split(" - ")[1]}
          </div>
        ))}
      </div>
      <div className="email-preview border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] p-[5px] h-[120px] overflow-y-auto bg-white">
        {selectedEmail ? (
          <>
            <strong>De:</strong> {emails[selectedEmail].sender}
            <br />
            <strong>Asunto:</strong> {emails[selectedEmail].subject}
            <br />
            <strong>Fecha:</strong> {emails[selectedEmail].date}
            <br />
            <hr />
            {emails[selectedEmail].content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </>
        ) : (
          "Selecciona un correo para ver su contenido."
        )}
      </div>
    </Window>
  )
}
