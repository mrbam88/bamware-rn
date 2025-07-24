import { Pressable, StyleSheet, Text, View } from "react-native"
import { colors } from "@/theme/colors"

type Props = {
  options: string[]
  value: string[]
  onChange: (newValue: string[]) => void
}

export function CheckboxQuestion({ options, value, onChange }: Props) {
  const toggleOption = (option: string) => {
    const newValue = value.includes(option) ? value.filter((v) => v !== option) : [...value, option]
    onChange(newValue)
  }

  return (
    <View>
      {options.map((opt) => {
        const selected = value.includes(opt)
        return (
          <Pressable key={opt} onPress={() => toggleOption(opt)} style={styles.optionWrapper}>
            <View
              style={[
                styles.box,
                selected ? { backgroundColor: colors.tint } : styles.boxUnselected,
              ]}
            />
            <Text>{opt}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderColor: colors.border,
    borderRadius: 4,
    borderWidth: 1,
    height: 20,
    marginRight: 8,
    width: 20,
  },
  boxUnselected: {
    backgroundColor: colors.background,
  },
  optionWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
})
