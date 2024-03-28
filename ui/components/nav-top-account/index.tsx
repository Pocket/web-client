import style from './style.module.css'

import { NavTopAccountAuth } from '../nav-top-account-auth'
import { NavTopAccountProfile } from '../nav-top-account-profile'

/**
 * NavTopAccount
 * ---
 * Logged In: This is the Avatar button that reveals a drop down menu
 *
 * Logged Out: This shows a login/sign up
 */
export function NavTopAccount({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const accountClass = isLoggedIn ? style.loggedIn : style.loggedOut
  return (
    <div className={accountClass} data-testid="nav-top-account">
      {isLoggedIn ? <NavTopAccountProfile /> : <NavTopAccountAuth />}
    </div>
  )
}
