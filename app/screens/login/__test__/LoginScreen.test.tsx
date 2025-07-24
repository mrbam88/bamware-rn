import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { act } from "react-test-renderer"
import { Provider } from "react-redux"
import { store } from "@/store"
import { LoginScreen } from "../LoginScreen"

jest.setTimeout(10000)
jest.useFakeTimers()

jest.mock("@/navigators/navigationUtilities", () => ({
  resetRoot: jest.fn(),
}))

jest.mock("@/utils/useAppTheme", () => ({
  useAppTheme: () => ({
    themed: (style: any) =>
      typeof style === "function"
        ? style({
            spacing: { xxl: 24, lg: 16, sm: 8, md: 12, xs: 4 },
            colors: {
              text: "#000",
              background: "#fff",
              palette: { neutral700: "#000" },
              tint: "#f00",
            },
          })
        : style,
    theme: {
      colors: {
        text: "#000",
        background: "#fff",
        palette: { neutral700: "#000" },
        tint: "#f00",
      },
    },
  }),
}))

jest.mock("@/features/auth/loginApi", () => ({
  loginApi: jest.fn(({ email }) => {
    if (email === "fail@example.com") {
      return Promise.reject(new Error("Login failed."))
    }
    return Promise.resolve({
      accessToken: "token123",
      refreshToken: "refresh123",
      user: {
        email: "user@example.com",
        role: "Program Admin",
        isInternal: true,
        isSuperuser: true,
        isStaff: true,
      },
    })
  }),
}))

jest.mock("@/features/auth/sessionStorage", () => ({
  saveSessionToStorage: jest.fn(),
}))

const renderWithRedux = () =>
  render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>,
  )

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {}) // Silence expected errors
  })

  it("renders all components", () => {
    const { getByTestId, getByPlaceholderText } = renderWithRedux()

    expect(getByTestId("login-heading")).toBeTruthy()
    expect(getByTestId("login-submit-button")).toBeTruthy()
    expect(getByPlaceholderText("Email")).toBeTruthy()
    expect(getByPlaceholderText("Password")).toBeTruthy()
  })

  it("shows error on invalid email", async () => {
    const { getByPlaceholderText, getByTestId, findByText } = renderWithRedux()

    fireEvent.changeText(getByPlaceholderText("Email"), "fail@example.com")
    fireEvent.changeText(getByPlaceholderText("Password"), "anything")
    fireEvent.press(getByTestId("login-submit-button"))

    const error = await findByText("Login failed.")
    expect(error).toBeTruthy()
  })

  it("navigates on successful login", async () => {
    const { getByPlaceholderText, getByTestId } = renderWithRedux()
    const { resetRoot } = require("@/navigators/navigationUtilities")

    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com")
    fireEvent.changeText(getByPlaceholderText("Password"), "secret123")
    fireEvent.press(getByTestId("login-submit-button"))

    await act(async () => {
      jest.runAllTimers()
    })

    expect(resetRoot).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "MainApp" }],
    })
  })
})
