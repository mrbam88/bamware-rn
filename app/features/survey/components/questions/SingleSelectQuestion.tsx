import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "@/theme/colors"
import { Question as QuestionType } from "../../types"

type Props = {
  question: QuestionType
  value: string
  onChange: (value: string) => void
}

export const SingleSelectQuestion = ({ question, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.text}</Text>
      {question.options?.map((option) => {
        const selected = option === value
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.option, selected && styles.optionSelected]}
          >
            <Text style={selected ? styles.optionTextSelected : styles.optionText}>{option}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },
  option: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.separator,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: colors.tint,
  },
  optionText: {
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.textInverse,
  },
})
