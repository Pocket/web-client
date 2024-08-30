// Libraries
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { getStoredUser, getUser } from './server'
import { deleteSession } from './session'

// Types
import type { UserDisplayData } from '@common/types'

export type UserInfoState = {
  pending?: boolean
  responseError?: string
} & UserDisplayData

type UserInfoActions = {
  getUserData: () => UserInfoState
  removeUserData: () => void
  setUserData: (data: UserInfoState) => void
}

const initialState = {
  pending: true,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  avatarUrl: undefined,
  id: undefined,
  accountCreationDate: undefined
}

export const useUserInfo = create<UserInfoActions & UserInfoState>()(
  devtools((set) => ({
    ...initialState,
    getUserData: async () => {
      // Let's optimistically set the user based on the stored token if it exists
      const storedUser = await getStoredUser()
      if (storedUser?.id) set({ ...storedUser, pending: false })

      // Even after that we want to verify the session which should take us though
      // a full request is the bearer token doesn't exist.
      const retrievedUser = await getUser()
      if (retrievedUser) set({ ...retrievedUser, pending: false })
    },

    removeUserData: async () => {
      set({ ...initialState, pending: false })
      await deleteSession()
    },

    setUserData: (data) => set({ ...data, pending: false })
  }))
)
