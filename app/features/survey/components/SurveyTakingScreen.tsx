import { useEffect } from "react"
import { useSurveyFetcher } from "../hooks/useSurveyFetcher"
import { useSurveyState } from "../hooks/useSurveyState"
import { useSurveyNavigation } from "../hooks/useSurveyNavigation"
import { useSurveyValidator } from "../hooks/useSurveyValidator"
import { useSurveySubmitter } from "../hooks/useSurveySubmitter"

export const SurveyFlowCoordinator = () => {
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
      submit(answers)
    } else {
      goNext()
    }
  }

  if (isLoading || error || !currentScreen) return null

  return {
    currentScreen,
    answers,
    updateAnswer,
    canGoNext: isValid && canGoNext,
    canGoBack,
    handleNext,
    handleBack: goBack,
    isLastScreen,
    resetSurvey,
  }
}
