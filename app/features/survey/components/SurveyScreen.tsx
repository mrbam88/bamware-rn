import React from "react"
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import { useSurveyFlowCoordinator } from "../hooks/useSurveyFlowCoordinator"
import { SurveyScreenRenderer } from "../components/SurveyScreenRenderer"
import { useNavigation } from "@react-navigation/native"

export const SurveyScreen = () => {
  const navigation = useNavigation()
  const {
    isLoading,
    error,
    currentQuestions,
    currentIndex,
    total,
    answers,
    updateAnswer,
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
    const message =
      typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "Something went wrong"
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SurveyScreenRenderer
        questions={currentQuestions}
        answers={answers}
        currentIndex={currentIndex}
        total={total}
        updateAnswer={updateAnswer}
        isLast={isLastScreen}
        isValid={isValid}
        onBack={handleBack}
        onNext={isLastScreen ? handleFinish : handleNext}
        onClose={() => navigation.goBack()}
      />
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
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: "#B00020",
    textAlign: "center",
  },
})
