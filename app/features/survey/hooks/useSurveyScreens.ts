import { useQuery } from "@tanstack/react-query"
import { fetchSurveyScreens } from "../api/fetchSurveyScreens"

export function useSurveyScreens() {
  return useQuery({ queryKey: ["surveyScreens"], queryFn: fetchSurveyScreens })
}
