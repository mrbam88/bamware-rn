import { View, Text, StyleSheet } from "react-native"
import { colors } from "@/theme/colors"
import type { Question, SurveyAnswerMap } from "../../survey/types"
import { QuestionRenderer } from "./QuestionRenderer"

interface SurveyScreenRendererProps {
  questions: Question[]
  answers: SurveyAnswerMap
  updateAnswer: (questionId: number, value: any) => void
}

export function SurveyScreenRenderer({
  questions,
  answers,
  updateAnswer,
}: SurveyScreenRendererProps) {
  return (
    <View style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.questionCard}>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  questionCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginBottom: 32,
  },
  prompt: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.tint,
    marginBottom: 16,
    textAlign: "center",
  },
})
