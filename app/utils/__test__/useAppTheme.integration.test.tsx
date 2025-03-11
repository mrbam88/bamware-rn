import React, { useState } from "react"
import { render, fireEvent, waitFor, act } from "@testing-library/react-native"
import { Text, View, TouchableOpacity } from "react-native"
import { ThemeContext } from "../useAppTheme"
import { lightTheme, darkTheme } from "@/theme"

// Component that changes theme with delay
const AsyncThemeComponent = () => {
  const [themeScheme, setThemeScheme] = useState("light")

  const toggleTheme = async () => {
    // Simulate API call or async operation
    await new Promise((resolve) => setTimeout(resolve, 100))
    setThemeScheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider
      value={{
        themeScheme,
        setThemeContextOverride: setThemeScheme,
        theme: themeScheme === "light" ? lightTheme : darkTheme,
      }}
    >
      <View>
        <Text testID="theme-display">{themeScheme}</Text>
        <TouchableOpacity testID="toggle-theme" onPress={toggleTheme}>
          <Text>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
    </ThemeContext.Provider>
  )
}

describe("Async Theme Tests", () => {
  // Example using act() with explicit waiting
  it("should update theme after async operation with act()", async () => {
    jest.useFakeTimers()

    const { getByTestId } = render(<AsyncThemeComponent />)

    // Initial state
    expect(getByTestId("theme-display").props.children).toBe("light")

    // Use act to handle async state updates
    await act(async () => {
      fireEvent.press(getByTestId("toggle-theme"))
      // Advance timers to complete the async operation
      jest.advanceTimersByTime(150)
    })

    // Verify the update occurred
    expect(getByTestId("theme-display").props.children).toBe("dark")

    jest.useRealTimers()
  })

  // Example using waitFor()
  it("should update theme after async operation with waitFor()", async () => {
    const { getByTestId } = render(<AsyncThemeComponent />)

    // Initial state
    expect(getByTestId("theme-display").props.children).toBe("light")

    // Trigger the async operation
    fireEvent.press(getByTestId("toggle-theme"))

    // Use waitFor to wait for the condition to be true
    await waitFor(
      () => {
        expect(getByTestId("theme-display").props.children).toBe("dark")
      },
      { timeout: 1000 },
    ) // Increase timeout if needed
  })
})
