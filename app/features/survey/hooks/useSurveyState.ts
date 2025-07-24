import { useState } from "react"
import type { Question, SurveyAnswerMap } from "../types"

export const useSurveyState = (questions: Question[]) => {
  const [answers, setAnswers] = useState<SurveyAnswerMap>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentQuestions = questions.length > 0 ? [questions[currentIndex]] : []

  const updateAnswer = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const resetSurvey = () => {
    setAnswers({})
    setCurrentIndex(0)
  }

  return {
    currentIndex,
    currentQuestions,
    answers,
    updateAnswer,
    setCurrentIndex,
    resetSurvey,
  }
}
