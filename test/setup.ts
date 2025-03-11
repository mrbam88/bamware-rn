// test/setup.ts
// Environment variables are now set in jest.setup.env.js

const React = require("react")
const ReactNative = require("react-native")
const mockFile = require("./mockFile")
require("@testing-library/jest-dom") // Add jest-dom matchers

// Extend jest matchers for React Native
const { toHaveTextContent } = require("@testing-library/jest-dom/matchers")
expect.extend({
  toHaveTextContent(received, text) {
    // Adapt for React Native text props structure
    const content = received.props.children
    const pass = typeof content === "string" && content.includes(text)
    return {
      pass,
      message: () => `expected ${received} ${pass ? "not " : ""}to have text content "${text}"`,
    }
  },
})

// Mock React Native modules
jest.doMock("react-native", () => {
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile),
        getSize: jest.fn(
          (
            uri: string,
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void,
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

// Mock React Navigation
jest.mock("@react-navigation/native", () => ({
  useTheme: jest.fn(() => ({
    dark: false,
    colors: {
      background: "white",
      text: "black",
      primary: "blue",
    },
  })),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}))

// Mock App Theme
jest.mock("@/utils/useAppTheme", () => {
  const actualModule = jest.requireActual("@/utils/useAppTheme")
  return {
    ...actualModule,
    useAppTheme: jest.fn(() => ({
      navTheme: { dark: false, colors: { background: "white", text: "black", primary: "blue" } },
      theme: { colors: { background: "white", text: "black", primary: "blue" } },
      themeContext: "light",
      setThemeContextOverride: jest.fn(),
      themed: jest.fn((style) => style),
    })),
  }
})

// Mock Safe Area Context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 20, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
}))

// Mock API Calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked response" }),
  }),
)

// Mock Timers
jest.useFakeTimers()

// Mock Localization
jest.mock("i18next", () => ({
  currentLocale: "en",
  t: (key: string, params: Record<string, string>) => `${key} ${JSON.stringify(params)}`,
  translate: (key: string, params: Record<string, string>) => `${key} ${JSON.stringify(params)}`,
}))

jest.mock("expo-localization", () => ({
  ...jest.requireActual("expo-localization"),
  getLocales: () => [{ languageTag: "en-US", textDirection: "ltr" }],
}))

jest.mock("../app/i18n/i18n.ts", () => ({
  i18n: {
    isInitialized: true,
    language: "en",
    t: (key: string, params: Record<string, string>) => `${key} ${JSON.stringify(params)}`,
    numberToCurrency: jest.fn(),
  },
}))

// Mock Font Loading
jest.mock("@expo-google-fonts/space-grotesk", () => ({
  useFonts: jest.fn(() => [true, null]),
  SpaceGrotesk_300Light: "SpaceGrotesk_300Light",
  SpaceGrotesk_400Regular: "SpaceGrotesk_400Regular",
  SpaceGrotesk_500Medium: "SpaceGrotesk_500Medium",
  SpaceGrotesk_600SemiBold: "SpaceGrotesk_600SemiBold",
  SpaceGrotesk_700Bold: "SpaceGrotesk_700Bold",
}))

// Mock Expo Modules
jest.mock("expo-font", () => ({
  ...jest.requireActual("expo-font"),
  useFonts: jest.fn(() => [true, null]),
  loadAsync: jest.fn(() => Promise.resolve()),
}))

jest.mock("expo-constants", () => ({
  ...jest.requireActual("expo-constants"),
  expoConfig: { extra: {} },
}))

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}))

jest.mock("expo-status-bar", () => ({
  StatusBar: jest.fn(() => null),
  setHidden: jest.fn(),
}))

jest.mock("expo-system-ui", () => ({
  setBackgroundColorAsync: jest.fn(),
}))

// Mock Reanimated
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))

// Global test variables
declare global {
  let __TEST__: boolean
  // Make sure React is globally available for JSX
  const React: typeof import("react")
}

// Set global variables
global.__TEST__ = true

// jest.mock("react-native-keyboard-controller", () => ({
//   KeyboardAwareScrollView: jest.fn(({ children, ...props }) => children),
// }))
jest.mock("react-native-keyboard-controller", () => {
  const React = require("react")
  return {
    KeyboardAwareScrollView: React.forwardRef(({ children, ...props }, ref) => children), // ✅ FIXED
  }
})

// Mock react-navigation/native
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useScrollToTop: jest.fn(),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}))
