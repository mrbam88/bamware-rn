import { View, Text, StyleSheet } from "react-native"
import { colors } from "@/theme/colors"

type Props = {
  pin: string
}

export const PinInput = ({ pin }: Props) => {
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((index) => (
        <View key={index} style={styles.dotWrapper}>
          <View style={[styles.dot, pin.length > index && styles.filled]} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 16,
  },
  dot: {
    backgroundColor: colors.keypad,
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  dotWrapper: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    padding: 8,
    width: 40,
  },
  filled: {
    backgroundColor: colors.primary,
  },
})
