// src/navigation/AppDrawerNavigator.tsx

import { createDrawerNavigator } from "@react-navigation/drawer"
import { observer } from "mobx-react-lite"
import { CustomDrawerContent } from "./CustomDrawerContent"
import { TabNavigator } from "./TabNavigator" // ✅ Importing TabNavigator

const Drawer = createDrawerNavigator()

export const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />} // ✅ Uses custom drawer content
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#c6cbef", width: 240 },
      }}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
    </Drawer.Navigator>
  )
}
