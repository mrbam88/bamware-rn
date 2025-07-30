import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SurveyScreen } from "@/features/survey/components/SurveyScreen"
import { ParticipantDashboardScreen } from "@/features/survey/screens/ParticipantDashboardScreen"
import { ParticipantLoginScreen } from "@/screens/login/ParticipantLoginScreen"

const Stack = createNativeStackNavigator()

export function ParticipantNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParticipantDashboard" component={ParticipantDashboardScreen} />
      <Stack.Screen name="ParticipantLoginScreen" component={ParticipantLoginScreen} />
      <Stack.Screen name="Survey" component={SurveyScreen} />
    </Stack.Navigator>
  )
}
