import { useState, useMemo } from "react"

export const useSurveyState = (screens: any[]) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const currentScreen = useMemo(() => screens?.[currentIndex] ?? null, [screens, currentIndex])

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const resetSurvey = () => {
    setCurrentIndex(0)
    setAnswers({})
  }

  return {
    currentIndex,
    currentScreen,
    answers,
    updateAnswer,
    setCurrentIndex,
    resetSurvey,
  }
}
