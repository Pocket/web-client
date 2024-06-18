import style from './style.module.css'

import { t } from '@common/localization'

/**
 * NavTopSearch
 * ---
 * Really this should be a universal bar with a dropdown ... but we will call it
 * search for now
 */
export function NavTopSearch() {
  const searchPlaceholder = t('nav:search', 'Search')
  return (
    <div className={`${style.base} new`} data-testid="nav-top-search">
      <input id="search" name="search" placeholder={searchPlaceholder} type="search" />
    </div>
  )
}
