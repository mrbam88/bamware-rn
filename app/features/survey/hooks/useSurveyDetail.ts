import { useQuery } from "@tanstack/react-query"
import { getAccessToken } from "@/features/auth/sessionStorage"
import type { Survey } from "../../../types/survey"
import Config from "@/config"

export const useSurveyDetail = (surveyId: number) => {
  return useQuery<Survey, Error>({
    queryKey: ["survey", surveyId],
    queryFn: async () => {
      const token = await getAccessToken()
      const res = await fetch(`${Config.apiBaseUrl}/surveys/${surveyId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      const text = await res.text()
      let parsed
      try {
        parsed = JSON.parse(text)
      } catch {
        throw new Error("Invalid JSON response")
      }

      if (!res.ok || parsed?.error || parsed?.detail) {
        const msg = parsed?.detail || parsed?.error || `Status ${res.status}`
        throw new Error(msg)
      }

      return parsed as Survey
    },
  })
}
