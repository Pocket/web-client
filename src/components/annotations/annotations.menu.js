import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { css } from 'linaria'
import { Trans, useTranslation } from 'react-i18next'

import { OverflowMenuIcon } from '@pocket/web-ui'
import { IosShareIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { PopupMenuGroup } from '@pocket/web-ui'
import { PopupMenuItem } from '@pocket/web-ui'

import { buttonReset } from 'components/buttons/button-reset'
import { overlayBase } from 'components/overlay/overlay'

const inlineMenuStyles = css`
  position: absolute;
`

const relativeWrapper = css`
  position: relative;

  button.inline-button {
    background: var(--color-popoverCanvas);
    color: var(--color-textSecondary);
    font-size: var(--size150);
    border-radius: 50%;
    height: 32px;
    width: 32px;
    text-align: center;
    transform: translate(-24px, -24px);
    opacity: 0;
    transition: opacity 200ms ease-in-out 600ms;

    &.floating {
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
    }

    &.visible,
    &:hover {
      opacity: 1;
      transition: opacity 150ms ease-in-out 0ms;
    }

    &:hover {
      color: var(--color-textPrimary);
      background-color: var(--color-actionPrimarySubdued);
    }
    .icon {
      vertical-align: top;
      margin-top: 3.5px;
    }
  }
`

const menuWrapper = css`
  min-width: 200px;
  list-style-type: none;
  padding-left: 0;
  transform: translate(-24px, -20px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--zIndexTooltip);

  & > li {
    padding: 0;
  }

  &.alignRight {
    left: -160px;
  }
  &.flipDirection  {
    bottom: -24px;
    top: unset;
  }
`

export const AnnotationMenu = ({
  alignRight,
  visible,
  top = 0,
  left = 0,
  shareItem,
  quote,
  id,
  deleteAnnotation,
  floating
}) => {
  const { t } = useTranslation()

  const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [flipDirection, setFlipDirection] =  useState(false)
  const selfRef = useRef(null)
  let timer

  useEffect(() => {
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startTimer = () => {
    timer = setTimeout(() => {
      setMenuOpen(false)
    }, 1000)
  }

  const checkDirection = () => {
    if (selfRef.current.getBoundingClientRect().top > screenHeight/2) {
      setFlipDirection(true)
    }
    else {
      setFlipDirection(false)
    }
  }

  const clearTimer = () => clearTimeout(timer)

  const toggleMenu = () => {
    checkDirection()
    setMenuOpen(!menuOpen)
  }

  const handleDelete = () => {
    deleteAnnotation(id)
  }

  const handleShare = () => {
    shareItem({ quote })
  }

  return (
    <div className={inlineMenuStyles} style={{ top, left }}>
      <div className={relativeWrapper}>
        <button
          aria-label={t("Open Highlights Menu")}
          ref={selfRef}
          onClick={toggleMenu}
          className={classNames(buttonReset, 'inline-button', { visible, floating })}>
          <OverflowMenuIcon />
        </button>
        {menuOpen ? (
          <ul
            onMouseEnter={clearTimer}
            onMouseLeave={startTimer}
            className={classNames(overlayBase, menuWrapper, { alignRight, flipDirection })}>
            <PopupMenuGroup>
              <PopupMenuItem onClick={handleDelete} icon={<DeleteIcon />}>
                <Trans i18nKey="delete">Delete</Trans>
              </PopupMenuItem>
              <PopupMenuItem onClick={handleShare} icon={<IosShareIcon />}>
                <Trans i18nKey="share">Share</Trans>
              </PopupMenuItem>
            </PopupMenuGroup>
          </ul>
        ) : null}
      </div>
    </div>
  )
}
