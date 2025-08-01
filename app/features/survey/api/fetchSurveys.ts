import { getAccessToken } from "@/features/auth/sessionStorage"
import type { Survey } from "../../../types/survey"
import Config from "@/config"

export async function fetchSurveys(): Promise<Survey[]> {
  const token = await getAccessToken()

  const res = await fetch(`${Config.apiBaseUrl}/surveys/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })

  const text = await res.text()
  let parsed

  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error("Invalid JSON in response")
  }

  if (!res.ok || parsed?.error || parsed?.detail) {
    const message = parsed?.detail || parsed?.error || `Error ${res.status}`
    throw new Error(`Survey fetch failed: ${message}`)
  }

  const results = parsed?.results ?? parsed
  if (!Array.isArray(results)) {
    throw new Error("Invalid API response shape")
  }

  return results as Survey[]
}
