export const useSurveyValidator = (currentScreen: any, answers: Record<string, any>) => {
  if (!currentScreen || !currentScreen.questions) return { isValid: false }

  const isValid = currentScreen.questions.every((q: any) => {
    const val = answers[q.question_id.toString()]
    return val !== undefined && val !== null && val !== ""
  })

  return { isValid }
}
