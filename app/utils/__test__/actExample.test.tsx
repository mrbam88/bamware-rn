import React, { useState } from "react"
import { render, act, fireEvent } from "@testing-library/react-native"
import { Text, Button } from "react-native"

const CounterComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Text testID="counter">{count}</Text>
      <Button testID="increment-btn" title="Increment" onPress={() => setCount(count + 1)} />
    </>
  )
}

describe("React state updates inside act()", () => {
  it("should increment count when button is pressed", async () => {
    const { getByTestId } = render(<CounterComponent />)

    expect(getByTestId("counter").props.children).toBe(0)

    await act(async () => {
      fireEvent.press(getByTestId("increment-btn")) // 🔥 Correct way to simulate button press
    })

    expect(getByTestId("counter").props.children).toBe(1) // ✅ Confirms state update
  })
})
