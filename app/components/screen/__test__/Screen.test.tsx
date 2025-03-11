import React, { createRef } from "react"
import { render, screen } from "@testing-library/react-native"
import { Screen } from "../Screen"
import { Text } from "@/components/Text"
import { ScrollView } from "react-native"

jest.mock("@react-navigation/native", () => ({
  useScrollToTop: jest.fn(),
}))

jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: () => ({
    themed: (style: any) => style,
    theme: {
      colors: { background: "#fff", text: "#000" },
      spacing: { md: 16 },
    },
  }),
}))

jest.mock("../../../utils/useSafeAreaInsetsStyle", () => ({
  useSafeAreaInsetsStyle: jest.fn(() => ({
    paddingTop: 20,
    paddingBottom: 10,
  })),
}))

jest.mock("react-native-keyboard-controller", () => {
  const React = require("react")
  const { ScrollView } = require("react-native") // ✅ FIXED: Bring ScrollView inside scope

  return {
    KeyboardAwareScrollView: React.forwardRef(({ children, ...props }, ref) => (
      <ScrollView ref={ref} {...props}>
        {children}
      </ScrollView>
    )),
  }
})

describe("Screen Component", () => {
  test("renders fixed preset", () => {
    render(
      <Screen preset="fixed">
        <Text>Fixed</Text>
      </Screen>,
    )
    expect(screen.getByText("Fixed")).toBeTruthy()
  })

  test("applies custom background", () => {
    const { getByTestId } = render(<Screen testID="test-screen" backgroundColor="red" />)
    expect(getByTestId("test-screen").props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: "red" }),
    )
  })

  test("renders scroll preset", () => {
    const { getByTestId } = render(
      <Screen preset="scroll" testID="scroll-screen">
        <Text>Scroll</Text>
      </Screen>,
    )
    expect(getByTestId("scroll-screen")).toBeTruthy()
  })

  test("renders auto preset with dynamic scroll state", () => {
    const { getByTestId } = render(
      <Screen preset="auto" testID="auto-screen">
        <Text>Auto</Text>
      </Screen>,
    )
    expect(getByTestId("auto-screen")).toBeTruthy()
  })

  test("applies safe area insets correctly", () => {
    const { getByTestId } = render(<Screen testID="safe-area-screen" />)
    expect(getByTestId("safe-area-screen").props.style).toContainEqual(
      expect.objectContaining({ paddingTop: 20, paddingBottom: 10 }),
    )
  })

  test("keyboard avoiding view works", () => {
    const { getByTestId } = render(
      <Screen testID="keyboard-screen" KeyboardAvoidingViewProps={{ behavior: "padding" }}>
        <Text>Keyboard</Text>
      </Screen>,
    )
    expect(getByTestId("keyboard-screen")).toBeTruthy()
  })

  test("useScrollToTop is called for scroll preset", () => {
    const ref = createRef<ScrollView>()
    render(
      <Screen preset="scroll">
        <Text>Scroll</Text>
      </Screen>,
    )
    expect(require("@react-navigation/native").useScrollToTop).toHaveBeenCalledWith(ref)
  })
})
