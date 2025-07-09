import { apiService } from "@/services/auth/apiService"
import { saveSession, Session } from "./session"

interface LoginParams {
  email: string
  password: string
}

export async function loginApi({ email, password }: LoginParams): Promise<Session> {
  try {
    const response = await apiService.post("/login/", { email, password })

    const data = response.data

    const session: Session = {
      accessToken: data.tokens.access_token,
      refreshToken: data.tokens.refresh_token,
      user: {
        email: data.user.email,
        role: data.user.role,
        isInternal: data.user.is_internal,
        isSuperuser: data.user.is_superuser,
        isStaff: data.user.is_staff,
      },
    }
    console.log("loginApi saveSession...", session)
    saveSession(session)
    return session
  } catch (error: any) {
    const status = error.response?.status
    const body = error.response?.data || error.message
    throw new Error(`Login failed: ${status} - ${JSON.stringify(body)}`)
  }
}
