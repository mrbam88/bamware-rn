import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useSurveyFetcher } from "./useSurveyFetcher"
import { useSurveyState } from "./useSurveyState"

export const useSurveyFlowCoordinator = () => {
  const navigation = useNavigation()
  const { questions, isLoading, error, loadSurvey } = useSurveyFetcher()
  const { currentIndex, currentQuestions, answers, updateAnswer, setCurrentIndex, resetSurvey } =
    useSurveyState(questions)

  const canGoBack = currentIndex > 0
  const canGoNext = currentIndex < questions.length - 1
  const isLastScreen = currentIndex === questions.length - 1

  const isValid = currentQuestions.every((q) => {
    const value = answers[q.id]
    if (q.required) return value !== null && value !== undefined && value !== ""
    return true
  })

  useEffect(() => {
    loadSurvey()
  }, [])

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1)
  }

  const handleBack = () => {
    if (canGoBack) setCurrentIndex(currentIndex - 1)
  }

  const handleFinish = () => {
    console.log("✅ Submitted survey:", answers)
    resetSurvey()
    navigation.navigate("Dashboard")
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
