import { View, Text, StyleSheet, Picker } from "react-native"
import { colors } from "@/theme/colors"
import { Question as QuestionType } from "../../types"

type Props = {
  question: QuestionType
  value: string
  onChange: (value: string) => void
}

export const DropdownQuestion = ({ question, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.text}</Text>
      <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
        <Picker.Item label="Select an option..." value="" />
        {question.options?.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  picker: {
    borderColor: colors.separator,
    borderRadius: 6,
    borderWidth: 1,
  },
})
