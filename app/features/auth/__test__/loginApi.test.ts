import axios from "axios"

describe("Login API", () => {
  it("authenticates user and returns access token", async () => {
    const response = await axios.post(
      "https://flexcoa-api-uat-h4cshndgegg6e5dt.eastus-01.azurewebsites.net/api/login/",
      {
        email: "bilal.malik@vpgcentral.com",
        password: "Br00klyn@88",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const { tokens, user } = response.data

    expect(tokens.access_token).toBeDefined()
    expect(tokens.refresh_token).toBeDefined()
    expect(user.email).toBe("bilal.malik@vpgcentral.com")
    expect(user.role).toBe("Program Admin")
  })
})
