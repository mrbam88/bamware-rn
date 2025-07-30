import { View, Text, ActivityIndicator } from "react-native"
import { useHydrateSession } from "@/hooks/useHydrateSession"
import { RoleNavigator } from "@/navigators"

export const BootGate = () => {
  const hydrated = useHydrateSession()

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <ActivityIndicator size="large" />
        <Text>Hydrating session...</Text>
      </View>
    )
  }

  return <RoleNavigator />
}
