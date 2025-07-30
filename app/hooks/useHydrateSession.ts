import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSession } from "@/store/slices/sessionSlice"
import { loadSessionFromStorage, saveSessionToStorage } from "@/features/auth/sessionStorage"
import type { Session } from "@/types/session"

const DEBUG_LOAD_JSON_SESSION = true

export const useHydrateSession = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const hydrate = async () => {
      try {
        let session: Session | null = null

        if (DEBUG_LOAD_JSON_SESSION) {
          const mock = require("@/features/auth/mock/session.debug.json")

          session = {
            accessToken: mock.tokens.access_token,
            refreshToken: mock.tokens.refresh_token,
            user: {
              ...mock.user,
              permissions: mock.user.permissions ?? [],
              featureFlags: mock.user.featureFlags ?? [],
            },
          }

          console.log("✅ Dev mode: overriding session with mock JSON")
          console.log("🔑 Access Token:", session.accessToken)

          // ✅ Critical: write to MMKV BEFORE dispatching
          await saveSessionToStorage(session)
        } else {
          session = await loadSessionFromStorage()
        }

        if (session) {
          dispatch(setSession(session))
        }
      } catch (error) {
        console.warn("Failed to hydrate session", error)
      } finally {
        setLoaded(true)
      }
    }

    hydrate()
  }, [dispatch])

  return loaded
}
