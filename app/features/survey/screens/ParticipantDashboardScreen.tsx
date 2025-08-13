import { View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { AppStackParamList } from "@/types/navigation"
import { useAppTheme } from "@/utils/useAppTheme"

export function ParticipantDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Welcome to the Daily Wellness Survey
      </Text>

      <Pressable
        onPress={() => navigation.navigate("SurveyList")}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Start Survey</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
})
