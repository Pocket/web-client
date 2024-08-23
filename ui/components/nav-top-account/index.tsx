'use client'

import style from './style.module.css'

import { useEffect } from 'react'

import { NavTopAccountAuth } from '../nav-top-account-auth'
import { NavTopAccountProfile } from '../nav-top-account-profile'

import { useUserInfo } from '@common/state/user-info'

/**
 * NavTopAccount
 * ---
 * Logged In: This is the Avatar button that reveals a drop down menu
 * Logged Out: This shows a login/sign up
 */
export function NavTopAccount() {
  // State
  const isPending = useUserInfo((state) => state.pending)
  const isLoggedIn = useUserInfo((state) => state.id)

  // Actions
  const getUserData = useUserInfo((state) => state.actions.getUserData)

  // Style variables
  const accountClass = isLoggedIn ? style.loggedIn : style.loggedOut

  // We want to trigger this check once.  If we don't have valid user data, we can
  // assume the user will need to take action in order to log in.
  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <div className={accountClass} data-testid="nav-top-account">
      {isPending ? null : isLoggedIn ? <NavTopAccountProfile /> : <NavTopAccountAuth />}
    </div>
  )
}
