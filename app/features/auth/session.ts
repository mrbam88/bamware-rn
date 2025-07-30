import { load as mmkvLoad, save as mmkvSave, remove } from "@/utils/storage"
import sessionDebug from "@/features/auth/mock/session.debug.json"
import { Session } from "@/types/session"

const SESSION_KEY = "session"

export const saveSessionToStorage = (session: Session) => mmkvSave(SESSION_KEY, session)

export const loadSessionFromStorage = async (): Promise<Session | null> => {
  console.log("LOAD")
  const session: Session = {
    accessToken: sessionDebug.tokens.access_token,
    refreshToken: sessionDebug.tokens.refresh_token,
    user: {
      email: sessionDebug.user.email,
      role: sessionDebug.user.role,
      isInternal: sessionDebug.user.is_internal,
      isSuperuser: sessionDebug.user.is_superuser,
      isStaff: sessionDebug.user.is_staff,
      permissions: sessionDebug.user.permissions ?? [],
      featureFlags: sessionDebug.user.featureFlags ?? [],
    },
  }
  console.log("Dev mode: loading session from mock file session:", session)
  saveSessionToStorage(session)
  return session

  // return mmkvLoad(SESSION_KEY)
}

export const clearSessionFromStorage = () => remove(SESSION_KEY)
