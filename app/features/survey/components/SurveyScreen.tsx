import { SafeAreaView, StyleSheet, Text } from "react-native"
import { useSurveyFlowCoordinator } from "../hooks/useSurveyFlowCoordinator"
import { SurveyScreenRenderer } from "../components/SurveyScreenRenderer"
import { SurveyControls } from "../components/SurveyControls"
import { colors } from "@/theme/colors"

export const SurveyScreen = () => {
  const {
    isLoading,
    error,
    currentScreen,
    answers,
    updateAnswer,
    canGoBack,
    handleNext,
    handleBack,
    handleFinish,
    isLastScreen,
    isValid,
  } = useSurveyFlowCoordinator()

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading survey</Text>
  if (!currentScreen) return <Text>No screen found</Text>

  return (
    <SafeAreaView style={styles.container}>
      <SurveyScreenRenderer screen={currentScreen} answers={answers} updateAnswer={updateAnswer} />
      <SurveyControls
        canGoBack={canGoBack}
        isLast={isLastScreen}
        onBack={handleBack}
        onNext={handleNext}
        onFinish={handleFinish}
        isValid={isValid}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
})
