'use client'

import style from './style.module.css'

import { IosShareIcon } from '@ui/icons/IosShareIcon'
import { LikeIcon } from '@ui/icons/LikeIcon'

// Components
import { ItemActionsOverflow } from '../item-actions-overflow'
import { ItemActionsSave } from '../item-actions-save'
import { Suspense } from 'react'

/**
 * ItemActions
 * ---
 * Actions that can be taken on an item. Should be ubiquitous if we are leaning into
 * a better organization.
 */
export function ItemActions({ id }: { id: string }) {
  return (
    <div className={style.base} data-testid="item-actions">
      <div className={style.secondary}>
        <button className="action tiny" type="button">
          <IosShareIcon />
        </button>
        <button className={`action tiny `} type="button">
          <LikeIcon />
        </button>
      </div>

      <Suspense>
        <ItemActionsOverflow id={id} />
        <ItemActionsSave id={id} />
      </Suspense>
    </div>
  )
}
