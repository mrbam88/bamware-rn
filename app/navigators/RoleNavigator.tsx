// app/navigators/RoleNavigator.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthNavigator } from "./AuthNavigator"
import { MainTabNavigator } from "./MainTabNavigator"
import { useAppSelector } from "@/store"
import type { AppStackParamList } from "@/types/navigation"

const Stack = createNativeStackNavigator<AppStackParamList>()

export function RoleNavigator() {
  const session = useAppSelector((state) => state.session.session)
  const role = session?.user?.role
  const isInternal = session?.user?.isInternal
  const isStaff = session?.user?.isStaff
  const isSuperuser = session?.user?.isSuperuser

  const effectiveRole =
    role === "participant" || isInternal || isStaff || isSuperuser ? "participant" : role

  console.log("RoleNavigator loaded")
  console.log("Session:", session)
  console.log("Effective role:", effectiveRole)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session && <Stack.Screen name="Auth" component={AuthNavigator} />}
      {session && <Stack.Screen name="ParticipantTab" component={MainTabNavigator} />}
    </Stack.Navigator>
  )
}
