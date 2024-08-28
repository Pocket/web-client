import style from './style.module.css'

import { SettingTheme } from '../setting-theme'

/**
 * NavFooterTheme
 * ---
 * Just a small theme switcher to live in the footer (not a permanent solution)
 */
export function NavFooterTheme() {
  return (
    <div className={style.base} data-testid="nav-footer-theme">
      <SettingTheme />
    </div>
  )
}
