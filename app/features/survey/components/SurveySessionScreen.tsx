import { useState, useEffect } from "react"
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from "react-native"
import { useQuestions } from "../hooks/useQuestions"
import { SurveyScreenRenderer } from "../components/SurveyScreenRenderer"
import type { SurveyAnswerMap, Question } from "../types"

export function SurveySessionScreen() {
  const { data: questions, isLoading, error } = useQuestions()
  const [answers, setAnswers] = useState<SurveyAnswerMap>({})

  useEffect(() => {
    if (questions) {
      const initialAnswers: SurveyAnswerMap = {}
      questions.forEach((q: Question) => {
        initialAnswers[q.id] = null
      })
      setAnswers(initialAnswers)
    }
  }, [questions])

  const updateAnswer = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading survey...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No questions found for this survey.</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <SurveyScreenRenderer questions={questions} answers={answers} updateAnswer={updateAnswer} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: 32,
  },
})
