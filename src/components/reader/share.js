import React, { useRef } from 'react'
import { css } from 'linaria'
import {
  ArrowLeftIcon,
  HighlightIcon,
  IosShareIcon,
  TagIcon,
  FavoriteIcon,
  ArchiveIcon,
  DeleteIcon,
  WithTooltip
} from '@pocket/web-ui'
import { ShareMenu } from 'components/share-menu/share-menu'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'
import { usePopover } from 'components/popover/popover'

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

export const ShareArticle = ({
  appRootSelector,
  toggleSidebar,
  shareItem,
  shareData,
  isPremium
}) => {
  const shareTriggerRef = useRef(null)
  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({
    placement: 'top-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleShare = (destination) => {
    shareItem({ destination })
  }

  return (
    <div className={shareStyles}>
      <WithTooltip label="Share Article">
        <button
          className={classNames(buttonReset, buttonStyles)}
          onClick={handleClick}
          ref={popTrigger}>
          <IosShareIcon />
        </button>
      </WithTooltip>
      {shown ? (
        <ShareMenu
          isPremium={isPremium}
          popoverRef={popBody}
          shareItem={handleShare}
          {...shareData}
        />
      ) : null}
    </div>
  )
}
