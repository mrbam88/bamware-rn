export interface SessionUser {
  email: string
  role: string
  permissions: string[]
  featureFlags: string[]
}

export interface Session {
  accessToken: string
  refreshToken: string
  user: SessionUser
}
