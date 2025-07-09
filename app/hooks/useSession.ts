import { create } from "zustand"
import { Session } from "@/auth/session"

type SessionStore = {
  session: Session | null
  setSession: (session: Session) => void
  clearSession: () => void
}

export const useSession = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}))
