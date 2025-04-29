// src/navigation/AppNavigator.tsx

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useThemeProvider } from "@/utils/useAppTheme"
import { AppDrawerNavigator } from "./AppDrawerNavigator"

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Screens.LoginScreen}
        options={{ unmountOnBlur: false }} // ✅ Keeps screen in memory
      />
      <Stack.Screen name="MainApp" component={AppDrawerNavigator} />
      <Stack.Screen name="Settings" component={Screens.WelcomeScreen} />
    </Stack.Navigator>
  )
}

export const AppNavigator = observer((props) => {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler()

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  )
})
