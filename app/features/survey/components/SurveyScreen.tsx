// app/features/survey/screens/SurveyScreen.tsx

import React from "react"
import { View, Text, Button, ActivityIndicator, ScrollView } from "react-native"
import { useSurveyFlowCoordinator } from "../hooks/useSurveyFlowCoordinator"
import { SurveyScreenRenderer } from "../components/SurveyScreenRenderer"

export const SurveyScreen = () => {
  const {
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
    isValid,
  } = useSurveyFlowCoordinator()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading survey: {error}</Text>
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
      }}
    >
      <SurveyScreenRenderer
        questions={currentQuestions}
        answers={answers}
        updateAnswer={updateAnswer}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
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
