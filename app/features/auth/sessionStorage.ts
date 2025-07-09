import { load, save, remove } from "@/utils/storage"
import { Session } from "@/store/slices/sessionSlice"

const SESSION_KEY = "session"

export const saveSessionToStorage = (session: Session) => save(SESSION_KEY, session)
export const loadSessionFromStorage = (): Promise<Session | null> => load(SESSION_KEY)
export const clearSessionFromStorage = () => remove(SESSION_KEY)
