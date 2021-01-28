import React, { useState, useRef } from 'react'
import { WithTooltip } from '@pocket/web-ui'
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
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
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
  isPremium,
  title
}) => {
  const { t } = useTranslation()
  const viewport = useViewport()

  const [menuOpen, setMenuOpen] = useState(false)
  const [flipDirection, setFlipDirection] = useState(false)

  const viewportWidth = viewport ? viewport.width : screenLargeTablet + 1
  const viewportHeight = viewport ? viewport.height : 800
  const [isMobile, setIsMobile] = useState(viewportWidth <= screenLargeHandset)

  const selfRef = useRef(null)

  // effect for handling window resize
  useCorrectEffect(() => {
    setIsMobile(viewportWidth <= screenLargeHandset)
  }, [viewportWidth])

  const checkDirection = () => {
    if (selfRef.current.getBoundingClientRect().top > viewportHeight / 2) {
      setFlipDirection(false)
    } else {
      setFlipDirection(true)
    }
  }

  const openMenu = () => {
    checkDirection()
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className={`${relativeWrapper} item-menu`}>
      <WithTooltip label={t('item-action:open-menu', 'Open Menu')}>
        <button
          ref={selfRef}
          aria-label={t('item-action:open-menu', 'Open Menu')}
          className={classNames(buttonReset, buttonStyles)}
          onClick={openMenu}>
          <OverflowMenuIcon />
        </button>
      </WithTooltip>

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
          </ul>
        </div>
      ) : null}

      {isMobile ? (
        <PopupMenu
          trigger={selfRef}
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
