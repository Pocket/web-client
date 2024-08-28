// Libraries
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getStoredUser, getUser } from './server'

// Types
import type { UserDisplayData } from '@common/types'

export type UserInfoState = {
  pending?: boolean
  responseError?: string
} & UserDisplayData

export type UserInfo = {
  actions: {
    getUserData: () => UserInfoState
    removeUserData: () => void
    setUserData: (data: UserInfoState) => void
  }
} & UserInfoState

/**
 * useUserSettings
 * ---
 * The state for user settings
 * @function update — update color theme of the app
 */
export const useUserInfo = create<UserInfo>()(
  devtools((set) => ({
    /** State Values */
    pending: true,
    actions: {
      getUserData: async () => {
        // Let's optimistically set the user based on the stored token if it exists
        const storedUser = await getStoredUser()
        if (storedUser?.id) set({ ...storedUser, pending: false })

        // Even after that we want to verify the session which should take us though
        // a full request is the bearer token doesn't exist.
        const retrievedUser = await getUser()
        if (retrievedUser) set({ ...retrievedUser, pending: false })
      },
      removeUserData: () => {},
      setUserData: (data) => set({ ...data, pending: false })
    }
  }))
)
