import React, { useState, useRef } from 'react'
import { PopupMenuGroup } from '@pocket/web-ui'
import { PopupMenuItem } from '@pocket/web-ui'
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

  button, a {
    color: var(--color-textTertiary);
  }
`

export const ItemMenu = ({ openId, openUrl, itemShare, itemCopy, isPremium }) => {
  const { t } = useTranslation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [flipDirection, setFlipDirection] = useState(false)

  const selfRef = useRef(null)

  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  const checkDirection = () => {
    if (selfRef.current.getBoundingClientRect().top > screenHeight / 2) {
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
    <div className={relativeWrapper}>
      <WithTooltip
        label={t('item-action:open-menu', 'Open Menu')}>
        <button
          ref={selfRef}
          aria-label={t('item-action:open-menu', 'Open Menu')}
          className={classNames(buttonReset, buttonStyles)}
          onClick={openMenu}>
          <OverflowMenuIcon />
        </button>
      </WithTooltip>

      {menuOpen ? (
        <div
          onMouseLeave={closeMenu}
          className={classNames(menuWrapper, { flipDirection })}>
          <ul className={classNames(overlayBase, menuContainer)}>
            <PopupMenuGroup>
              <PopupMenuItem
                onClick={itemShare}
                icon={<IosShareIcon />}>
                <Trans i18nKey="item-action:share">Share</Trans>
              </PopupMenuItem>
              <PopupMenuItem
                onClick={itemCopy}
                icon={<LinkCopyIcon />}>
                <Trans i18nKey="item-action:copy-link">Copy Link</Trans>
              </PopupMenuItem>
              <PopupMenuItem
                target="_blank"
                href={urlWithPocketRedirect(openUrl)}
                icon={<WebViewIcon />}>
                <Trans i18nKey="item-action:view-original">View Original</Trans>
              </PopupMenuItem>
              { isPremium ? (
                <PopupMenuItem
                  target="_blank"
                  href={urlWithPermanentLibrary(openId)}
                  icon={<PermanentCopyIcon />}>
                  <Trans i18nKey="item-action:permanent-copy">Permanent Copy</Trans>
                </PopupMenuItem>
              ) : null}
            </PopupMenuGroup>
          </ul>
        </div>
      ) : null}
    </div>
  )
}
