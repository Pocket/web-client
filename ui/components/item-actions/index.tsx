import style from './style.module.css'

import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'
/**
 * ItemActions
 * ---
 * Actions that can be taken on an item. Should be ubiquitous if we are leaning into
 * a better organization.
 *
 */
export function ItemActions() {
  return (
    <div className={style.base} data-testid="item-actions">
      <OverflowMenuIcon />
    </div>
  )
}
