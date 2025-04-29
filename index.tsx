import "@expo/metro-runtime" // this is for fast refresh on web w/o expo-router
import { registerRootComponent } from "expo"

import { App } from "@/app"

import { LogBox } from "react-native"

// ✅ Ensure all logs appear in Metro
LogBox.ignoreAllLogs(false) // Show all logs
console.reportErrorsAsExceptions = false // Prevent RN from hiding errors

// ✅ Force all errors into Metro logs
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error("🔥 Global Error:", error, "Fatal:", isFatal)
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
