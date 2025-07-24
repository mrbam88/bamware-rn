import { render } from "@testing-library/react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { WelcomeScreen } from "../WelcomeScreen"

describe("WelcomeScreen", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <WelcomeScreen />
      </SafeAreaProvider>,
    )

    // ✅ Ensuring key elements exist
    expect(getByTestId("welcome-logo")).toBeTruthy()
    expect(getByTestId("welcome-heading")).toBeTruthy()
    expect(getByTestId("welcome-face")).toBeTruthy()
  })
})
