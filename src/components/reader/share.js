import React, { useRef } from 'react'
import { css } from 'linaria'
import {
  ArrowLeftIcon, HighlightIcon, IosShareIcon,
  TagIcon, FavoriteIcon, ArchiveIcon, DeleteIcon,
  WithTooltip, PopupMenu
} from '@pocket/web-ui'
import { ShareMenu } from 'components/share-menu/share-menu'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'

const shareStyles = css`
  display: inline-block;
`

const buttonStyles = css`
  background-color: transparent;
  color: var(--color-textSecondary);
  font-size: var(--size150);
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }
`

export const ShareArticle = ({ appRootSelector, toggleSidebar }) => {
  const shareTriggerRef = useRef(null)

  return (
    <div className={shareStyles}>
      <WithTooltip label="Share Article">
        <button
          className={classNames(buttonReset, buttonStyles)}
          ref={shareTriggerRef}>
          <IosShareIcon />
        </button>
      </WithTooltip>
      <PopupMenu
        trigger={shareTriggerRef}
        title="Share Menu"
        screenReaderLabel="Share Menu"
        appRootSelector={appRootSelector}
      >
        <ShareMenu />
      </PopupMenu>
    </div>
  )
}
