import style from './style.module.css'

import { NavTopAccount } from '../nav-top-account'
import { NavTopBrand } from '../nav-top-brand'
import { NavTopSearch } from '../nav-top-search'

/**
 * NavTop
 * ---
 * Main nav for the Pocket website. Includes primary links, auth/profile and additional tools
 */
export function NavTop({ isLoggedIn }: { isLoggedIn?: boolean }) {
  return (
    <header className={style.base} data-testid="nav-top">
      <div className={`${style.container} page-container`}>
        <NavTopBrand />
        <NavTopSearch />
        <NavTopAccount isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}
