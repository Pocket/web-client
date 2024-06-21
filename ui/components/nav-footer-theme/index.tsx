'use client'

import style from './style.module.css'
import { useUserSettings } from '@common/state/user-settings'

import { SystemModeIcon } from '@ui/icons/SystemModeIcon'
import { DarkModeIcon } from '@ui/icons/DarkModeIcon'
import { LightModeIcon } from '@ui/icons/LightModeIcon'

/**
 * NavFooterTheme
 * ---
 * Just a small theme switcher to live in the footer (not a permanent solution)
 */
export function NavFooterTheme() {
  // Get user setting
  const colorMode = useUserSettings((state) => state.colorMode)
  const updateColorMode = useUserSettings((state) => state.updateColorMode)

  // Functions for setting modes
  const setSystemMode = () => updateColorMode('system')
  const setDarkMode = () => updateColorMode('dark')
  const setLightMode = () => updateColorMode('light')

  // Get active class
  const systemClass = colorMode === 'system' ? 'active' : ''
  const lightClass = colorMode === 'light' ? 'active' : ''
  const darkClass = colorMode === 'dark' ? 'active' : ''

  return (
    <div className={style.base} data-testid="nav-footer-theme">
      <form>
        <div className="button-group iconic">
          <button className={systemClass} type="button" onClick={setSystemMode}>
            <SystemModeIcon />
          </button>
          <button className={darkClass} type="button" onClick={setDarkMode}>
            <DarkModeIcon />
          </button>
          <button className={lightClass} type="button" onClick={setLightMode}>
            <LightModeIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
