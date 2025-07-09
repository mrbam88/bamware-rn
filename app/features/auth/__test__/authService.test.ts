import { loginApi } from "../loginApi"
import { load } from "@/utils/storage"
import { Session } from "../session"
import { apiService } from "@/services/auth/apiService"

jest.mock("@/services/auth/apiService", () => ({
  apiService: {
    post: jest.fn(),
  },
}))

describe("loginApi", () => {
  const mockResponse = {
    data: {
      tokens: {
        access_token: "fake-access-token",
        refresh_token: "fake-refresh-token",
      },
      user: {
        email: "test@example.com",
        role: "Program Admin",
        is_internal: true,
        is_superuser: true,
        is_staff: true,
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should login and return session object", async () => {
    ;(apiService.post as jest.Mock).mockResolvedValueOnce(mockResponse)

    const session = await loginApi({ email: "test@example.com", password: "test123" })

    expect(apiService.post).toHaveBeenCalledWith("/login/", {
      email: "test@example.com",
      password: "test123",
    })

    expect(session).toEqual<Session>({
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
      user: {
        email: "test@example.com",
        role: "Program Admin",
        isInternal: true,
        isSuperuser: true,
        isStaff: true,
      },
    })

    const stored = load<Session>("session")
    expect(stored).toEqual(session)
  })

  it("should throw if response is not ok", async () => {
    ;(apiService.post as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 401,
        data: "Invalid credentials",
      },
    })

    await expect(loginApi({ email: "bad@example.com", password: "wrong" })).rejects.toThrow(
      'Login failed: 401 - "Invalid credentials"',
    )
  })
})
