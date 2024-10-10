'use client'

import { useTranslation } from '@common/localization'

/**
 * NavFooterCookiePreference
 * ---
 * Trigger cookie preference dashboard
 */
export function NavFooterCookiePreference() {
  const { t } = useTranslation()
  const oneTrustClickHandler = () => window.OneTrust?.ToggleInfoDisplay()
  return (
    <button
      className="text"
      data-testid="nav-footer-cookie-preference"
      id="ot-sdk-btn"
      type="button"
      onClick={oneTrustClickHandler}>
      {t('global-footer:cookie-preferences', 'Cookie preferences')}
    </button>
  )
}
