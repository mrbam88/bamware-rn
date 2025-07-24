import { StyleSheet, View } from "react-native"
import { Button } from "@/components/button/Button"

type Props = {
  value: boolean | null
  onChange: (val: boolean) => void
}

export function YesNoQuestion({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Button
        text="Yes"
        preset={value === true ? "filled" : "default"}
        onPress={() => onChange(true)}
      />
      <Button
        text="No"
        preset={value === false ? "filled" : "default"}
        onPress={() => onChange(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
})
