import { useEffect } from 'react'
import { css } from '@emotion/css'

import { CrossIcon } from '@ui/icons/CrossIcon'

import { ArchiveIcon } from '@ui/icons/ArchiveIcon'
import { AddIcon } from '@ui/icons/AddIcon'
import { ListAddIcon } from '@ui/icons/ListAddIcon'
import { DeleteIcon } from '@ui/icons/DeleteIcon'
import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { FavoriteFilledIcon } from '@ui/icons/FavoriteFilledIcon'
import { TagIcon } from '@ui/icons/TagIcon'
import { breakpointTinyTablet } from 'common/constants'

import { useTranslation } from 'next-i18next'
import Mousetrap from 'mousetrap'

const bulkStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  button {
    font-size: 1.125rem;
  }

  .bulk-container {
    width: 100%;
    display: flex;
  }

  .bulk-actions {
    display: flex;
    align-items: center;
    align-content: center;
    font-style: normal;

    button {
      margin-right: 2px;
    }
    .labelText {
      padding-left: 1rem;
      ${breakpointTinyTablet} {
        display: none;
      }
    }
  }

  ${breakpointTinyTablet} {
    .cancel-button {
      display: none;
    }
  }
`

const closeLabelStyle = css`
  display: none;
  font-size: 0.85rem;
  color: var(--color-textSecondary);
`

const CloseLabel = ({ children }) => <span className={closeLabelStyle}>{children}</span>
const CloseButton = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <button className={`cancel-button action`} onClick={onClick} data-testid="bulk-close">
      <CrossIcon />
      <CloseLabel>{t('nav:cancel', 'Cancel')}</CloseLabel>
    </button>
  )
}

const bulkContainerStyle = css`
  display: inline-flex;
  position: relative;
  align-items: center;
  flex: 1;
`

function GlobalNavBulkEdit({
  onClose,
  batchFavorite,
  batchStatus,
  tagAction,
  favoriteAction,
  archiveAction,
  deleteAction,
  addToListAction,
  clearBulkItems,
  bulkItemsCount
}) {
  const { t } = useTranslation()

  const shouldFavorite = batchFavorite === 'favorite'
  const shouldArchive = batchStatus === 'archive'
  const clearAction = bulkItemsCount >= 1 ? clearBulkItems : onClose
  const clearCopy =
    bulkItemsCount >= 1 ? t('nav:clear-copy', 'Clear') : t('nav:cancel-copy', 'Cancel')

  useEffect(() => {
    Mousetrap.bind('esc', clearAction)
    return () => Mousetrap.unbind('esc')
  }, [clearAction])

  return (
    <div className={bulkStyle}>
      <div className={bulkContainerStyle}>
        <div className="bulk-container">
          <div className="bulk-actions">
            <button
              aria-label={t('nav:tag', 'Tag')}
              data-tooltip={t('nav:tag', 'Tag')}
              data-tooltip-position="bottom"
              data-testid="bulk-tag"
              className="action"
              onClick={tagAction}>
              <TagIcon />
            </button>

            <button
              aria-label={
                shouldFavorite ? t('nav:favorite', 'Favorite') : t('nav:unfavorite', 'Unfavorite')
              }
              data-tooltip={
                shouldFavorite ? t('nav:favorite', 'Favorite') : t('nav:unfavorite', 'Unfavorite')
              }
              data-tooltip-position="bottom"
              data-testid="bulk-favorite"
              className="action"
              onClick={favoriteAction}>
              {shouldFavorite ? <FavoriteIcon /> : <FavoriteFilledIcon />}
            </button>

            <button
              aria-label={
                shouldArchive ? t('nav:archive-tooltip', 'Archive') : t('nav:add-tooltip', 'Add')
              }
              data-tooltip={
                shouldArchive ? t('nav:archive-tooltip', 'Archive') : t('nav:add-tooltip', 'Add')
              }
              data-tooltip-position="bottom"
              data-testid="bulk-archive"
              className="action"
              onClick={archiveAction}>
              {shouldArchive ? <ArchiveIcon /> : <AddIcon />}
            </button>

            <button
              aria-label={t('nav:delete', 'Delete')}
              data-tooltip={t('nav:delete', 'Delete')}
              data-tooltip-position="bottom"
              data-testid="bulk-delete"
              className="action"
              onClick={deleteAction}>
              <DeleteIcon />
            </button>

            <button
              aria-label={t('list:add-items-to-a-list', 'Add items to a List')}
              data-tooltip={t('list:add-items-to-a-list', 'Add items to a List')}
              data-tooltip-position="bottom"
              data-testid="bulk-add-to-list-mobile"
              className={'action'}
              onClick={addToListAction}>
              <ListAddIcon />
            </button>

            <div className="labelText">
              {bulkItemsCount
                ? t('nav:item-count', '{{count}} items', { count: bulkItemsCount })
                : t('nav:select-items', 'Select Items')}
            </div>
          </div>
        </div>
        <button
          className="bulk-cancel outline small"
          onClick={clearAction}
          data-testid="clear-button">
          {clearCopy}
        </button>
        {onClose ? <CloseButton onClick={onClose} data-testid="add-close" /> : null}
      </div>
    </div>
  )
}

export default GlobalNavBulkEdit
