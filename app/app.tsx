/* eslint-disable import/first */
if (__DEV__) {
  require("./devtools/ReactotronConfig.ts")
}

import "./utils/gestureHandler"
import { initI18n } from "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import { useEffect, useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import * as SplashScreen from "expo-splash-screen"
import { useInitialRootStore } from "./models"
import { RoleNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import Config from "./config"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { loadDateFnsLocale } from "./utils/formatDate"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"
import { NavigationContainer } from "@react-navigation/native"
import { useThemeProvider, ThemeContext } from "./utils/useAppTheme"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const queryClient = new QueryClient()
const prefix = Linking.createURL("/")

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Welcome: "welcome",
      AdminDashboard: "admin",
      SurveyTaking: "survey",
    },
  },
}

export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(SplashScreen.hideAsync, 500)
  })

  const { themeScheme, navigationTheme, setThemeContextOverride } = useThemeProvider()

  if (
    !rehydrated ||
    !isNavigationStateRestored ||
    !isI18nInitialized ||
    (!areFontsLoaded && !fontLoadError)
  ) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <KeyboardProvider>
          <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
              <ThemeContext.Provider value={{ themeScheme, setThemeContextOverride }}>
                <NavigationContainer
                  theme={navigationTheme}
                  linking={linking}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                >
                  <RoleNavigator />
                </NavigationContainer>
              </ThemeContext.Provider>
            </QueryClientProvider>
          </ReduxProvider>
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
