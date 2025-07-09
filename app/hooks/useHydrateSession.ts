import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSession } from "@/store/slices/sessionSlice"
import { loadSessionFromStorage } from "@/features/auth/sessionStorage"

export const useHydrateSession = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const hydrate = async () => {
      const session = await loadSessionFromStorage()
      if (session) dispatch(setSession(session))
      setLoaded(true)
    }
    hydrate()
  }, [])

  return loaded
}
