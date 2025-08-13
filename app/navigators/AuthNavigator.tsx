import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "@/screens/login/LoginScreen"
import { ParticipantLoginScreen } from "@/screens/login/ParticipantLoginScreen"
import { MainTabNavigator } from "./MainTabNavigator"
import { useAppSelector } from "@/store"
import { useMockSession } from "@/hooks/useMockSession"
import { useHydrateSession } from "@/hooks/useHydrateSession"
import { ActivityIndicator, View, Text } from "react-native"
import Config from "@/config"

const Stack = createNativeStackNavigator()

export function AuthNavigator() {
  useMockSession()
  const hydrated = useHydrateSession()
  const session = useAppSelector((state) => state.session.session)

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading session...</Text>
      </View>
    )
  }

  const shouldSkipLogin = Config.useMock.session

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {shouldSkipLogin ? (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      ) : (
        <Stack.Screen name="ParticipantTab" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}
