import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ParticipantNavigator } from "./ParticipantNavigator"
import { SurveyListScreen } from "@/features/survey/screens/SurveyListScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { DebugQuestionScreen } from "@/screens/DebugQuestionScreen"

const Tab = createBottomTabNavigator()

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ParticipantFlow" component={ParticipantNavigator} />
      <Tab.Screen name="Questions" component={DebugQuestionScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
