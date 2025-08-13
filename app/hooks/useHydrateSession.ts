// app/hooks/useHydrateSession.ts

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSession } from "@/store/slices/sessionSlice"
import { loadSessionFromStorage } from "@/features/auth/sessionStorage"
import type { Session } from "@/types/session"

export const useHydrateSession = () => {
  const dispatch = useDispatch()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const hydrate = async () => {
      try {
        const session: Session | null = await loadSessionFromStorage()
        if (session) {
          dispatch(setSession(session))
        }
      } catch (error) {
        console.warn("Session hydration failed", error)
      } finally {
        setHydrated(true)
      }
    }

    hydrate()
  }, [dispatch])

  return hydrated
}
