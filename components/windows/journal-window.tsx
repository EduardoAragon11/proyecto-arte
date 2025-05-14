"use client"

import Window from "@/components/windows/window"

interface JournalWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  triggerThought: (text: string) => void
}

export default function JournalWindow({ isActive, onClose, onActivate, triggerThought }: JournalWindowProps) {
  const handleJournalClick = () => {
    triggerThought(
      "A veces me ayuda escribir cómo me siento... pero también me hace darme cuenta de lo abrumado que estoy.",
    )
  }

  return (
    <Window
      title="Diario Personal"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 160, left: 240 }}
    >
      <div className="journal-container flex flex-col h-full">
        <div
          className="journal-entry border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] bg-white p-[10px] h-full font-['Comic_Sans_MS',_cursive] text-sm overflow-y-auto"
          onClick={handleJournalClick}
        >
          <p>
            <b>12 de mayo, 2025</b>
          </p>
          <p>Querido diario,</p>
          <p>
            Otra vez me quedé dormido después de estudiar hasta las 3 AM. No logro ponerme al día con todas las
            materias. La cita con el psicólogo es hoy, pero estoy considerando cancelarla para avanzar con el proyecto
            de Metodología... aunque ya está atrasado.
          </p>
          <p>
            Me siento abrumado. Mis padres siguen preguntando por mis calificaciones, pero no tengo el valor de decirles
            que estoy a punto de reprobar dos materias. No sé cómo lo voy a lograr este semestre.
          </p>
          <p>
            Lo bueno es que el grupo de estudio ha sido un apoyo, aunque todos estamos igual de estresados. Sara
            menciona que también está teniendo problemas para dormir.
          </p>
          <p>A veces me pregunto si la universidad realmente vale la pena...</p>
        </div>
      </div>
    </Window>
  )
}
