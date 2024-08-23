import style from './style.module.css'

import { Suspense } from 'react'

import { NavTopAccount } from '../nav-top-account'
import { NavTopBrand } from '../nav-top-brand'
import { NavTopSearch } from '../nav-top-search'

/**
 * NavTop
 * ---
 * Main nav for the Pocket website. Includes primary links, auth/profile and additional tools
 *
 * __NOTE__: The suspense is required to trigger PPR in NextJS.  It means we can render
 * an effective shell with the nave as expected, but we will be making some client
 * checks here to determine auth state
 */
export function NavTop() {
  return (
    <header className={style.base} data-testid="nav-top">
      <div className={`${style.container} page-container`}>
        <NavTopBrand />
        <NavTopSearch />
        <Suspense>
          <NavTopAccount />
        </Suspense>
      </div>
    </header>
  )
}
