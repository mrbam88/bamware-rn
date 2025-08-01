import { View, Text, StyleSheet } from "react-native"
import type { Question } from "../../../types/question"
import { useAppTheme } from "@/utils/useAppTheme"

type Props = {
  questionIndex: number
  totalQuestions: number
  question: Question
}

export const SurveyInfo = ({ questionIndex, totalQuestions, question }: Props) => {
  const {
    theme: { colors },
  } = useAppTheme()

  if (!question?.survey) return null
  const { survey } = question

  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100

  return (
    <View style={styles.wrapper}>
      <View style={[styles.progressTrack, { backgroundColor: colors.separator }]}>
        <View style={[styles.progressFill, { backgroundColor: colors.tint, width: `${50}%` }]} />
      </View>

      <Text style={[styles.stepLabel, { color: colors.textDim }]}>
        Question {questionIndex + 1} of {totalQuestions}
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>{survey.name}</Text>
      {!!survey.short_description && (
        <Text style={[styles.description, { color: colors.textDim }]}>
          {survey.short_description}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 24,
    gap: 4,
    paddingHorizontal: 16,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  progressTrack: {
    height: 6,
    width: "90%",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 12,
    marginBottom: 24,
  } as ViewStyle,

  progressFill: {
    height: 6,
    borderRadius: 3,
  } as ViewStyle,
})
