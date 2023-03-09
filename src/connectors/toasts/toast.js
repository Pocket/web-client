import React, { useEffect, useCallback, useState } from 'react'
import { css, cx } from 'linaria'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'

import { Fade } from 'common/utilities/animation/fade'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { useTranslation } from 'next-i18next'
import { mutationUnDelete } from 'connectors/items/mutation-delete.state'

import { ITEMS_UPSERT_SUCCESS } from 'actions'

import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_TAGGING } from 'actions'
import { MUTATION_UPSERT } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { SHARE_RECOMMEND_SUCCESS } from 'actions'
import { SHARE_RECOMMEND_FAILURE } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'

const toastWrapper = css`
  text-align: left;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  transform: translateZ(0.01);
  .toastBlock {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    line-height: 22px;
    font-size: 16px;
    font-family: 'Graphik Web';
    padding: 20px;
    border-radius: 4px;
    margin: 20px 0 0 0;
    min-width: 275px;
    border-radius: 4px;
    background-color: var(--color-navCurrentTab);
    color: var(--color-navCurrentTabText);

    p {
      margin: 0;
    }

    .actionWrapper {
      padding-left: 1rem;
    }

    button.text {
      color: var(--color-navCurrentTabText);
      font-weight: 500;
      cursor: pointer;
    }

    &.success {
      background-color: var(--color-navCurrentTab);
      color: var(--color-navCurrentTabText);
    }
    &.neutral {
      background-color: var(--color-navCurrentTab);
      color: var(--color-navCurrentTabText);
    }
    &.warn {
      background-color: var(--color-error);
      color: var(--color-actionBrandText);

      button.text {
        color: var(--color-actionBrandText);
      }
    }
  }
  &.actionWrapper {
    text-align: right;
  }
`

export function Toast({
  stamp,
  type,
  ids,
  actionType,
  deletedItemPosition,
  itemCount = 1,
  previousStatus
}) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const messages = {
    // Adding Items
    [ITEMS_UPSERT_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [ITEMS_ADD_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [ADD_SHARE_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [COLLECTIONS_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [COLLECTION_PAGE_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [DISCOVER_ITEMS_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [ARTICLE_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { itemCount }),
    [MUTATION_UNARCHIVE]: t('toast:added', '{{count}} item added', { itemCount }),
    [MUTATION_UPSERT]: t('toast:added', '{{count}} item added', { itemCount }),
    [ADD_SHARE_FAILURE]: t('toast:error-adding', 'Error adding item'),

    // Tagging Items
    [ITEMS_TAG_SUCCESS]: t('toast:tagged', '{{count}} item added', { itemCount }),
    [MUTATION_TAGGING]: t('toast:tagged', '{{count}} item added', { itemCount }),

    // Deleting
    [MUTATION_DELETE_SUCCESS]: t('toast:deleted', '{{count}} item deleted', { itemCount }),

    // Sharing
    [SHARE_RECOMMEND_SUCCESS]: t('toast:shared', '{{count}} item shared', { itemCount }),
    [SHARE_RECOMMEND_FAILURE]: t('toast:error-sharing', 'Error sharing item'),
    [COPY_ITEM_URL]: t('toast:url-copied', 'URL copied'),

    // Archive
    [MUTATION_ARCHIVE]: t('toast:archived', '{{count}} item archived', { itemCount }),

    [MUTATION_FAVORITE]: t('toast:added-to-favorites', '{{count}} item added to favorites', { itemCount }), //prettier-ignore
    [MUTATION_UNFAVORITE]: t('toast:removed-from-favorites', '{{count}} item removed from favorites', { itemCount }), //prettier-ignore

    [HIGHLIGHT_SAVE_SUCCESS]: t('toast:highlighted', '{{count}} item highlighted', { itemCount }), //prettier-ignore
    [HIGHLIGHT_DELETE_SUCCESS]: t('toast:highlight-deleted', '{{count}} highlight removed', { itemCount }), //prettier-ignore

    [ITEMS_TAG_FAILURE]: t('toast:error-tagging', 'Error tagging item')
  }

  const errors = [SHARE_RECOMMEND_FAILURE, ITEMS_TAG_FAILURE, ADD_SHARE_FAILURE]

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [stamp, dispatch])

  const typeForMessage = actionType || type
  const showUndo = type === MUTATION_DELETE_SUCCESS && deletedItemPosition !== undefined
  const IconToShow = errors.includes(type) ? ErrorIcon : CheckIcon

  useEffect(() => {
    if (!show) return
    const removeTime = showUndo ? 5000 : 3500
    const removeTimer = setTimeout(unmount, removeTime)
    return () => clearTimeout(removeTimer)
  }, [show, showUndo, remove])

  useEffect(() => {
    mount()
  }, [])

  const handleUndo = () => {
    dispatch(mutationUnDelete(ids, deletedItemPosition, previousStatus))
    remove()
  }

  return (
    <Fade show={show} remove={remove}>
      <div className={toastWrapper}>
        <div className={cx('toastBlock', `${type}`)} data-cy={messages[typeForMessage]}>
          <p>{messages[typeForMessage]}</p>
          <div className="actionWrapper">
            {showUndo ? (
              <button onClick={handleUndo} className="text">
                {t('toast:undo', 'Undo')}
              </button>
            ) : (
              <IconToShow />
            )}
          </div>
        </div>
      </div>
    </Fade>
  )
}


