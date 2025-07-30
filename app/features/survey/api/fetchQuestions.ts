import { getAccessToken } from "@/features/auth/sessionStorage"
import type { Question } from "../../../types/question"

const BASE_URL = "http://localhost:8000/api"

export async function fetchQuestions(): Promise<Question[]> {
  const token = await getAccessToken()
  console.log("Fetching questions with token:", token)

  const res = await fetch(`${BASE_URL}/questions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const text = await res.text()

  try {
    const data = JSON.parse(text)
    console.log(" Questions fetched:", data.length)
    return data as Question[]
  } catch (err) {
    console.error(" Failed to parse questions JSON:", text)
    throw new Error("Failed to fetch questions")
  }
}
