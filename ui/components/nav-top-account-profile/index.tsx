import style from './style.module.css'

import { useUserInfo } from '@common/state/user-info'

/**
 * NavTopAccountProfile
 * ---
 * User avatar and the dropdown menu
 */
export function NavTopAccountProfile() {
  const avatarUrl = useUserInfo((state) => state.avatarUrl)
  return (
    <div className={style.base} data-testid="nav-top-account-profile">
      <button className={`${style.avatar} text`} type="button">
        <img alt="" src={avatarUrl as string} />
      </button>
    </div>
  )
}
