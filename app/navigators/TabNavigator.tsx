// src/navigation/TabNavigator.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import { useAppTheme } from "@/utils/useAppTheme"
import { Icon } from "@/components"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  const {
    theme: { colors },
  } = useAppTheme()
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === "Home" ? "home" : "user"
          return <Icon icon={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.palette.neutral700,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Icon icon="menu" size={28} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Screens.WelcomeScreen} />
      <Tab.Screen name="Profile" component={Screens.WelcomeScreen} />
    </Tab.Navigator>
  )
}
