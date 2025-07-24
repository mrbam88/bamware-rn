import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "@/screens/login/LoginScreen"
import { ParticipantLoginScreen } from "@/screens/login/ParticipantLoginScreen"

const Stack = createNativeStackNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ParticipantLogin" component={ParticipantLoginScreen} />
    </Stack.Navigator>
  )
}
