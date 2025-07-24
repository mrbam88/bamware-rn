import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ParticipantDashboardScreen } from "@/features/survey/screens/ParticipantDashboardScreen"
import { SurveyScreen } from "@/features/survey/components/SurveyScreen"

const Stack = createNativeStackNavigator()

export function SurveyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParticipantDashboard"
        component={ParticipantDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyTaking"
        component={SurveyScreen}
        options={{ headerShown: true, title: "Survey" }}
      />
    </Stack.Navigator>
  )
}
