import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAppSelector } from "@/store"
import { AuthNavigator } from "./AuthNavigator"
import { MainTabNavigator } from "./MainTabNavigator"
import { ParticipantNavigator } from "./ParticipantNavigator"

const Stack = createNativeStackNavigator()

export function RoleNavigator() {
  const session = useAppSelector((state) => state.session.session)

  const isLoggedIn = !!session?.accessToken
  const isParticipant = session?.user?.role === "participant"
  const isAdmin =
    session?.user?.isInternal ||
    session?.user?.isStaff ||
    session?.user?.isSuperuser ||
    session?.user?.role === "Program Admin"

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn && <Stack.Screen name="Auth" component={AuthNavigator} />}

      {isLoggedIn && (isParticipant || isAdmin) && (
        <Stack.Screen name="ParticipantFlow" component={ParticipantNavigator} />
      )}

      {isLoggedIn && !isParticipant && !isAdmin && (
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}
