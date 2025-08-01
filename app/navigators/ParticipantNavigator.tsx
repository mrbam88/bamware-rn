import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ParticipantDashboardScreen } from "@/features/survey/screens/ParticipantDashboardScreen"
import { ParticipantLoginScreen } from "@/screens/login/ParticipantLoginScreen"
import { SurveyScreen } from "@/features/survey/components/SurveyScreen"
import { SurveyListScreen } from "@/features/survey/screens/SurveyListScreen"
import { SurveyDetailScreen } from "@/features/survey/screens/SurveyDetailScreen"
import type { ParticipantStackParamList } from "@/types/navigation"

const Stack = createNativeStackNavigator<ParticipantStackParamList>()

export function ParticipantNavigator() {
  console.log("ParticipantNavigator loaded")

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParticipantDashboard" component={ParticipantDashboardScreen} />
      <Stack.Screen name="ParticipantLoginScreen" component={ParticipantLoginScreen} />
      <Stack.Screen name="Survey" component={SurveyScreen} />
      <Stack.Screen name="SurveyList" component={SurveyListScreen} />
      <Stack.Screen name="SurveyDetail" component={SurveyDetailScreen} />
    </Stack.Navigator>
  )
}
