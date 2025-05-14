"use client"

import { useState } from "react"
import Window from "@/components/windows/window"

interface BrowserWindowProps {
  isActive: boolean
  onClose: () => void
  onActivate: () => void
  triggerThought: (text: string) => void
  showNotification: (message: string) => void
}

export default function BrowserWindow({
  isActive,
  onClose,
  onActivate,
  triggerThought,
  showNotification,
}: BrowserWindowProps) {
  const [url, setUrl] = useState("http://www.universidad.edu/plataforma")
  const [currentPage, setCurrentPage] = useState("main")

  const loadPage = () => {
    setCurrentPage("main")
  }

  const goToStressWorkshop = () => {
    setCurrentPage("stress-workshop")
  }

  const goBack = () => {
    setCurrentPage("main")
  }

  return (
    <Window
      title="Internet Explorer"
      isActive={isActive}
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={{ top: 140, left: 210 }}
      initialSize={{ width: 600, height: 400 }}
    >
      <div className="browser-container flex flex-col h-full">
        <div className="browser-toolbar flex p-[5px] bg-silver border-b border-[#888]">
          <button className="browser-back">◀</button>
          <button className="browser-forward">▶</button>
          <button className="browser-refresh" onClick={loadPage}>
            ↻
          </button>
          <div className="browser-url flex-grow border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] px-[5px] py-[2px] mx-[5px]">
            {url}
          </div>
          <button className="browser-go" onClick={loadPage}>
            Ir
          </button>
        </div>
        <div className="browser-content flex-grow border border-[#fff] border-solid border-t-[#888] border-l-[#888] border-b-[#fff] border-r-[#fff] bg-white overflow-auto p-[10px]">
          {currentPage === "main" ? (
            <>
              <h2>Universidad Nacional - Plataforma Virtual</h2>
              <p>Bienvenido a la plataforma de cursos, estudiante.</p>
              <hr />
              <h3>Avisos importantes:</h3>
              <p>
                <b>¡Atención!</b> Los exámenes finales comienzan el 2 de junio. Revisa tu calendario académico.
              </p>
              <p>
                <b>Nuevo:</b> El Centro de Bienestar Estudiantil ofrece sesiones de manejo de estrés.{" "}
                <button className="text-blue-600 underline" onClick={goToStressWorkshop}>
                  Más información
                </button>
              </p>
              <p>
                <b>Recordatorio:</b> La fecha límite para solicitar prórroga en entregas es el 15 de mayo.
              </p>
              <hr />
              <h3>Materias activas:</h3>
              <ul>
                <li>
                  Estadística Aplicada - <span className="text-red-600">1 tarea pendiente</span>
                </li>
                <li>
                  Metodología de Investigación - <span className="text-red-600">Proyecto final atrasado</span>
                </li>
                <li>Economía II - Al día</li>
                <li>
                  Programación Avanzada - <span className="text-red-600">Examen próximo</span>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h2>Taller de Manejo del Estrés Académico</h2>
              <p>
                El Centro de Bienestar Estudiantil invita a todos los estudiantes a participar en nuestro taller semanal
                de manejo del estrés.
              </p>
              <h3>Detalles:</h3>
              <ul>
                <li>
                  <b>Cuándo:</b> Todos los miércoles, 17:00-18:30
                </li>
                <li>
                  <b>Dónde:</b> Sala 105, Edificio de Bienestar Estudiantil
                </li>
                <li>
                  <b>Facilitador:</b> Lic. Martín Rojas, Psicólogo
                </li>
              </ul>
              <p>No es necesario inscribirse previamente. El taller es gratuito para todos los estudiantes.</p>
              <h3>Temas que se abordarán:</h3>
              <ul>
                <li>Técnicas de respiración y mindfulness</li>
                <li>Gestión efectiva del tiempo</li>
                <li>Establecimiento de límites saludables</li>
                <li>Estrategias para mejorar la calidad del sueño</li>
                <li>Comunicación asertiva</li>
              </ul>
              <p>
                <button className="text-blue-600 underline" onClick={goBack}>
                  « Volver
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </Window>
  )
}
