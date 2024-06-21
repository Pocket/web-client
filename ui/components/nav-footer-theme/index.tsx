import style from './style.module.css'
import { cookies } from 'next/headers'

import { SystemModeIcon } from '@ui/icons/SystemModeIcon'
import { DarkModeIcon } from '@ui/icons/DarkModeIcon'
import { LightModeIcon } from '@ui/icons/LightModeIcon'
import { createThemeCookie } from './server-action'
import { CACHE_KEY_COLOR_MODE } from '@common/constants'

/**
 * NavFooterTheme
 * ---
 * Just a small theme switcher to live in the footer (not a permanent solution)
 */
export function NavFooterTheme() {
  const cookieStore = cookies()
  const storedColorPreference = cookieStore.get(CACHE_KEY_COLOR_MODE)
  const theme = storedColorPreference?.value ?? 'system'

  const systemClass = theme === 'system' ? 'active' : ''
  const lightClass = theme === 'light' ? 'active' : ''
  const darkClass = theme === 'dark' ? 'active' : ''

  return (
    <div className={style.base} data-testid="nav-footer-theme">
      <form action={createThemeCookie}>
        <div className="button-group iconic">
          <button className={systemClass} type="submit" name="theme" value="system">
            <SystemModeIcon />
          </button>
          <button className={darkClass} type="submit" name="theme" value="dark">
            <DarkModeIcon />
          </button>
          <button className={lightClass} type="submit" name="theme" value="light">
            <LightModeIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
