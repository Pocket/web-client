import style from './style.module.css'

// Constants
import { LOGIN_URL, SIGNUP_URL } from '@common/constants'
// Libraries
import { t } from '@common/localization'

/**
 * NavTopAccountAuth
 * ---
 * When the user is not logged in we give the option to sign in or sign up
 */
export function NavTopAccountAuth() {
  return (
    <div className={style.base} data-testid="nav-top-account-auth">
      <a
        className="button new small outline"
        data-testid="nav-top-account-signup-link"
        href={`${SIGNUP_URL}?src=web-nav&utm_source=${global.location.href}`}
        id="global-nav-signup-link">
        <span className="label">{t('nav:sign-up', 'Sign up')}</span>
      </a>
      <a
        className="button new small primary"
        data-testid="nav-top-account-login-link"
        href={`${LOGIN_URL}?src=web-nav&utm_source=${global.location.href}`}
        id="global-nav-login-link">
        {t('nav:log-in', 'Log in')}
      </a>
    </div>
  )
}
