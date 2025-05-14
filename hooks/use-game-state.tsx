"use client"

import { useState, useEffect } from "react"

export function useGameState() {
  const [gameTime, setGameTime] = useState(0)
  const [stressLevel, setStressLevel] = useState(50)
  const [socialMeter, setSocialMeter] = useState(50)
  const [academicMeter, setAcademicMeter] = useState(40)
  const [wellbeingMeter, setWellbeingMeter] = useState(45)

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const increaseStress = (amount: number) => {
    setStressLevel((prev) => Math.min(100, prev + amount))
  }

  const decreaseStress = (amount: number) => {
    setStressLevel((prev) => Math.max(0, prev - amount))
  }

  const increaseSocialMeter = (amount: number) => {
    setSocialMeter((prev) => Math.min(100, prev + amount))
  }

  const decreaseSocialMeter = (amount: number) => {
    setSocialMeter((prev) => Math.max(0, prev - amount))
  }

  const increaseAcademicMeter = (amount: number) => {
    setAcademicMeter((prev) => Math.min(100, prev + amount))
  }

  const decreaseAcademicMeter = (amount: number) => {
    setAcademicMeter((prev) => Math.max(0, prev - amount))
  }

  const increaseWellbeingMeter = (amount: number) => {
    setWellbeingMeter((prev) => Math.min(100, prev + amount))
  }

  const decreaseWellbeingMeter = (amount: number) => {
    setWellbeingMeter((prev) => Math.max(0, prev - amount))
  }

  return {
    gameTime,
    stressLevel,
    socialMeter,
    academicMeter,
    wellbeingMeter,
    increaseStress,
    decreaseStress,
    increaseSocialMeter,
    decreaseSocialMeter,
    increaseAcademicMeter,
    decreaseAcademicMeter,
    increaseWellbeingMeter,
    decreaseWellbeingMeter,
  }
}
