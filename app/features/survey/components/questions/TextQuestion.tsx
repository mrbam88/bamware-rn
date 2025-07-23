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
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    borderColor: colors.separator,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    color: colors.text,
  },
})
