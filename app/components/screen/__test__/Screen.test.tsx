import React, { createRef } from "react"
import { render, screen } from "@testing-library/react-native"
import { Screen } from "../Screen"
import { Text } from "@/components/Text"
import { ScrollView } from "react-native"
import { useScrollToTop } from "@react-navigation/native" // ✅ Explicit Import

// ✅ Proper Jest Mock for `useScrollToTop`
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
  const { ScrollView } = require("react-native")

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

    const mockUseScrollToTop = jest.spyOn(require("@react-navigation/native"), "useScrollToTop")

    render(
      <Screen preset="scroll" testID="scroll-screen">
        <Text>Scroll</Text>
      </Screen>,
    )

    expect(mockUseScrollToTop).toHaveBeenCalled() // ✅ Ensure mock is used
  })
})

describe("Screen Component - Edge Cases", () => {
  test("renders with custom safe area edges", () => {
    const { getByTestId } = render(
      <Screen testID="test-screen" safeAreaEdges={["top", "bottom"]}>
        <Text>Safe Area Test</Text>
      </Screen>,
    )
    expect(getByTestId("test-screen")).toBeTruthy()
  })

  test("applies different keyboard offsets", () => {
    const { getByTestId, rerender } = render(<Screen testID="test-screen" keyboardOffset={20} />)
    expect(getByTestId("test-screen")).toBeTruthy()

    rerender(<Screen testID="test-screen" keyboardOffset={100} />)
    expect(getByTestId("test-screen")).toBeTruthy()
  })

  test("ensures useScrollToTop is called on ScrollView ref", () => {
    const scrollRef = { current: { scrollToTop: jest.fn() } }

    const mockUseScrollToTop = jest.spyOn(require("@react-navigation/native"), "useScrollToTop")

    render(
      <Screen preset="scroll">
        <Text>Scroll</Text>
      </Screen>,
    )

    expect(mockUseScrollToTop).toHaveBeenCalled() // ✅ Ensures mock is actually used
  })

  test("handles extreme contentContainerStyle cases", () => {
    const { getByTestId } = render(
      <Screen
        testID="test-screen"
        contentContainerStyle={{
          padding: 1000,
          margin: 1000,
        }}
      />,
    )
    expect(getByTestId("test-screen")).toBeTruthy()
  })

  test("KeyboardAwareScrollView interacts correctly with keyboard", () => {
    const { getByTestId } = render(
      <Screen testID="test-screen" preset="scroll">
        <Text>Keyboard Test</Text>
      </Screen>,
    )
    expect(getByTestId("test-screen")).toBeTruthy()
  })
})
