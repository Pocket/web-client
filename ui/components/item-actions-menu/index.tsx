'use client'

import style from './style.module.css'

// Libraries
import { t } from '@common/localization'

/**
 * ItemItemActionsMenu
 * ---
 * The overflow menu of item actions
 */
export function ItemActionsMenu({ isSaved = false }: { isSaved?: boolean }) {
  return (
    <div className={style.base} data-testid="item-actions-menu">
      {isSaved ? (
        <>
          <button className="menu" type="button">
            {t('item-action:delete', 'Delete')}
          </button>
          <button className="menu" type="button">
            {t('item-action:archive', 'Archive')}
          </button>
          <button className="menu" type="button">
            {t('item-action:favorite', 'Favorite')}
          </button>
          <button className="menu" type="button">
            {t('item-action:tag', 'Tag')}
          </button>
          <button className="menu" type="button">
            {t('item-action:permanent-copy', 'Permanent Copy')}
          </button>
        </>
      ) : (
        <>
          <button className="menu" type="button">
            {t('item-action:report', 'Report this Item')}
          </button>
          <button className="menu" type="button">
            {t('item-action:add-to-list', 'Add to List')}
          </button>
          <button className="menu" type="button">
            {t('item-action:share', 'Share')}
          </button>
        </>
      )}
    </div>
  )
}
