// app/types/navigation.ts

import type { NavigatorScreenParams } from "@react-navigation/native"

export type ParticipantStackParamList = {
  ParticipantDashboard: undefined
  ParticipantLoginScreen: {
    surveyId: number
    title?: string
    questions?: any[]
  }
  Survey: undefined
  SurveyList: undefined
  SurveyDetail: {
    surveyId: number
    title?: string
    questions?: any[]
  }
}

export type AppStackParamList = {
  Auth: undefined
  LoginScreen: undefined
  ParticipantTab: NavigatorScreenParams<ParticipantStackParamList>
  SurveyTab: undefined
  StudyTab: undefined
  ProfileTab: undefined
}
