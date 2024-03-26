import { t } from '@common/localization'

declare global {
  interface Window {
    OneTrust: {
      ToggleInfoDisplay: () => void
    }
  }
}

/**
 * NavFooterCookiePreference
 * ---
 * Trigger cookie preference dashboard
 */
export function NavFooterCookiePreference() {
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
