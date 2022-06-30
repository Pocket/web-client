import React, { useEffect, useCallback, useState } from 'react'
import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from 'components/icons/CrossIcon'
import { Fade } from 'common/utilities/animation/fade'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { Trans } from 'next-i18next'

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
`

const toastBlock = css`
  display: inline-grid;
  grid-template-columns: auto 16px;
  gap: 16px;
  align-content: center;
  align-items: center;
  font-weight: 500;
  line-height: 22px;
  font-size: 16px;
  font-family: 'Graphik Web';
  text-align: left;
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0 0 0;
  min-width: 275px;
  border-radius: 4px;
  background-color: var(--color-navCurrentTab);
  color: var(--color-navCurrentTabText);

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
  }
`

const closeWrapper = css`
  cursor: pointer;
  justify-self: end;
  &:hover {
    background: transparent;
  }
`

const messages = {
  [ITEMS_DELETE_SUCCESS]: 'deleted',
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
  [ARTICLE_SAVE_SUCCESS]: 'added'
}

export function Toast({ stamp, type, itemCount = 1 }) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [stamp, dispatch])

  useEffect(() => {
    if (!show) return
    const removeTimer = setTimeout(unmount, 3500)
    return () => clearTimeout(removeTimer)
  }, [show, remove])

  useEffect(() => {
    mount()
  }, [])

  return (
    <Fade show={show} remove={remove}>
      <div className={toastWrapper}>
        <div className={cx(toastBlock, `${type}`)} data-cy={messages[type]}>
          <div>
            <Trans i18nKey={messages[type]} count={itemCount} />
          </div>
          <button className={cx(buttonReset, closeWrapper)} onClick={unmount}>
            <CrossIcon />
          </button>
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
