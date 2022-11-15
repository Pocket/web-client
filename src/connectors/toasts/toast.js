import React, { useEffect, useCallback, useState } from 'react'
import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'

import { Fade } from 'common/utilities/animation/fade'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { Trans, useTranslation } from 'next-i18next'
import { mutationUnDelete } from 'connectors/items/mutation-delete.state'

import { MUTATION_DELETE_SUCCESS } from 'actions'

import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_TAGGING } from 'actions'
import { MUTATION_UPSERT } from 'actions'

import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_DELETE_FAILURE } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_FAILURE } from 'actions'

import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_FAILURE } from 'actions'

import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_FAVORITE_FAILURE } from 'actions'

import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_FAILURE } from 'actions'

import { ITEMS_SHARE_SUCCESS } from 'actions'
import { ITEMS_SHARE_FAILURE } from 'actions'
import { SHARE_RECOMMEND_SUCCESS } from 'actions'
import { SHARE_RECOMMEND_FAILURE } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { PROFILE_ITEM_SAVE_SUCCESS } from 'actions'
import { PROFILE_ITEM_SAVE_FAILURE } from 'actions'

import { PROFILE_ITEM_DELETE_SUCCESS } from 'actions'
import { PROFILE_ITEM_DELETE_FAILURE } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

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

const messages = {
  [ITEMS_DELETE_SUCCESS]: 'deleted',
  [ITEMS_DELETE_FAILURE]: 'error-deleting',
  [MUTATION_DELETE_SUCCESS]: 'added',
  [MUTATION_DELETE_SUCCESS]: 'deleted',
  [ITEMS_DELETE_FAILURE]: 'error-deleting',
  [ITEMS_ADD_SUCCESS]: 'added',
  [ITEMS_ARCHIVE_SUCCESS]: 'archived',
  [ITEMS_ARCHIVE_FAILURE]: 'error-archiving',
  [ITEMS_UNARCHIVE_SUCCESS]: 'added',
  [ITEMS_UNARCHIVE_FAILURE]: 'error-adding',
  [ITEMS_FAVORITE_SUCCESS]: 'added-to-favorites',
  [ITEMS_FAVORITE_FAILURE]: 'error-adding-to-favorites',
  [ITEMS_UNFAVORITE_SUCCESS]: 'removed-from-favorites',
  [ITEMS_UNFAVORITE_FAILURE]: 'error-removing-from-favorites',
  [ITEMS_SHARE_SUCCESS]: 'shared',
  [ITEMS_SHARE_FAILURE]: 'error-sharing',
  [SHARE_RECOMMEND_SUCCESS]: 'shared',
  [SHARE_RECOMMEND_FAILURE]: 'error-sharing',
  [ITEMS_TAG_SUCCESS]: 'tagged',
  [ITEMS_TAG_FAILURE]: 'error-tagging',
  [ADD_SHARE_SUCCESS]: 'added',
  [ADD_SHARE_FAILURE]: 'error-adding',
  [PROFILE_ITEM_SAVE_SUCCESS]: 'added',
  [PROFILE_ITEM_SAVE_FAILURE]: 'error-adding',
  [PROFILE_ITEM_DELETE_SUCCESS]: 'deleted',
  [PROFILE_ITEM_DELETE_FAILURE]: 'error-deleting',
  [COPY_ITEM_URL]: 'url-copied',
  [COLLECTIONS_SAVE_SUCCESS]: 'added',
  [COLLECTION_PAGE_SAVE_SUCCESS]: 'added',
  [DISCOVER_ITEMS_SAVE_SUCCESS]: 'added',
  [ARTICLE_SAVE_SUCCESS]: 'added',
  [MUTATION_TAGGING]: 'tagged',
  [MUTATION_ARCHIVE]: 'archived',
  [MUTATION_UNARCHIVE]: 'added',
  [MUTATION_FAVORITE]: 'added-to-favorites',
  [MUTATION_UNFAVORITE]: 'removed-from-favorites',
  [MUTATION_UPSERT]: 'added'
}

const errors = [
  ITEMS_DELETE_FAILURE,
  ITEMS_DELETE_FAILURE,
  ITEMS_ARCHIVE_FAILURE,
  ITEMS_UNARCHIVE_FAILURE,
  ITEMS_FAVORITE_FAILURE,
  ITEMS_UNFAVORITE_FAILURE,
  ITEMS_SHARE_FAILURE,
  SHARE_RECOMMEND_FAILURE,
  ITEMS_TAG_FAILURE,
  ADD_SHARE_FAILURE,
  PROFILE_ITEM_SAVE_FAILURE,
  PROFILE_ITEM_DELETE_FAILURE
]

export function Toast({ stamp, type, ids, actionType, deletedItemPosition, itemCount = 1 }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [stamp, dispatch])

  const typeForMessage = actionType || type
  const showUndo = type === MUTATION_DELETE_SUCCESS
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
    dispatch(mutationUnDelete(ids, deletedItemPosition))
    remove()
  }

  return (
    <Fade show={show} remove={remove}>
      <div className={toastWrapper}>
        <div className={cx('toastBlock', `${type}`)} data-cy={messages[typeForMessage]}>
          <div>
            <Trans i18nKey={messages[typeForMessage]} count={itemCount} />
          </div>
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

// t('deleted', '{{count}} item deleted')
// t('deleted_plural', '{{count}} items deleted')
// t('error-deleting', 'Error deleting item')
// t('error-deleting_plural', 'Error deleting items')

// t('added', '{{count}} item added')
// t('added_plural', '{{count}} items added')
// t('error-adding', 'Error adding item')
// t('error-adding_plural', 'Error adding items')

// t('archived', '{{count}} item archived')
// t('archived_plural', '{{count}} items archived')
// t('error-archiving', 'Error archiving item')
// t('error-archiving_plural', 'Error archiving items')

// t('added-to-favorites', '{{count}} item added to favorites')
// t('added-to-favorites_plural', '{{count}} items added to favorites')
// t('error-adding-to-favorites', 'Error adding to favorites')

// t('removed-from-favorites', '{{count}} item removed from favorites')
// t('removed-from-favorites_plural', '{{count}} items removed from favorites')
// t('error-removing-from-favorites', 'Error removing from favorites')

// t('shared', '{{count}} item shared')
// t('shared_plural', '{{count}} items shared')
// t('error-sharing', 'Error sharing item')
// t('error-sharing_plural', 'Error sharing items')

// t('tagged', '{{count}} item tagged')
// t('tagged_plural', '{{count}} items tagged')
// t('error-tagging', 'Error tagging item')
// t('error-tagging_plural', 'Error tagging items')

// t('url-copied' 'URL copied')
