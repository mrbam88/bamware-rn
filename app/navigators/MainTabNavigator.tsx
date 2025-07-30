import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
//import { SurveyStackNavigator } from "./SurveyStackNavigator"
import { StudyScreen } from "@/screens/StudyScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { ParticipantNavigator } from "./ParticipantNavigator"
import { DebugQuestionScreen } from "@/screens/DebugQuestionScreen"

const Tab = createBottomTabNavigator()

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="SurveyTab" component={ParticipantNavigator} options={{ title: "Survey" }} />
      <Tab.Screen name="StudyTab" component={StudyScreen} options={{ title: "Studyy" }} />
      <Tab.Screen
        name="Questions"
        component={DebugQuestionScreen}
        options={{ title: "Questions" }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  )
}
