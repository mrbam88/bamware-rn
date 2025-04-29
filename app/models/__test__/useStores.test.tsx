import React from "react"
import { Text } from "@/components"
import { render } from "@testing-library/react-native"
import { useStores } from "../helpers/useStores"
import { RootStoreProvider } from "../helpers/useStores"
import { RootStoreModel } from "../RootStore"

// Mock a test component to call useStores()
const TestComponent = () => {
  const store = useStores()
  return <Text>{store.authenticationStore.authEmail}</Text>
}

describe("useStores", () => {
  it("returns a valid store", () => {
    const rootStore = RootStoreModel.create({
      authenticationStore: { authEmail: "test@bamware.com" },
    })

    // ✅ Wrap the test inside RootStoreProvider
    const { getByText } = render(
      <RootStoreProvider value={rootStore}>
        <TestComponent />
      </RootStoreProvider>,
    )
    // ✅ Verify the store works correctly
    expect(getByText("test@bamware.com")).toBeTruthy()
  })
})

it("updates authEmail correctly", () => {
  const rootStore = RootStoreModel.create({
    authenticationStore: { authEmail: "initial@bamware.com" },
  })

  const { getByText, rerender } = render(
    <RootStoreProvider value={rootStore}>
      <TestComponent />
    </RootStoreProvider>,
  )

  // ✅ Initial state check
  expect(getByText("initial@bamware.com")).toBeTruthy()

  // ✅ Use the MobX action to update authEmail
  rootStore.authenticationStore.setAuthEmail("updated@bamware.com")

  rerender(
    <RootStoreProvider value={rootStore}>
      <TestComponent />
    </RootStoreProvider>,
  )

  // ✅ Verify updated value
  expect(getByText("updated@bamware.com")).toBeTruthy()
})
