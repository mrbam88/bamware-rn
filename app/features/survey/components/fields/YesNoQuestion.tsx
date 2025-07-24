import React from "react"
import { View, Button } from "react-native"

export const YesNoQuestion = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Button
        title="Yes"
        onPress={() => onChange("yes")}
        color={value === "yes" ? "green" : undefined}
      />
      <Button
        title="No"
        onPress={() => onChange("no")}
        color={value === "no" ? "red" : undefined}
      />
    </View>
  )
}
