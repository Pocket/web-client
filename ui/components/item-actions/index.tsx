'use client'

import style from './style.module.css'

import { BookmarkFilledIcon, BookmarkIcon, IosShareIcon, SimilarIcon } from '@ui/icons'

// Components
import { ItemActionsOverflow } from '../item-actions-overflow'
import { ItemActionsSave } from '../item-actions-save'

import { useItemStatus } from '@common/state/item-status'

/**
 * ItemActions
 * ---
 * Actions that can be taken on an item. Should be ubiquitous if we are leaning into
 * a better organization.
 */
export function ItemActions({ id }: { id: string }) {
  const isSaved = useItemStatus((state) => state.isSaved(id))
  const addSave = useItemStatus((state) => state.addSave)
  const removeSave = useItemStatus((state) => state.removeSave)

  const handleSaveClick = () => (isSaved ? removeSave(id) : addSave(id))

  return (
    <div className={style.base} data-testid="item-actions">
      <div className={style.secondary}>
        <button className="action tiny" type="button">
          <IosShareIcon />
        </button>
        <button
          className={`action tiny  ${isSaved ? style.bookmarked : ''}`}
          type="button"
          onClick={handleSaveClick}>
          <BookmarkIcon />
        </button>
      </div>

      <ItemActionsOverflow id={id} />

      <ItemActionsSave id={id} />
    </div>
  )
}
