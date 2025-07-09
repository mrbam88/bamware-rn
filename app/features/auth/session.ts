import { load, save, remove } from "@/utils/storage"

const SESSION_KEY = "session"

export interface Session {
  accessToken: string
  refreshToken: string
  user: {
    email: string
    role: string
    isInternal: boolean
    isSuperuser: boolean
    isStaff: boolean
  }
}

export const getSession = (): Session | null => {
  return load<Session>(SESSION_KEY)
}

export const saveSession = (session: Session) => {
  save(SESSION_KEY, session)
}

export const clearSession = () => {
  remove(SESSION_KEY)
}
