import React from "react"
import { TextInput } from "react-native"

export const TextQuestion = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Type your answer..."
      style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 }}
    />
  )
}
