import { useCallback, useState } from "react"
import surveyMock from "../mock/surveyMock.json"
import type { Question } from "../types"

export const useSurveyFetcher = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSurvey = useCallback(() => {
    try {
      const sorted = [...surveyMock.questions].sort((a, b) => a.rank - b.rank)
      setQuestions(sorted)
      setIsLoading(false)
    } catch (e) {
      setError("Failed to load survey.")
      setIsLoading(false)
    }
  }, [])

  return {
    questions,
    isLoading,
    error,
    loadSurvey,
  }
}
