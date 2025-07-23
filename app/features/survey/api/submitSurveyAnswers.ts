export async function submitSurveyAnswers(answers: any[]) {
  console.log("Mock submission:", answers)
  return Promise.resolve({ success: true })
}