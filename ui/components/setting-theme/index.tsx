'use client'

import style from './style.module.css'

import { COLOR_MODE_PREFIX } from '@common/constants'
import { DarkModeIcon } from '@ui/icons/DarkModeIcon'
import { LightModeIcon } from '@ui/icons/LightModeIcon'
import { SystemModeIcon } from '@ui/icons/SystemModeIcon'
import { useEffect, useRef } from 'react'

import { useUserSettings } from '@common/state/user-settings'

/**
 * SettingTheme
 * ---
 * Allows the user to set their preferred theme (system/light/dark)
 */
export function SettingTheme({ buttonClass = '' }: { buttonClass?: string }) {
  // We don't want to turn the whole application into a client side render
  const bodyRef = useRef<HTMLElement | null>(null)

  // Get user setting
  const colorMode = useUserSettings((state) => state.colorMode)
  const updateColorMode = useUserSettings((state) => state.updateColorMode)

  // We want to set the mode on state AND update the body class in a non reactive way
  const setColorMode = (mode: string) => {
    updateColorMode(mode)

    // If we have a proper ref yet, swap out the class
    if (bodyRef.current) bodyRef.current.className = `${COLOR_MODE_PREFIX}-${mode}`
  }

  // Functions for setting modes
  const setSystemMode = () => setColorMode('system')
  const setDarkMode = () => setColorMode('dark')
  const setLightMode = () => setColorMode('light')

  // Get active class
  const systemClass = colorMode === 'system' ? 'active' : ''
  const lightClass = colorMode === 'light' ? 'active' : ''
  const darkClass = colorMode === 'dark' ? 'active' : ''

  useEffect(() => {
    bodyRef.current = document.querySelector('body')
  }, [])

  return (
    <div className={style.base} data-testid="setting-theme">
      <button className={`${systemClass} ${buttonClass}`} type="button" onClick={setSystemMode}>
        <SystemModeIcon />
      </button>
      <button className={`${darkClass} ${buttonClass}`} type="button" onClick={setDarkMode}>
        <DarkModeIcon />
      </button>
      <button className={`${lightClass} ${buttonClass}`} type="button" onClick={setLightMode}>
        <LightModeIcon />
      </button>
    </div>
  )
}
