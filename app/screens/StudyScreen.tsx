import { View, Text, StyleSheet } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"

export const StudyScreen = () => {
  const { theme } = useAppTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>Study Screen Placeholder</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "500" },
})
