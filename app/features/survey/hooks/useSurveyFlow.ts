import { useState } from "react"
import surveyData from "../mock/surveyMock.json"
import type { Question } from "../types"

export function useSurveyFlow() {
  const questions = surveyData.questions.sort((a, b) => a.rank - b.rank)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})

  const currentQuestion = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const isFirst = currentIndex === 0

  const updateAnswer = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const next = () => {
    if (!isLast) setCurrentIndex((i) => i + 1)
  }

  const back = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1)
  }

  const reset = () => {
    setCurrentIndex(0)
    setAnswers({})
  }

  return {
    currentQuestion,
    answers,
    updateAnswer,
    next,
    back,
    reset,
    isLast,
    isFirst,
  }
}
