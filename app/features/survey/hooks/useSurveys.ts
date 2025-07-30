import { useQuery } from "@tanstack/react-query"
import { fetchSurveys } from "../api/fetchSurveys"
import { Survey } from "@/types/survey"

export function useSurveys() {
  return useQuery<Survey[], Error>({
    queryKey: ["surveys"],
    queryFn: fetchSurveys,
  })
}
