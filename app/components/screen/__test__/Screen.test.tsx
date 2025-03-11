import React from "react"
import { render, screen } from "@testing-library/react-native"
import { Text } from "@/components/Text"
import { Screen } from "../Screen"
import { View } from "react-native"

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
  useSafeAreaInsetsStyle: jest.fn(() => ({})),
}))

describe("Screen Component", () => {
  test("renders fixed preset", () => {
    render(
      <Screen preset="fixed">
        <Text>Fixed</Text>
      </Screen>,
    )
    expect(screen.getByText("Fixed")).toBeTruthy() // ✅ Fixed line
  })

  test("applies custom background", () => {
    const { getByTestId } = render(<Screen testID="test-screen" backgroundColor="red" />)
    const screenElement = getByTestId("test-screen")
    expect(screenElement.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: "red" }),
    )
  })
})
