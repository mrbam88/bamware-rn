import { Text, TextInput, View, StyleSheet } from "react-native"
import { colors } from "@/theme/colors"
import { Question as QuestionType } from "../../types"

type Props = {
  question: QuestionType
  value: string
  onChange: (value: string) => void
}

export const TextQuestion = ({ question, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.text}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Type your answer..."
        placeholderTextColor={colors.textDim}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderColor: colors.separator,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    padding: 8,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
})
