import style from './style.module.css'

import { PropsWithChildren } from 'react'

export type LayoutType = 1 | 2 | 3 | 4 | 5 | 'lockup'

/**
 * ItemArticleLayout
 * ---
 * Item Layouts are just a clean way to define grids, strata and whatnot
 */
export function ItemArticleLayout({
  layoutType,
  children
}: PropsWithChildren<{ layoutType: LayoutType }>) {
  return (
    <div className={style.base} data-layout={layoutType} data-testid="item-layout">
      {children}
    </div>
  )
}
