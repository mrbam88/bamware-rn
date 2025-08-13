import { ActivityIndicator, View, Text } from "react-native"
import { useHydrateSession } from "@/hooks/useHydrateSession"
import { useMockSession } from "@/hooks/useMockSession"
import { useAppSelector } from "@/store"
import Config from "@/config"
import { AuthNavigator } from "@/navigators/AuthNavigator"
import { MainTabNavigator } from "@/navigators/MainTabNavigator"

export function BootGate() {
  useMockSession()
  const hydrated = useHydrateSession()
  const session = useAppSelector((state) => state.session.session)

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <ActivityIndicator size="large" />
        <Text>Loading session...</Text>
      </View>
    )
  }

  const shouldSkipLogin = Config.useMock.session

  return shouldSkipLogin ? <MainTabNavigator /> : <AuthNavigator />
}
