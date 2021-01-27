import React, { useState } from 'react'
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
  min-width: 200px;
  list-style-type: none;
  padding-left: 0;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: var(--zIndexTooltip);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={relativeWrapper} onMouseLeave={toggleMenu}>
      <WithTooltip
        label={t('item-action:open-menu', 'Open Menu')}>
        <button
          aria-label={t('item-action:open-menu', 'Open Menu')}
          className={classNames(buttonReset, buttonStyles)}
          onClick={toggleMenu}>
          <OverflowMenuIcon />
        </button>
      </WithTooltip>

      {menuOpen ? (
        <ul
          className={classNames(overlayBase, menuWrapper)}>
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
                href={urlWithPermanentLibrary(openId)}
                icon={<PermanentCopyIcon />}>
                <Trans i18nKey="item-action:permanent-copy">Permanent Copy</Trans>
              </PopupMenuItem>
            ) : null}
          </PopupMenuGroup>
        </ul>
      ) : null}
    </div>
  )
}
