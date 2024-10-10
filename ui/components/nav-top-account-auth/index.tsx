import style from './style.module.css'

import { SIGNUP_URL } from '@common/constants'
import { useTranslation } from '@common/localization'

/**
 * NavTopAccountAuth
 * ---
 * When the user is not logged in we give the option to sign in or sign up
 */
export function NavTopAccountAuth() {
  const { t } = useTranslation()
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL
  return (
    <div className={style.base} data-testid="nav-top-account-auth">
      <a
        className="button new small outline"
        data-testid="nav-top-account-signup-link"
        href={`${SIGNUP_URL}?src=web-nav`}
        id="global-nav-signup-link">
        <span className="label">{t('nav:sign-up', 'Sign up')}</span>
      </a>
      <a
        className="button new small primary"
        data-testid="nav-top-account-login-link"
        href={`${LOGIN_URL}?src=web-nav`}
        id="global-nav-login-link">
        {t('nav:log-in', 'Log in')}
      </a>
    </div>
  )
}
