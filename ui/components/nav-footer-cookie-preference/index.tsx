'use client'

import { useTranslation } from '@common/localization'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    OneTrust: {
      ToggleInfoDisplay: () => null
    }
  }
}

/**
 * NavFooterCookiePreference
 * ---
 * Trigger cookie preference dashboard
 */
export function NavFooterCookiePreference() {
  const { t } = useTranslation()
  const oneTrustClickHandler = useRef(() => {})

  useEffect(() => {
    oneTrustClickHandler.current = () => window.OneTrust?.ToggleInfoDisplay()
  }, [])

  return (
    <button
      className="text"
      data-testid="nav-footer-cookie-preference"
      id="ot-sdk-btn"
      suppressHydrationWarning={true}
      type="button"
      onClick={oneTrustClickHandler.current}>
      {t('global-footer:cookie-preferences', 'Cookie preferences')}
    </button>
  )
}
