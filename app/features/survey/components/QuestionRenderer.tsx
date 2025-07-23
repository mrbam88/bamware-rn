import { Text, TextInput, View, Switch, StyleSheet } from "react-native"
import { colors } from "@/theme/colors"

type Question = {
  question_id: number
  text: string
  type: "text" | "boolean" | "dropdown" | "multi_select"
  options?: string[]
}

type QuestionRendererProps = {
  question: Question
  value: string | boolean | string[] | null
  onChange: (value: any) => void
}

export function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.text}</Text>

      {question.type === "text" && (
        <TextInput
          style={styles.input}
          value={typeof value === "string" ? value : ""}
          onChangeText={onChange}
          placeholder="Type your answer..."
          placeholderTextColor={colors.textDim}
        />
      )}

      {question.type === "boolean" && <Switch value={!!value} onValueChange={onChange} />}

      {question.type === "dropdown" && (
        <Text style={styles.placeholder}>{value || "Dropdown not implemented in mock"}</Text>
      )}

      {question.type === "multi_select" && (
        <Text style={styles.placeholder}>
          {Array.isArray(value) ? value.join(", ") : "Multi-select not implemented"}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderColor: colors.separator,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  placeholder: {
    color: colors.textDim,
    fontStyle: "italic",
    marginTop: 4,
  },
})
