// app/features/survey/components/SurveyScreenRenderer.tsx

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { QuestionRenderer } from "./QuestionRenderer"
import { colors } from "@/theme/colors"
import type { Question, SurveyAnswerMap } from "../types"

type Props = {
  questions: Question[]
  answers: SurveyAnswerMap
  updateAnswer: (questionId: number, value: any) => void
}

export function SurveyScreenRenderer({ questions, answers, updateAnswer }: Props) {
  return (
    <View style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.questionBlock}>
          <Text style={styles.prompt}>{question.text}</Text>
          <QuestionRenderer
            question={question}
            answer={answers[question.id]}
            onAnswerChange={(value) => updateAnswer(question.id, value)}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  prompt: {
    color: colors.tint,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  questionBlock: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    padding: 12,
  },
})
