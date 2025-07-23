import { View, Text, StyleSheet, TextInput } from "react-native"
import { colors } from "@/theme/colors"

interface Question {
  question_id: number
  text: string
  type: string
  options?: string[]
}

interface ScreenData {
  screen_id: number
  title: string
  questions: Question[]
}

interface SurveyScreenRendererProps {
  screen: ScreenData
  answers: Record<string, any>
  updateAnswer: (questionId: string, value: any) => void
}

export function SurveyScreenRenderer({ screen, answers, updateAnswer }: SurveyScreenRendererProps) {
  if (!screen) {
    return (
      <View>
        <Text>Loading screen...</Text>
      </View>
    )
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>{screen.title}</Text>

      {screen.questions.map((question) => (
        <View key={question.question_id} style={styles.questionWrapper}>
          <Text style={styles.prompt}>{question.text}</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your answer..."
            placeholderTextColor={colors.textDim}
            value={answers[question.question_id] ?? ""}
            onChangeText={(text) => updateAnswer(question.question_id.toString(), text)}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.separator,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  prompt: {
    color: colors.tint,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  questionWrapper: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    padding: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
})
