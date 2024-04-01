import style from './style.module.css'

import { NavFooter } from '../nav-footer'
import { NavTop } from '../nav-top'

import type { PropsWithChildren } from 'react'

/**
 * LayoutMain
 * ---
 * This is more or less the chrome for the site,
 * with a consistent top nav and footer
 */
export function LayoutMain({ children }: PropsWithChildren) {
  return (
    <div className="new" data-testid="layout-main">
      <NavTop />
      <main className={`${style.base} page-container`}>{children}</main>
      <NavFooter />
    </div>
  )
}
