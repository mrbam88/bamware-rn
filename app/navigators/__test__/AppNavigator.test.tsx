// src/navigation/__test__/AppNavigator.test.tsx

import React from "react"
import { render } from "@testing-library/react-native"
import { AppNavigator } from ".."
import { SafeAreaProvider } from "react-native-safe-area-context"

// ✅ FIXED: SafeAreaProvider mock that preserves real context
jest.mock("react-native-safe-area-context", () => {
  const actual = jest.requireActual("react-native-safe-area-context")
  return {
    ...actual,
    SafeAreaProvider: ({ children }) => (
      <actual.SafeAreaProvider>{children}</actual.SafeAreaProvider>
    ),
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 360, height: 640 }),
  }
})

jest.mock("@react-navigation/elements", () => ({
  ...jest.requireActual("@react-navigation/elements"),
  SafeAreaProviderCompat: ({ children }) => children,
}))

jest.mock("react-native-screens", () => ({
  ...jest.requireActual("react-native-screens"),
  enableScreens: jest.fn(),
  NativeScreen: ({ children }) => children,
  NativeScreenContainer: ({ children }) => children,
  ScreenStack: ({ children }) => children,
}))

jest.mock("@/utils/useAppTheme", () => ({
  useThemeProvider: jest.fn(() => ({
    themeScheme: "light",
    navigationTheme: { dark: false, colors: { background: "white" } },
    setThemeContextOverride: jest.fn(),
    ThemeProvider: ({ children }) => <>{children}</>,
  })),
  useAppTheme: jest.fn(() => ({
    navTheme: { dark: false, colors: { background: "white" } },
    setThemeContextOverride: jest.fn(),
    theme: {
      colors: {
        background: "white",
        palette: { neutral800: "#333" },
      },
    },
    themeContext: "light",
    themed: jest.fn(),
  })),
}))

jest.mock("../navigationUtilities", () => ({
  useBackButtonHandler: jest.fn(),
  navigationRef: { current: null },
}))

jest.mock("mobx-react-lite", () => ({
  ...jest.requireActual("mobx-react-lite"),
  observer: (component) => component,
}))

// ✅ TEST CASE

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
