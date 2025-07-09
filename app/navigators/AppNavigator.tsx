import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useBackButtonHandler, navigationRef } from "./navigationUtilities"
import { useThemeProvider } from "@/utils/useAppTheme"
import { LoginScreen } from "@/screens/login/LoginScreen"
import { MainCoordinator } from "./MainCoordinator"
import { useHydrateSession } from "@/hooks/useHydrateSession"

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ unmountOnBlur: false }} />
      <Stack.Screen
        name="MainApp"
        component={MainCoordinator} // Role-based navigator lives here
      />
    </Stack.Navigator>
  )
}

export const AppNavigator = observer((props) => {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler()

  const hydrated = useHydrateSession()

  if (!hydrated) return null // Or <SplashScreen />

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  )
})
