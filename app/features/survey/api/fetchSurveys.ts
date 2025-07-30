import { Survey } from "@/types/survey"
import { getAccessToken } from "@/features/auth/sessionStorage"

const BASE_URL = "https://uat.api.flexcoa.com/api"

export async function fetchSurveys(): Promise<Survey[]> {
  const token = await getAccessToken()
  const res = await fetch(`${BASE_URL}/surveys/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Survey fetch failed: ${error}`)
  }

  const data = await res.json()
  return data.results as Survey[]
}
