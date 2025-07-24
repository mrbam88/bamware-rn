export const useSurveyNavigation = (
  currentIndex: number,
  total: number,
  setCurrentIndex: (index: number) => void,
) => {
  const canGoNext = currentIndex < total - 1
  const canGoBack = currentIndex > 0
  const isLastQuestion = currentIndex === total - 1

  const goNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1)
  }

  const goBack = () => {
    if (canGoBack) setCurrentIndex(currentIndex - 1)
  }

  return {
    canGoNext,
    canGoBack,
    isLastQuestion,
    goNext,
    goBack,
  }
}
