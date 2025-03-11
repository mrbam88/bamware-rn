import React from "react"
import { render } from "@testing-library/react-native"
import { Button } from "../Button"

describe("Button Component", () => {
  it("applies custom styles", () => {
    const { getByTestId } = render(
      <Button text="Styled" style={{ backgroundColor: "red" }} testID="button" />,
    )

    const button = getByTestId("button")

    // Ensure the style is always treated as an array
    const buttonStyles = Array.isArray(button.props.style)
      ? button.props.style
      : [button.props.style]

    // Flatten styles (to handle nested arrays if any)
    const flattenedStyles = buttonStyles.flat().filter(Boolean)

    // Check if any of the objects inside flattenedStyles contains { backgroundColor: "red" }
    expect(flattenedStyles).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: "red" })]),
    )
  })
})
