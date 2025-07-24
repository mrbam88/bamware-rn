import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAppSelector } from "@/store"
import { AuthNavigator } from "./AuthNavigator"
import { MainTabNavigator } from "./MainTabNavigator"
import { ParticipantNavigator } from "./ParticipantNavigator"

const Stack = createNativeStackNavigator()

export function RoleNavigator() {
  const session = useAppSelector((state) => state.session.session)
  const role = session?.user?.role
  const isInternal = session?.user?.isInternal
  const isStaff = session?.user?.isStaff
  const isSuperuser = session?.user?.isSuperuser

  const effectiveRole =
    role === "participant" || isInternal || isStaff || isSuperuser ? "participant" : role

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session && <Stack.Screen name="Auth" component={AuthNavigator} />}
      {session && effectiveRole === "participant" && (
        <Stack.Screen name="ParticipantFlow" component={MainTabNavigator} />
      )}
      {session && effectiveRole !== "participant" && (
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}
