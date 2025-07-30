import { getAccessToken } from "@/features/auth/sessionStorage"
import type { Question } from "../../../types/question"
import { normalizeQuestion } from "../normalizeQuestion"
import Config from "@/config"

export async function fetchQuestions(): Promise<Question[]> {
  const token = await getAccessToken()

  const res = await fetch(`${Config.apiBaseUrl}/questions/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
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
    throw new Error(message)
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid API response shape")
  }

  const questions = parsed.map(normalizeQuestion).filter((q): q is Question => q !== null)

  return questions
}
