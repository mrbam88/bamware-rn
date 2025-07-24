import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export const CheckboxQuestion = ({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string[]
  onChange: (val: string[]) => void
}) => {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <View>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => toggle(opt)}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              marginRight: 8,
              backgroundColor: value.includes(opt) ? "#007AFF" : "#fff",
            }}
          />
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
