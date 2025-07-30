import { getAccessToken } from "@/features/auth/sessionStorage"
import type { SurveyAnswerMap } from "../types"

const BASE_URL = "http://localhost:8000/api"

export async function submitSurveyAnswers(answers: SurveyAnswerMap): Promise<void> {
  const token = await getAccessToken()

  const payload = {
    answers: Object.entries(answers).map(([question_id, value]) => ({
      question_id: Number(question_id),
      answer: value,
    })),
  }

  const res = await fetch(`${BASE_URL}/submit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("❌ Survey submission failed:", errorText)
    throw new Error("Survey submission failed")
  }

  console.log("✅ Survey submitted successfully")
}
