'use client'

import style from './style.module.css'

import { useTranslation } from '@common/localization'
import { useEffect, useRef } from 'react'

/**
 * NavTopSearch
 * ---
 * Really this should be a universal bar with a dropdown ... but we will call it
 * search for now
 */
export function NavTopSearch() {
  const { t } = useTranslation()
  const searchPlaceholder = useRef('')

  useEffect(() => {
    searchPlaceholder.current = t('nav:search', 'Search')
  }, [t])

  return (
    <div className={`${style.base} new`} data-testid="nav-top-search">
      <input id="search" name="search" placeholder={searchPlaceholder.current} type="search" />
    </div>
  )
}
