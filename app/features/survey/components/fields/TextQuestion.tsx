import { StyleSheet, TextInput } from "react-native"
import { colors } from "@/theme/colors"

type Props = {
  value: string
  onChange: (val: string) => void
}

export function TextQuestion({ value, onChange }: Props) {
  return <TextInput style={styles.input} value={value} onChangeText={onChange} multiline />
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
})
