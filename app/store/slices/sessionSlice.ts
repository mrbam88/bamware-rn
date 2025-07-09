import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Session {
  accessToken: string
  refreshToken: string
  user: {
    email: string
    role: string
    permissions: string[]
    featureFlags: string[]
  }
}

interface SessionState {
  session: Session | null
}

const initialState: SessionState = {
  session: null,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload
    },
    clearSession: (state) => {
      state.session = null
    },
  },
})

export const { setSession, clearSession } = sessionSlice.actions
export default sessionSlice.reducer
