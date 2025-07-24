import { useState } from "react"

export function useSurveyAnswers() {
  const [answers, setAnswers] = useState<Record<number, any>>({})

  const updateAnswer = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return { answers, updateAnswer }
}
