import React from "react"
import { render } from "@testing-library/react-native"
import { AppNavigator } from ".."
import { SafeAreaProvider } from "react-native-safe-area-context"

// ✅ Fix Safe Area Context Issues
jest.mock("react-native-safe-area-context", () => {
  const SafeAreaContext = require("react").createContext({ top: 0, left: 0, right: 0, bottom: 0 })
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => (
      <SafeAreaContext.Provider value={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
      </SafeAreaContext.Provider>
    ),
    SafeAreaContext,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 360, height: 640 }),
  }
})

// ✅ Fix React Navigation's SafeAreaProviderCompat
jest.mock("@react-navigation/elements", () => ({
  ...jest.requireActual("@react-navigation/elements"),
  SafeAreaProviderCompat: ({ children }: { children: React.ReactNode }) => children,
}))

// ✅ Fix React Native Screens (`react-native-screens`)
jest.mock("react-native-screens", () => ({
  ...jest.requireActual("react-native-screens"),
  enableScreens: jest.fn(),
  NativeScreen: ({ children }: { children: React.ReactNode }) => children,
  NativeScreenContainer: ({ children }: { children: React.ReactNode }) => children,
  ScreenStack: ({ children }: { children: React.ReactNode }) => children,
}))

// ✅ Fix `useThemeProvider` and `useAppTheme`
jest.mock("@/utils/useAppTheme", () => ({
  useThemeProvider: jest.fn(() => ({
    themeScheme: "light",
    navigationTheme: { dark: false, colors: { background: "white" } },
    setThemeContextOverride: jest.fn(),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  })),
  useAppTheme: jest.fn(() => ({
    navTheme: { dark: false, colors: { background: "white" } },
    setThemeContextOverride: jest.fn(),
    theme: {
      colors: {
        background: "white",
        palette: { neutral800: "#333" }, // ✅ Fix: Ensure `palette.neutral800` exists
      },
    },
    themeContext: "light",
    themed: jest.fn(),
  })),
}))

// ✅ Fix Navigation Utilities
jest.mock("../navigationUtilities", () => ({
  useBackButtonHandler: jest.fn(),
  navigationRef: { current: null },
}))

// ✅ Disable MobX Observer in Tests
jest.mock("mobx-react-lite", () => ({
  ...jest.requireActual("mobx-react-lite"),
  observer: (component: any) => component, // Disable MobX observer
}))

describe("AppNavigator", () => {
  it("renders without crashing", () => {
    const tree = render(
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>,
    )
    expect(tree).toBeTruthy()
  })
})
