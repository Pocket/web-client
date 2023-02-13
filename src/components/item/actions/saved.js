import { css } from 'linaria'
import { useTranslation } from 'next-i18next'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { topTooltip } from 'components/tooltip/tooltip'
import { OverflowMenu } from './overflow'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { AddIcon } from 'components/icons/AddIcon'
import { PermanentCopyIcon } from 'components/icons/PermanentCopyIcon'

import { breakpointSmallTablet } from 'common/constants'

export const savedActionStyles = css`
  button {
    display: inline-flex;
    align-content: center;
    align-items: center;
    background-color: var(--color-canvas);
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-actionSecondary);
    padding: 0;
    margin-right: 0.5rem;

    ${breakpointSmallTablet} {
      // might need to tweak this breakpoint when we apply this to the items in app
      margin-right: 0.5rem;
    }

    &:last-of-type {
      margin-right: 0;
    }
    .icon {
      color: var(--color-textSecondary);
      margin-top: 0;

      &.active {
        color: var(--color-amber);
      }
    }
  }
`

export function SavedActions({
  visibleCount,
  isFavorite,
  isArchived,
  isPremium,
  actionFavorite,
  actionUnFavorite,
  actionUpsert,
  actionArchive,
  actionTag,
  actionShare,
  actionDelete,
  actionPremLibOpen
}) {
  const { t } = useTranslation()
  const archiveLabel = isArchived
    ? t('item-action:re-add', 'Re-add to Saves')
    : t('item-action:archive', 'Archive')
  const favoriteLabel = isFavorite
    ? t('item-action:unfavorite', 'Un-Favorite')
    : t('item-action:favorite', 'Favorite')

  const CorrectArchiveIcon = isArchived ? AddIcon : ArchiveIcon

  const correctArchiveAction = isArchived ? actionUpsert : actionArchive
  const correctFavoriteAction = isFavorite ? actionUnFavorite : actionFavorite

  const actionTypes = {
    favorite: {
      label: favoriteLabel,
      icon: <FavoriteIcon className={isFavorite && 'active'} />,
      onClick: correctFavoriteAction
    },
    archive: {
      label: archiveLabel,
      icon: <CorrectArchiveIcon />,
      onClick: correctArchiveAction
    },
    tag: {
      label: t('item-action:tag', 'Tag'),
      icon: <TagIcon />,
      onClick: actionTag
    },
    share: {
      label: t('item-action:share', 'Share'),
      icon: <IosShareIcon />,
      onClick: actionShare
    },
    delete: {
      label: t('item-action:delete', 'Delete'),
      icon: <DeleteIcon />,
      onClick: actionDelete
    },
    permanent: {
      label: t('item-action:permanent-copy', 'Permanent Copy'),
      hide: !isPremium,
      icon: <PermanentCopyIcon />,
      onClick: actionPremLibOpen
    }
  }

  // Build open items based on item order and open count
  const visibleActions = Object.values(actionTypes).slice(0, visibleCount)
  const overflowActions = Object.values(actionTypes).slice(visibleCount, -1)

  return (
    <div className={savedActionStyles}>
      {visibleActions.length ? <VisibleAction actions={visibleActions} /> : null}
      {overflowActions.length ? <OverflowMenu menuItems={overflowActions} /> : null}
    </div>
  )
}

export function VisibleAction({ actions }) {
  return actions.map(({ label, icon, onClick }) => {
    return (
      <button
        key={label}
        className={topTooltip}
        data-tooltip={label}
        aria-label={label}
        data-cy={label}
        onClick={onClick}>
        {icon}
      </button>
    )
  })
}
