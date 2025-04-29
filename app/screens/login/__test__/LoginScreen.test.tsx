import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { LoginScreen } from "../LoginScreen"

// Mock the setAuthToken function so we can verify it's called
const mockSetAuthToken = jest.fn()

// Mock the useStores hook with the correct relative path
jest.mock("../../../models", () => ({
  useStores: () => ({
    authenticationStore: {
      authEmail: "",
      setAuthEmail: jest.fn(),
      setAuthToken: mockSetAuthToken,
      validationError: "",
    },
  }),
}))

// Mock the useAppTheme hook to return dummy themed functions and theme values.
jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: () => ({
    themed: (style: any) =>
      typeof style === "function"
        ? style({
            spacing: { xxl: 24, lg: 16, sm: 8, md: 12, xs: 4 },
            colors: { palette: { neutral700: "#000" }, tint: "#f00" },
          })
        : style,
    theme: {
      colors: {
        palette: { neutral700: "#000" },
        tint: "#f00",
      },
    },
  }),
}))

describe("LoginScreen", () => {
  // Clear mock function calls before each test
  beforeEach(() => {
    mockSetAuthToken.mockClear()
  })

  it("renders all components", () => {
    const { getByTestId } = render(<LoginScreen />)
    expect(getByTestId("bamware-login-heading")).toBeTruthy()
    expect(getByTestId("bamware-login-button")).toBeTruthy()
  })

  // it("handles login button press", () => {
  //   const { getByTestId } = render(<LoginScreen />)
  //   const loginButton = getByTestId("bamware-login-button")
  //   fireEvent.press(loginButton)

  //   // Verify that setAuthToken was called, which means login was processed
  //   expect(mockSetAuthToken).toHaveBeenCalled()
  // })
})
