import React, { useEffect, useCallback, useState } from 'react'
import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@pocket/web-ui'
import { Fade } from 'common/utilities/animation/fade'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'

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

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

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

const itemCopy = (count) => {
  if (count > 1) return `${count} items`
  return '1 item'
}

const messages = {
  [ITEMS_DELETE_SUCCESS]: 'deleted',
  [ITEMS_DELETE_FAILURE]: 'error deleting',
  [ITEMS_ADD_SUCCESS]: 'added',
  [ITEMS_ARCHIVE_SUCCESS]: 'archived',
  [ITEMS_ARCHIVE_FAILURE]: 'error archiving',
  [ITEMS_UNARCHIVE_SUCCESS]: 'added',
  [ITEMS_UNARCHIVE_FAILURE]: 'error adding',
  [ITEMS_FAVORITE_SUCCESS]: 'added to favorites',
  [ITEMS_FAVORITE_FAILURE]: 'error adding to favorites:',
  [ITEMS_UNFAVORITE_SUCCESS]: 'removed from favorites',
  [ITEMS_UNFAVORITE_FAILURE]: 'error removing from favorites:',
  [ITEMS_SHARE_SUCCESS]: 'shared',
  [ITEMS_SHARE_FAILURE]: 'error sharing',
  [ITEMS_TAG_SUCCESS]: 'tagged',
  [ITEMS_TAG_FAILURE]: 'error tagging',
  [ADD_SHARE_SUCCESS]: 'added',
  [ADD_SHARE_FAILURE]: 'error adding'
}

export function Toast({ stamp, type, itemCount }) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [
    stamp,
    dispatch
  ])

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
        <div className={cx(toastBlock, `${type}`)}>
          <div>
            {itemCopy(itemCount)} {messages[type]}
          </div>
          <button className={cx(buttonReset, closeWrapper)} onClick={unmount}>
            <CrossIcon />
          </button>
        </div>
      </div>
    </Fade>
  )
}
