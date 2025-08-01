// app/features/survey/components/SurveyInfo.tsx

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

  const progress = ((questionIndex + 1) / totalQuestions) * 100
  const title = question?.survey?.name || "Survey"
  const description = question?.survey?.short_description || ""

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {description.length > 0 && (
        <Text style={[styles.description, { color: colors.textDim }]}>{description}</Text>
      )}

      <Text style={[styles.stepLabel, { color: colors.textDim }]}>
        Question {questionIndex + 1} of {totalQuestions}
      </Text>

      <View style={[styles.progressTrack, { backgroundColor: colors.separator }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.tint,
              width: `${progress}%`,
            },
          ]}
        />
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  progressTrack: {
    height: 6,
    width: "90%",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
})
