import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useSurveyFetcher } from "./useSurveyFetcher"
import { useSurveyState } from "./useSurveyState"
import { useSurveyNavigation } from "./useSurveyNavigation"
import { useSurveyValidator } from "./useSurveyValidator"
import { useSurveySubmitter } from "./useSurveySubmitter"

export const useSurveyFlowCoordinator = () => {
  const navigation = useNavigation()
  const { screens, isLoading, error, loadScreens } = useSurveyFetcher()
  const { currentIndex, currentScreen, answers, updateAnswer, setCurrentIndex, resetSurvey } =
    useSurveyState(screens)

  const { canGoNext, canGoBack, isLastScreen, goNext, goBack } = useSurveyNavigation(
    currentIndex,
    screens.length,
    setCurrentIndex,
  )

  const { isValid } = useSurveyValidator(currentScreen, answers)
  const { submit } = useSurveySubmitter()

  useEffect(() => {
    loadScreens()
  }, [loadScreens])

  const handleNext = () => {
    if (!isValid) return
    if (isLastScreen) {
      handleFinish()
    } else {
      goNext()
    }
  }

  const handleBack = () => {
    goBack()
  }

  const handleFinish = () => {
    submit(answers)
    console.log("Submitted!", answers)
    resetSurvey()
    navigation.navigate("Dashboard") // ✅ Navigate back to start screen
  }

  return {
    isLoading,
    error,
    currentScreen,
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
