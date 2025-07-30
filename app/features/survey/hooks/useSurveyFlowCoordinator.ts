import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSurveyFetcher } from "./useSurveyFetcher"
import { useSurveyState } from "./useSurveyState"
import { submitSurveyAnswers } from "../api/submitSurveyAnswers"
import type { Question } from "../types"

type AppStackParamList = {
  Dashboard: undefined
}

export const useSurveyFlowCoordinator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { questions, isLoading, error, loadSurvey } = useSurveyFetcher()
  const { currentIndex, currentQuestions, answers, updateAnswer, setCurrentIndex, resetSurvey } =
    useSurveyState(questions)

  const canGoBack = currentIndex > 0
  const canGoNext = currentIndex < questions.length - 1
  const isLastScreen = currentIndex === questions.length - 1

  const isValid = currentQuestions.every((q: Question) => {
    const value = answers[q.id]
    if (q.required) return value !== null && value !== undefined && value !== ""
    return true
  })

  useEffect(() => {
    loadSurvey()
  }, [loadSurvey])

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1)
  }

  const handleBack = () => {
    if (canGoBack) setCurrentIndex(currentIndex - 1)
  }

  const handleFinish = async () => {
    try {
      console.log("Submitting answers:", answers)
      await submitSurveyAnswers(answers)
      resetSurvey()
      navigation.navigate("Dashboard")
    } catch (err) {
      console.error("Failed to submit survey:", err)
    }
  }

  return {
    isLoading,
    error,
    currentQuestions,
    answers,
    updateAnswer,
    canGoNext,
    canGoBack,
    handleNext,
    handleBack,
    handleFinish,
    isLastScreen,
    resetSurvey,
    isValid,
  }
}
