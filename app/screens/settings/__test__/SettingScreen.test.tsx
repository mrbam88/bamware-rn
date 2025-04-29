import { SettingScreen } from "../SettingScreen"
import { render } from "@testing-library/react-native"

describe("render setting screen", () => {
  it("render screen", () => {
    const el = render(<SettingScreen />)
    expect(el).toBeTruthy()
  })
})
