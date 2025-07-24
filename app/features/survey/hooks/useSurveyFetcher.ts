import { useCallback, useState } from "react"
import surveyMock from "../mock/surveyMock.json"
import type { Question } from "../types"

export function useSurveyFetcher() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadSurvey = useCallback(() => {
    try {
      const transformed: Question[] = surveyMock.questions.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type as Question["type"],
        rank: q.rank,
        options: q.options,
      }))
      setQuestions(transformed)
      setIsLoading(false)
    } catch {
      setError("Failed to load survey")
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
