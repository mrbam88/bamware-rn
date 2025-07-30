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
    handleNext,
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
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
})
