import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Button } from "react-native"
import { useSurveyFlowCoordinator } from "../hooks/useSurveyFlowCoordinator"
import { SurveyScreenRenderer } from "./SurveyScreenRenderer"

export const SurveyScreen = () => {
  const {
    isLoading,
    error,
    currentQuestions,
    answers,
    updateAnswer,
    canGoBack,
    handleNext,
    handleBack,
    handleFinish,
    isLastScreen,
    isValid,
  } = useSurveyFlowCoordinator()

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading survey: {error}</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SurveyScreenRenderer
        questions={currentQuestions}
        answers={answers}
        updateAnswer={updateAnswer}
      />

      <View style={styles.buttonRow}>
        {canGoBack && <Button title="Back" onPress={handleBack} />}
        <Button
          title={isLastScreen ? "Finish" : "Next"}
          onPress={isLastScreen ? handleFinish : handleNext}
          disabled={!isValid}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
})
