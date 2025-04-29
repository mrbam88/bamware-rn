import { Instance, SnapshotOut, types } from "mobx-state-tree"

// Define the Authentication Store
const AuthenticationStore = types
  .model("AuthenticationStore", {
    authEmail: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setAuthEmail(email: string) {
      self.authEmail = email
    },
  }))

// Add it to RootStore
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStore, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
