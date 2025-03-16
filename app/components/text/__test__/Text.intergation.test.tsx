import React, { useState } from "react"
import { render, fireEvent, waitFor, act } from "@testing-library/react-native"
import { Text, View, TouchableOpacity } from "react-native"
import { ThemeContext, useThemeProvider } from "@/utils/useAppTheme"
import { lightTheme, darkTheme } from "@/theme"

// Component that changes theme with delay
const AsyncThemeComponent = () => {
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <View>
        <TouchableOpacity
          testID="test-button"
          onPress={() => {
            setThemeContextOverride("dark")
          }}
        ></TouchableOpacity>
        <Text testID="theme-display">{themeScheme}</Text>
      </View>
    </ThemeProvider>
  )
}

describe("Async Theme Tests Initial State", () => {
  // Example using act() with explicit waiting
  it("should update theme after async operation with act()", async () => {
    jest.useFakeTimers()

    const { getByTestId } = render(<AsyncThemeComponent />)

    const el = getByTestId("theme-display")

    // console.log("el:", el)
    console.log("props:", el.props)

    // Initial state
    expect(getByTestId("theme-display").props.children).toBe("light")
  })

  it("should update theme when setThemeContextOverride is called", async () => {
    const { getByTestId } = render(<AsyncThemeComponent />)

    // 🔥 Initial state is light
    expect(getByTestId("theme-display").props.children).toBe("light")

    fireEvent.press(getByTestId("test-button"))

    // 🔥 Ensure theme updated
    await waitFor(() => {
      expect(getByTestId("theme-display").props.children).toBe("dark")
    })
  })
})
