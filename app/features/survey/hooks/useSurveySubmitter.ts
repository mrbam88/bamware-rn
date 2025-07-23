import { submitSurveyAnswers } from "../api/submitSurveyAnswers"

export const useSurveySubmitter = () => {
  const submit = async (answers: Record<string, any>) => {
    try {
      await submitSurveyAnswers(answers)
      console.log("Survey submitted successfully")
    } catch (err) {
      console.error("Survey submission failed", err)
    }
  }

  return { submit }
}
