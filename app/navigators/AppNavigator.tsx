import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AdminDashboardScreen } from "@/screens/AdminDashboardScreen"
import { SurveyScreen } from "@/features/survey/components/SurveyScreen"
import { ParticipantDashboardScreen } from "@/features/survey/screens/ParticipantDashboardScreen"

const Stack = createNativeStackNavigator()

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={ParticipantDashboardScreen} />
      <Stack.Screen name="Survey" component={SurveyScreen} />
    </Stack.Navigator>
  )
}
