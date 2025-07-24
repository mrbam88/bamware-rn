import React from "react"
import { TextInput } from "react-native"

export const NumericQuestion = ({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) => {
  return (
    <TextInput
      value={value?.toString() ?? ""}
      onChangeText={(text) => onChange(Number(text))}
      keyboardType="numeric"
      placeholder="Enter a number..."
      style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 }}
    />
  )
}
