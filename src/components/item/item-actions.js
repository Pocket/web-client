import { css, cx } from 'linaria'
import { useTranslation } from 'next-i18next'
import { OverflowAction } from 'components/item-actions/overflow'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { topTooltip } from 'components/tooltip/tooltip'

import { DeleteIcon } from 'components/icons/DeleteIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { AddIcon } from 'components/icons/AddIcon'
import { PermanentCopyIcon } from 'components/icons/PermanentCopyIcon'

import { breakpointSmallTablet } from 'common/constants'

export const sharedActionStyles = css`
  text-align: right;

  button {
    display: inline-flex;
    align-content: center;
    align-items: center;
    background-color: var(--color-canvas);
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-actionSecondary);
    padding: 0.25rem;
    margin-right: 0.5rem;

    ${breakpointSmallTablet} {
      // might need to tweak this breakpoint when we apply this to the items in app
      margin-right: 0.5rem;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`

export const savedActionStyles = css`
  button {
    .icon {
      color: var(--color-textSecondary);
      margin-top: 0;

      &.active {
        color: var(--color-amber);
      }
    }
  }
`

export const discoveryActionStyles = css`
  button {
    .copy {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    .saveIcon {
      color: var(--color-actionBrand);
      display: inline-block;
      margin-top: 0;
    }
  }
`

export function SavedActions({ saveStatus, isFavorite, isArchive, isPremium }) {
  const { t } = useTranslation()
  const archiveLabel = isArchive
    ? t('item-action:re-add', 'Re-add to Saves')
    : t('item-action:archive', 'Archive')
  const favoriteLabel = isFavorite
    ? t('item-action:unfavorite', 'Un-Favorite')
    : t('item-action:favorite', 'Favorite')

  const savedClasses = cx(sharedActionStyles, savedActionStyles)

  return (
    <div className={`${savedClasses} status-${saveStatus}`}>
      <button
        className={topTooltip}
        data-tooltip={favoriteLabel}
        aria-label={favoriteLabel}
        data-cy={favoriteLabel}
        onClick={() => {}}>
        <FavoriteIcon className={isFavorite && 'active'} />
      </button>

      <button
        className={topTooltip}
        data-tooltip={archiveLabel}
        aria-label={archiveLabel}
        data-cy={archiveLabel}
        onClick={() => {}}>
        {isArchive ? <AddIcon /> : <ArchiveIcon />}
      </button>

      <OverflowAction
        menuItems={[
          {
            label: t('item-action:tag', 'Tag'),
            icon: <TagIcon />,
            onClick: () => {}
          },
          {
            label: t('item-action:share', 'Share'),
            icon: <IosShareIcon />,
            onClick: () => {}
          },
          {
            label: t('item-action:delete', 'Delete'),
            icon: <DeleteIcon />,
            onClick: () => {}
          },
          {
            label: t('item-action:permanent-copy', 'Permanent Copy'),
            hide: !isPremium,
            icon: <PermanentCopyIcon />,
            onClick: () => {}
          }
        ]}
      />
    </div>
  )
}

export function DiscoveryActions({ onSave, onUnsave, saveStatus }) {
  const discoveryClasses = cx(sharedActionStyles, discoveryActionStyles)

  return (
    <div className={`${discoveryClasses} status-${saveStatus}`}>
      {saveStatus === 'saved' ? (
        <button className="save-action saved" onClick={onUnsave}>
          <SaveFilledIcon className="saveIcon" />
          <span className="copy">Saved</span>
        </button>
      ) : (
        <button className="save-action save" onClick={onSave}>
          <SaveIcon className="saveIcon" />
          <span className="copy">Save</span>
        </button>
      )}
    </div>
  )
}
