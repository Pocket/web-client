import { css } from 'linaria'
import { useTranslation } from 'next-i18next'
import { OverflowAction } from 'components/item-actions/overflow'
import { LikeIcon } from 'components/icons/LikeIcon'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { LikeFilledIcon } from 'components/icons/LikeFilledIcon'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { topTooltip } from 'components/tooltip/tooltip'

import { DeleteIcon } from 'components/icons/DeleteIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { AddIcon } from 'components/icons/AddIcon'
import { PermanentCopyIcon } from 'components/icons/PermanentCopyIcon'

export const nextActionStyle = css`
  @keyframes pulse {
    0% {
      transform: 0;
      opacity: 1;
    }
    20% {
      transform: scale(90%);
      opactiy: 0.2;
    }
    70% {
      transform: scale(180%);
      opacity: 0.5;
    }
    100% {
      opacity: 1;
      transform: 0;
    }
  }
  text-align: right;

  button {
    display: inline-flex;
    align-content: center;
    align-items: center;
    background-color: var(--color-canvas);
    box-sizing: content-box;
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-actionSecondary);
    padding: 0.25rem;

    .active {
      color: var(--color-amber);
    }

    span.copy {
      font-size: 1rem;
      margin: 0 0.5rem;
    }

    &:active,
    &:focus {
      outline: none;
      border: none;
      box-shadow: none;
    }

    &:hover {
      color: var(--color-actionSecondaryHover);
      span.copy {
        color: var(--color-actionBrand);
      }
    }
    .saveIcon {
      display: inline-block;
    }
    .likeIcon {
      display: none;
    }

    &:hover {
      .saveIcon {
        display: none;
      }
      .likeIcon {
        display: inline-block;
      }
    }

    &:active {
      .likeIcon {
        animation: 1000ms pulse;
      }
    }

    span {
      margin-top: 0;
    }

    &.save-action {
      margin-right: 0.25rem;
      .icon {
        color: var(--color-actionBrand);
        transform: translateY(1px);
      }
    }
  }

  &.status-saving {
    .saveIcon {
      display: none;
    }
    .likeIcon {
      display: inline-block;
      animation: 550ms pulse;
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

  return (
    <div className={`${nextActionStyle} status-${saveStatus}`}>
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
  return (
    <div className={`${nextActionStyle} status-${saveStatus}`}>
      {saveStatus === 'saved' ? (
        <button className="save-action saved" onClick={onUnsave}>
          <SaveFilledIcon className="saveIcon" />
          <LikeFilledIcon className="likeIcon" />
          <span className="copy">Saved</span>
        </button>
      ) : (
        <button className="save-action save" onClick={onSave}>
          <SaveIcon className="saveIcon" />
          <LikeIcon className="likeIcon" />
          <span className="copy">Save</span>
        </button>
      )}
    </div>
  )
}
