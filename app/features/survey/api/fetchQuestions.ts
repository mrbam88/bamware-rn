import { getAccessToken } from "@/features/auth/sessionStorage"
import { normalizeQuestion } from "../normalizeQuestion"
import type { Question } from "../../../types/question"
import Config from "@/config"

export async function fetchQuestions(): Promise<Question[]> {
  const token = await getAccessToken()
  console.log("Fetching questions with token:", token)

  try {
    const res = await fetch(`${Config.apiBaseUrl}/questions/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const text = await res.text()

    let raw
    try {
      raw = JSON.parse(text)
    } catch (err) {
      console.error("Failed to parse JSON:", text)
      throw new Error("Malformed JSON in response")
    }

    if (!Array.isArray(raw)) {
      console.error("Expected array but got:", typeof raw, raw)
      throw new Error("Invalid API response shape")
    }

    const normalized = raw
      .map((r, i) => {
        const n = normalizeQuestion(r)
        if (!n) {
          console.warn(`Skipped invalid question at index ${i}`, r)
        }
        return n
      })
      .filter((q): q is Question => q !== null)

    console.log(`Normalized ${normalized.length} questions`)
    return normalized
  } catch (err) {
    console.error("Failed to fetch questions:", err)
    throw err
  }
}
