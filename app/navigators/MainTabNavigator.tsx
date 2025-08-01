// app/navigators/MainTabNavigator.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ParticipantNavigator } from "./ParticipantNavigator"
import { SurveyListScreen } from "@/features/survey/screens/SurveyListScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { DebugQuestionScreen } from "@/screens/DebugQuestionScreen"
import { Ionicons } from "@expo/vector-icons"
import { useAppTheme } from "@/utils/useAppTheme"

const Tab = createBottomTabNavigator()

export function MainTabNavigator() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarIcon: ({ color, size }) => {
          let iconName: string

          switch (route.name) {
            case "ParticipantTab":
              iconName = "list-outline"
              break
            case "Questions":
              iconName = "help-circle-outline"
              break
            case "ProfileTab":
              iconName = "person-circle-outline"
              break
            default:
              iconName = "ellipse-outline"
              break
          }

          return <Ionicons name={iconName as any} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="ParticipantTab" component={ParticipantNavigator} />
      <Tab.Screen name="Questions" component={DebugQuestionScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
