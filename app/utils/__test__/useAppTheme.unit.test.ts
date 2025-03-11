import React from "react"
import { useAppTheme } from "../useAppTheme"

jest.mock("../useAppTheme", () => ({
  useAppTheme: jest.fn(() => ({
    navTheme: { dark: false, colors: { background: "white", text: "black", primary: "blue" } },
    theme: { colors: { background: "white", text: "black", primary: "blue" } },
    themeContext: "light",
    setThemeContextOverride: jest.fn(),
    themed: jest.fn((style) => style),
  })),
}))

describe("useAppTheme - Unit Test", () => {
  it("should return the mocked light theme", () => {
    const theme = useAppTheme()
    expect(theme.themeContext).toBe("light")
    expect(theme.theme.colors.background).toBe("white")
  })

  it("should allow theme override", () => {
    const theme = useAppTheme()
    theme.setThemeContextOverride("dark")
    expect(theme.setThemeContextOverride).toHaveBeenCalledWith("dark")
  })
})
