// app/screens/login/ParticipantLoginScreen.tsx

import { useState } from "react"
import { View, Text, StyleSheet, Pressable, useColorScheme } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PinInput } from "./PinInput"
import { colors } from "@/theme/colors"
import type { RouteProp, NavigationProp } from "@react-navigation/native"
import type { ParticipantStackParamList } from "@/types/navigation"

type RouteParams = RouteProp<ParticipantStackParamList, "ParticipantLoginScreen">

export function ParticipantLoginScreen() {
  const [pin, setPin] = useState("")
  const theme = useColorScheme()
  const navigation = useNavigation<NavigationProp<ParticipantStackParamList>>()
  const route = useRoute<RouteParams>()

  const handleDigitPress = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit)
    }
  }

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1))
  }

  const handleSubmit = () => {
    // if (pin.length === 4) {
    //   navigation.navigate("SurveyDetail", {
    //     surveyId: route.params.surveyId,
    //     title: route.params.title,
    //     questions: route.params.questions,
    //   })
    // }
    console.log("HandleSubmit!!")
  }

  return (
    <SafeAreaView
      style={[styles.container, theme === "dark" && styles.containerDark]}
      testID="pin-modal"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Enter PIN</Text>
        <Text style={styles.subtitle}>Unlock participant session</Text>

        <PinInput pin={pin} />

        <View style={styles.keypad}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "←"].map((key, index) => {
            if (key === "") return <View style={styles.key} key={index} />
            return (
              <Pressable
                key={index}
                style={styles.key}
                onPress={() => {
                  if (key === "←") {
                    handleBackspace()
                  } else {
                    handleDigitPress(key)
                  }
                }}
              >
                <Text style={styles.keyText}>{key}</Text>
              </Pressable>
            )
          })}
        </View>

        <Pressable style={styles.submit} onPress={handleSubmit} disabled={pin.length < 4}>
          <Text style={[styles.submitText, pin.length < 4 && styles.disabledText]}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    flex: 1,
    justifyContent: "center",
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    elevation: 5,
    padding: 24,
    width: "90%",
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  key: {
    alignItems: "center",
    backgroundColor: colors.keypad,
    borderRadius: 32,
    height: 64,
    justifyContent: "center",
    margin: 8,
    width: 64,
  },
  keyText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "500",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 24,
  },
  submit: {
    alignItems: "center",
    marginTop: 24,
  },
  submitText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  disabledText: {
    opacity: 0.3,
  },
})
