import { useEffect } from 'react'
import { css, cx } from '@emotion/css'

import { CrossIcon } from 'components/icons/CrossIcon'

import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { AddIcon } from 'components/icons/AddIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { FavoriteFilledIcon } from 'components/icons/FavoriteFilledIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { breakpointMediumHandset } from 'common/constants'
import { bottomTooltip } from 'components/tooltip/tooltip'

import { useTranslation } from 'next-i18next'
import Mousetrap from 'mousetrap'

const bulkStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  .bulk-container {
    width: 100%;
    display: flex;
  }

  .bulk-actions {
    display: flex;
    align-items: center;
    align-content: center;
    font-family: 'Graphik Web';
    font-style: normal;
    font-size: var(--fontSize100);
    button {
      margin-right: 2px;
    }
    .labelText {
      padding-left: var(--spacing100);
      ${breakpointMediumHandset} {
        display: none;
      }
    }
  }

  ${breakpointMediumHandset} {
    .cancel-button {
      display: none;
    }
  }

  .bulk-input {
    /*search icon width + left margin + right margin*/
    padding-left: calc(20px + var(--spacing050) + var(--spacing075));
    height: var(--size300);
    width: 100%;
    max-width: initial;
    margin-right: var(--spacing050);
    &.has-value {
      padding-right: var(--spacing400);
    }

    ${breakpointMediumHandset} {
      padding-left: var(--spacing075);
      &.has-value {
        padding-right: 3rem;
      }
      margin-right: 0;
    }
  }

  .bulk-button {
    font-size: var(--fontSize100);
  }

  .error-message {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding-right: var(--spacing050);

    ${breakpointMediumHandset} {
      padding-right: 0;
    }

    div {
      padding: 0.5em 1em;
      background-color: var(--color-canvas);
      color: var(--color-error);
      border: var(--borderStyle);
      border-top-width: 0;
      border-radius: 0 0 var(--borderRadius) var(--borderRadius);
      box-shadow: var(--raisedCanvas);
    }
  }
`

const bulkIconActions = css`
  width: 24px;
  height: 24px;
  margin: 0;
  color: var(--color-textSecondary);
  &:hover {
    color: var(--color-textLinkHover);
    cursor: pointer;
  }
`

const navIconStyle = css`
  width: 20px;
  height: 20px;
`

const closeLabelStyle = css`
  display: none;
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize085);
  color: var(--color-textSecondary);
`

const CloseLabel = ({ children }) => <span className={closeLabelStyle}>{children}</span>

const buttonStyle = css`
  margin-left: auto;
  background-color: transparent;
  color: var(--color-actionSecondary);
  &:hover {
    color: var(--color-actionPrimary);
    background-color: transparent;
  }
  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
  &.active {
    color: var(--color-navCurrentTabText);
    background-color: var(--color-navCurrentTab);
  }

  ${breakpointMediumHandset} {
    padding-left: var(--size025);
    padding-right: var(--size025);
  }
`

const CloseButton = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <button className={`${buttonStyle} cancel-button`} onClick={onClick} data-cy="bulk-close">
      <CrossIcon className={navIconStyle} />
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
              data-cy="bulk-tag"
              className={cx(buttonStyle, bottomTooltip)}
              onClick={tagAction}>
              <TagIcon className={bulkIconActions} />
            </button>

            <button
              aria-label={
                shouldFavorite ? t('nav:favorite', 'Favorite') : t('nav:unfavorite', 'Unfavorite')
              }
              data-tooltip={
                shouldFavorite ? t('nav:favorite', 'Favorite') : t('nav:unfavorite', 'Unfavorite')
              }
              data-cy="bulk-favorite"
              className={cx(buttonStyle, bottomTooltip)}
              onClick={favoriteAction}>
              {shouldFavorite ? (
                <FavoriteIcon className={bulkIconActions} />
              ) : (
                <FavoriteFilledIcon className={bulkIconActions} />
              )}
            </button>

            <button
              aria-label={
                shouldArchive ? t('nav:archive-tooltip', 'Archive') : t('nav:add-tooltip', 'Add')
              }
              data-tooltip={
                shouldArchive ? t('nav:archive-tooltip', 'Archive') : t('nav:add-tooltip', 'Add')
              }
              data-cy="bulk-archive"
              className={cx(buttonStyle, bottomTooltip)}
              onClick={archiveAction}>
              {shouldArchive ? (
                <ArchiveIcon className={bulkIconActions} />
              ) : (
                <AddIcon className={bulkIconActions} />
              )}
            </button>

            <button
              aria-label={t('nav:delete', 'Delete')}
              data-tooltip={t('nav:delete', 'Delete')}
              data-cy="bulk-delete"
              className={cx(buttonStyle, bottomTooltip)}
              onClick={deleteAction}>
              <DeleteIcon className={bulkIconActions} />
            </button>

            <button
              aria-label={t('nav:add-to-list', 'Add to List')}
              data-tooltip={t('nav:add-to-list', 'Add to List')}
              data-cy="bulk-add-to-list"
              onClick={addToListAction}>
              {/* TODO: Icon goes here? */}
              Add to List
            </button>

            <div className="labelText">
              {bulkItemsCount
                ? t('nav:item-count', '{{count}} items', { count: bulkItemsCount })
                : t('nav:select-items', 'Select Items')}
            </div>
          </div>
        </div>
        <button className="bulk-cancel" onClick={clearAction} data-cy="clear-button">
          {clearCopy}
        </button>
        {onClose ? <CloseButton onClick={onClose} data-cy="add-close" /> : null}
      </div>
    </div>
  )
}

export default GlobalNavBulkEdit
