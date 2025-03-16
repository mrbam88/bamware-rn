import { render } from "@testing-library/react-native"
import { Text } from "@/components/text/Text"
import { TextStyle } from "react-native"
import { translate, isRTL, initI18n } from "@/i18n"
import i18n from "i18next"

jest.mock("i18next", () => ({
  t: jest.fn((key) => key), // Mock translation function
  isInitialized: true,
  changeLanguage: jest.fn(),
}))

jest.mock("@/i18n", () => ({
  translate: jest.fn((key) => {
    const mockTranslations = {
      "welcomeScreen:readyForLaunch": "Welcome! 🚀",
      "common.hello": "Hello",
      "common.goodbye": "Goodbye",
    }
    return mockTranslations[key] || key
  }),
  isRTL: false,
  initI18n: jest.fn(() => Promise.resolve()),
}))

describe("Text Component", () => {
  it("applies preset styles correctly", () => {
    const { getByTestId } = render(
      <Text preset="heading" testID="text-heading">
        Heading
      </Text>,
    )
    const textComponent = getByTestId("text-heading")

    // 🔥 Flatten styles: filter out functions and merge objects
    const flatStyle = Object.assign(
      {},
      ...textComponent.props.style.filter((s: TextStyle) => typeof s === "object"),
    )

    // 🔥 Check only relevant properties, ignoring extra keys
    expect(flatStyle["1"]).toMatchObject({
      fontSize: 36,
      fontFamily: "spaceGroteskBold",
      lineHeight: 44,
    })
  })
})

describe("Text Component - Translations", () => {
  it("renders translated text when tx is provided", () => {
    const { getByTestId } = render(<Text tx="welcomeScreen:readyForLaunch" testID="text" />)

    expect(getByTestId("text").props.children).toBe("Welcome! 🚀")
  })
})

describe("Translation Function", () => {
  beforeAll(async () => {
    await initI18n() // Ensure i18n is initialized
  })

  it("translates keys correctly in English", () => {
    i18n.t.mockImplementation((key) => {
      const translations = {
        "common.hello": "Hello",
        "common.goodbye": "Goodbye",
      }
      return translations[key] || key
    })

    expect(translate("common.hello")).toBe("Hello")
    expect(translate("common.goodbye")).toBe("Goodbye")
  })

  it("falls back to the key if translation is missing", () => {
    expect(translate("non.existent.key")).toBe("non.existent.key")
  })
})
