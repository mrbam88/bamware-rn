import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthNavigator } from "./AuthNavigator"
import { MainTabNavigator } from "./MainTabNavigator"
import { useAppSelector } from "@/store"
import type { AppStackParamList } from "@/types/navigation"

const Stack = createNativeStackNavigator<AppStackParamList>()

export function RoleNavigator() {
  const session = useAppSelector((state) => state.session.session)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="ParticipantTab" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}
