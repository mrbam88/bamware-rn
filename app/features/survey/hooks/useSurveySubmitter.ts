import { submitSurveyAnswers } from "../api/submitSurveyAnswers"

export const useSurveySubmitter = () => {
  const submit = (answers: Record<string, any>) => {
    const payload = Object.entries(answers).map(([questionId, response]) => ({
      questionId: Number(questionId),
      response,
    }))

    submitSurveyAnswers(payload)
  }

  return { submit }
}
