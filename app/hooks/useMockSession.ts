// app/hooks/useMockSession.ts

import { useEffect, useState } from "react"
import Config from "@/config"
import type { Session } from "@/types/session"

export const useMockSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (!Config.useMock.session) return

    try {
      const mock = require("@/features/auth/mock/session.debug.json")
      const loadedSession: Session = {
        accessToken: mock.tokens.access_token,
        refreshToken: mock.tokens.refresh_token,
        user: {
          ...mock.user,
          permissions: mock.user.permissions ?? [],
          featureFlags: mock.user.featureFlags ?? [],
        },
      }
      setSession(loadedSession)
    } catch (error) {
      console.warn("Failed to load mock session", error)
    }
  }, [])

  return session
}
