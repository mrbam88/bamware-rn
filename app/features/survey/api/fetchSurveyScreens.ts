import mockSurvey from "../mock/surveyMock.json"

export async function fetchSurveyScreens() {
  return Promise.resolve(mockSurvey)
}
