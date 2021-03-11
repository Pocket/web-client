import React, { useState, useRef } from 'react'
import { OverflowMenuIcon } from '@pocket/web-ui'
import { WebViewIcon } from '@pocket/web-ui'
import { IosShareIcon } from '@pocket/web-ui'
import { PermanentCopyIcon } from '@pocket/web-ui'
import { LinkCopyIcon } from '@pocket/web-ui'
import { css } from 'linaria'
import { buttonReset } from 'components/buttons/button-reset'
import { overlayBase } from 'components/overlay/overlay'
import classNames from 'classnames'
import { Trans, useTranslation } from 'common/setup/i18n'
import { urlWithPermanentLibrary } from 'common/utilities'
import { urlWithPocketRedirect } from 'common/utilities'
import { useViewport } from '@pocket/web-ui'
import { PopupMenu, PopupMenuGroup, PopupMenuItem } from '@pocket/web-ui'
import { screenLargeHandset, screenLargeTablet } from '@pocket/web-ui'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { topTooltipDelayed } from 'components/tooltip/tooltip'
import { KEYS } from 'common/constants'

const relativeWrapper = css`
  position: relative;
  width: 100%;
  text-align: right;
  padding-left: var(--spacing050);
`

const buttonStyles = css`
  background-color: transparent;
  color: var(--color-textSecondary);
  font-size: var(--size150);
  padding: var(--size025) var(--size050);

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-canvas);
    color: var(--color-textLinkHover);
    cursor: pointer;
  }

  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }

  .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    font-size: var(--size150);
    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
    }
  }
`

const menuWrapper = css`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: var(--zIndexTooltip);

  &.flipDirection {
    top: 0;
    bottom: unset;
  }
`

const menuContainer = css`
  min-width: 200px;
  list-style-type: none;
  padding-left: 0;

  & > li {
    padding: 0;
  }

  button,
  a {
    color: var(--color-textPrimary);
  }
`

export const ItemMenu = ({
  openId,
  openUrl,
  itemShare,
  itemCopy,
  itemOriginalOpen,
  itemPermLibOpen,
  isPremium,
  title
}) => {
  const { t } = useTranslation()
  const viewport = useViewport()

  const [menuOpen, setMenuOpen] = useState(false)
  const [flipDirection, setFlipDirection] = useState(false)
  const [focus, setFocus] = useState(false)

  const viewportWidth = viewport ? viewport.width : screenLargeTablet + 1
  const viewportHeight = viewport ? viewport.height : 800
  const [isMobile, setIsMobile] = useState(viewportWidth <= screenLargeHandset)

  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  // effect for handling window resize
  useCorrectEffect(() => {
    setIsMobile(viewportWidth <= screenLargeHandset)
  }, [viewportWidth])

  useCorrectEffect(() => {
    if (!focus || !menuOpen) return
    menuRef.current.querySelector('li button').focus()
    menuRef.current.addEventListener('focusout', checkInnerFocus)

    return () => {
      menuRef.current.removeEventListener('focusout', checkInnerFocus)
    }
  }, [focus, menuOpen])

  const checkInnerFocus = () => {
    if (menuRef.current.querySelectorAll(':focus-within').length === 0) {
      closeMenu()
    }
  }

  const checkDirection = () => {
    if (buttonRef.current.getBoundingClientRect().top > viewportHeight / 2) {
      setFlipDirection(false)
    } else {
      setFlipDirection(true)
    }
  }

  const updateFocus = (e) => {
    if (e.charCode === KEYS.SPACE || e.charCode === KEYS.ENTER) setFocus(true)
  }

  const openMenu = () => {
    checkDirection()
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setFocus(false)
  }

  return (
    <div className={`${relativeWrapper} item-menu`} ref={menuRef}>
      <button
        ref={buttonRef}
        aria-label={t('item-action:open-menu', 'Open Menu')}
        data-tooltip={t('item-action:open-menu', 'Open Menu')}
        className={classNames(buttonReset, buttonStyles, topTooltipDelayed)}
        onClick={openMenu}
        onKeyPress={updateFocus}>
        <OverflowMenuIcon />
      </button>

      {menuOpen && !isMobile ? (
        <div
          onMouseLeave={closeMenu}
          className={classNames(menuWrapper, { flipDirection })}>
          <ul className={classNames(overlayBase, menuContainer)}>
            <PopupMenuGroup>
              <PopupMenuItem onClick={itemShare} icon={<IosShareIcon />}>
                <Trans i18nKey="item-action:share">Share</Trans>
              </PopupMenuItem>
              <PopupMenuItem onClick={itemCopy} icon={<LinkCopyIcon />}>
                <Trans i18nKey="item-action:copy-link">Copy Link</Trans>
              </PopupMenuItem>
              <PopupMenuItem
                target="_blank"
                onClick={itemOriginalOpen}
                href={urlWithPocketRedirect(openUrl)}
                icon={<WebViewIcon />}>
                <Trans i18nKey="item-action:view-original">View Original</Trans>
              </PopupMenuItem>
              {isPremium ? (
                <PopupMenuItem
                  target="_blank"
                  onClick={itemPermLibOpen}
                  href={urlWithPermanentLibrary(openId)}
                  icon={<PermanentCopyIcon />}>
                  <Trans i18nKey="item-action:permanent-copy">
                    Permanent Copy
                  </Trans>
                </PopupMenuItem>
              ) : null}
            </PopupMenuGroup>
          </ul>
        </div>
      ) : null}

      {isMobile ? (
        <PopupMenu
          trigger={buttonRef}
          title={title}
          screenReaderLabel={title}
          appRootSelector="#__next"
          onOpen={openMenu}
          onClose={closeMenu}
          popperOptions={{
            placement: 'bottom-end',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 4]
                }
              }
            ]
          }}>
          <PopupMenuGroup>
            <PopupMenuItem onClick={itemShare} icon={<IosShareIcon />}>
              <Trans i18nKey="item-action:share">Share</Trans>
            </PopupMenuItem>
            <PopupMenuItem onClick={itemCopy} icon={<LinkCopyIcon />}>
              <Trans i18nKey="item-action:copy-link">Copy Link</Trans>
            </PopupMenuItem>
            <PopupMenuItem
              target="_blank"
              href={urlWithPocketRedirect(openUrl)}
              icon={<WebViewIcon />}>
              <Trans i18nKey="item-action:view-original">View Original</Trans>
            </PopupMenuItem>
            {isPremium ? (
              <PopupMenuItem
                target="_blank"
                href={urlWithPermanentLibrary(openId)}
                icon={<PermanentCopyIcon />}>
                <Trans i18nKey="item-action:permanent-copy">
                  Permanent Copy
                </Trans>
              </PopupMenuItem>
            ) : null}
          </PopupMenuGroup>
        </PopupMenu>
      ) : null}
    </div>
  )
}
