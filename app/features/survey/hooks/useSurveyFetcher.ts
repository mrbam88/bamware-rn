import { useState } from "react"
import { fetchSurveyScreens } from "../api/fetchSurveyScreens"

export const useSurveyFetcher = () => {
  const [screens, setScreens] = useState<any[]>([])
  const [surveyTitle, setSurveyTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loadScreens = async () => {
    setIsLoading(true)
    try {
      const data = await fetchSurveyScreens()
      setScreens(data.screens)
      setSurveyTitle(data.title)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    screens,
    surveyTitle,
    isLoading,
    error,
    loadScreens,
  }
}
