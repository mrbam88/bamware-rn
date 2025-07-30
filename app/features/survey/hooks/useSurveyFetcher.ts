import { useCallback } from "react"
import { useQuestions } from "../hooks/useQuestions"

export const useSurveyFetcher = () => {
  const { data: questions = [], isLoading, error, refetch } = useQuestions()

  const loadSurvey = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    questions,
    isLoading,
    error,
    loadSurvey,
  }
}
