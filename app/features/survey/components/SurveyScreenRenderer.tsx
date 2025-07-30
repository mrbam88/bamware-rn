import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { Question, SurveyAnswerMap } from "../../../types/question"
import { QuestionRenderer } from "./QuestionRenderer"
import { useAppTheme } from "@/utils/useAppTheme"
import { SurveyInfo } from "./SurveyInfo"

interface SurveyScreenRendererProps {
  questions: Question[]
  answers: SurveyAnswerMap
  updateAnswer: (questionId: number, value: any) => void
  currentIndex: number
  total: number
  isLast: boolean
  isValid: boolean
  onBack: () => void
  onNext: () => void
  onClose: () => void
}

export function SurveyScreenRenderer({
  questions,
  answers,
  updateAnswer,
  currentIndex,
  total,
  isLast,
  isValid,
  onBack,
  onNext,
  onClose,
}: SurveyScreenRendererProps): JSX.Element {
  const insets = useSafeAreaInsets()
  const {
    theme: { colors },
  } = useAppTheme()

  const current = questions[0]
  const progressPercent = ((currentIndex + 1) / total) * 100

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {current && (
        <SurveyInfo questionIndex={currentIndex} totalQuestions={total} question={current} />
      )}

      <View style={[styles.progressTrack, { backgroundColor: colors.separator }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: colors.tint, width: `${progressPercent}%` },
          ]}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityRole="button">
          <Text style={[styles.closeText, { color: colors.text }]}>X</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.textDim }]}>Question {currentIndex + 1}</Text>

        <Text style={[styles.prompt, { color: colors.text }]}>{current.text}</Text>

        <View style={styles.inputWrapper}>
          <QuestionRenderer
            question={current}
            answer={answers[current.id]}
            onAnswerChange={(value) => updateAnswer(current.id, value)}
          />
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={onBack}
            style={[styles.button, styles.outline, { borderColor: colors.primary }]}
            accessibilityRole="button"
          >
            <Text style={[styles.buttonText, { color: colors.primary }]}>Back</Text>
          </Pressable>

          <Pressable
            onPress={onNext}
            disabled={!isValid}
            style={[
              styles.button,
              styles.filled,
              { backgroundColor: colors.primary },
              !isValid && styles.buttonDisabled,
            ]}
            accessibilityRole="button"
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              {isLast ? "Finish" : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle,

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

  card: {
    width: "92%",
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    alignItems: "center",
    gap: 16,
    minHeight: 440,
  } as ViewStyle,

  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  } as ViewStyle,

  closeText: {
    fontSize: 18,
  } as TextStyle,

  title: {
    fontSize: 14,
    fontWeight: "600",
  } as TextStyle,

  prompt: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  } as TextStyle,

  inputWrapper: {
    width: "100%",
    marginBottom: 24,
  } as ViewStyle,

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  } as ViewStyle,

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  } as ViewStyle,

  outline: {
    borderWidth: 1,
  } as ViewStyle,

  filled: {} as ViewStyle,

  buttonDisabled: {
    opacity: 0.3,
  } as ViewStyle,

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
})
