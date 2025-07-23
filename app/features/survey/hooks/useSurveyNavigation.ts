export const useSurveyNavigation = (
  currentIndex: number,
  totalScreens: number,
  setCurrentIndex: (index: number) => void,
) => {
  const canGoNext = currentIndex < totalScreens - 1
  const canGoBack = currentIndex > 0
  const isLastScreen = currentIndex === totalScreens - 1

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goBack = () => {
    if (canGoBack) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return {
    canGoNext,
    canGoBack,
    isLastScreen,
    goNext,
    goBack,
  }
}
