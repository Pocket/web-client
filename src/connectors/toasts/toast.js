import React, { useEffect, useCallback, useState } from 'react'
import { css, cx } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@pocket/web-ui'
import { Fade } from 'common/utilities/animation/fade'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { Trans } from 'react-i18next'

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
  if (!count) return null
  if (count > 1) return `${count} items`
  return '1 item'
}

const messages = {
  [ITEMS_DELETE_SUCCESS]: <Trans>deleted</Trans>,
  [ITEMS_DELETE_FAILURE]: <Trans>error deleting</Trans>,
  [ITEMS_ADD_SUCCESS]: <Trans>added</Trans>,
  [ITEMS_ARCHIVE_SUCCESS]: <Trans>archived</Trans>,
  [ITEMS_ARCHIVE_FAILURE]: <Trans>error archiving</Trans>,
  [ITEMS_UNARCHIVE_SUCCESS]: <Trans>added</Trans>,
  [ITEMS_UNARCHIVE_FAILURE]: <Trans>error adding</Trans>,
  [ITEMS_FAVORITE_SUCCESS]: <Trans>added to favorites</Trans>,
  [ITEMS_FAVORITE_FAILURE]: <Trans>error adding to favorites:</Trans>,
  [ITEMS_UNFAVORITE_SUCCESS]: <Trans>removed from favorites</Trans>,
  [ITEMS_UNFAVORITE_FAILURE]: <Trans>error removing from favorites:</Trans>,
  [ITEMS_SHARE_SUCCESS]: <Trans>shared</Trans>,
  [ITEMS_SHARE_FAILURE]: <Trans>error sharing</Trans>,
  [ITEMS_TAG_SUCCESS]: <Trans>tagged</Trans>,
  [ITEMS_TAG_FAILURE]: <Trans>error tagging</Trans>,
  [ADD_SHARE_SUCCESS]: <Trans>Item added</Trans>,
  [ADD_SHARE_FAILURE]: <Trans>Error adding item</Trans>,
  [COPY_ITEM_URL]: <Trans>URL copie</Trans>
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
