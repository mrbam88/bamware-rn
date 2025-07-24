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
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  option: {
    borderColor: colors.separator,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
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
