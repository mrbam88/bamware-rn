import { createDrawerNavigator } from "@react-navigation/drawer"
import { CustomDrawerContent } from "./CustomDrawerContent"
import { TabNavigator } from "./TabNavigator"

const Drawer = createDrawerNavigator()

export const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#c6cbef", width: 240 },
      }}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
    </Drawer.Navigator>
  )
}
