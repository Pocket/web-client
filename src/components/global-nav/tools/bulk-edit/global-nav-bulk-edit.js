import { useEffect } from 'react'
import { css, cx } from 'linaria'

import { CrossIcon } from '@pocket/web-ui'

import { ArchiveIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { DeleteIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { FavoriteFilledIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { bottomTooltip } from 'components/tooltip/tooltip'

import { Trans, useTranslation } from 'common/setup/i18n'
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

const CloseLabel = ({ children }) => (
  <span className={closeLabelStyle}>{children}</span>
)

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
  return (
    <button className={`${buttonStyle} cancel-button`} onClick={onClick}>
      <CrossIcon className={navIconStyle} />
      <CloseLabel>
        <Trans i18nKey="nav:cancel">Cancel</Trans>
      </CloseLabel>
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
  clearBulkItems,
  bulkItemsCount
}) {
  const { t } = useTranslation()

  const shouldFavorite = batchFavorite === 'favorite'
  const shouldArchive = batchStatus === 'archive'
  const clearAction = bulkItemsCount >= 1 ? clearBulkItems : onClose
  const clearCopy =
    bulkItemsCount >= 1
      ? t('nav:clear-copy', 'Clear')
      : t('nav:cancel-copy', 'Cancel')

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
              className={cx(buttonStyle, bottomTooltip)}
              onClick={tagAction}>
              <TagIcon className={bulkIconActions} />
            </button>

            <button
              aria-label={
                shouldFavorite
                  ? t('nav:favorite', 'Favorite')
                  : t('nav:unfavorite', 'Unfavorite')
              }
              data-tooltip={
                shouldFavorite
                  ? t('nav:favorite', 'Favorite')
                  : t('nav:unfavorite', 'Unfavorite')
              }
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
                shouldArchive
                  ? t('nav:archive-tooltip', 'Archive')
                  : t('nav:add-tooltip', 'Add')
              }
              data-tooltip={
                shouldArchive
                  ? t('nav:archive-tooltip', 'Archive')
                  : t('nav:add-tooltip', 'Add')
              }
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
              className={cx(buttonStyle, bottomTooltip)}
              onClick={deleteAction}>
              <DeleteIcon className={bulkIconActions} />
            </button>

            <div className="labelText">
              {bulkItemsCount ? (
                `${bulkItemsCount} item${bulkItemsCount > 1 ? 's' : ''}` // needs additional translation help
              ) : (
                <Trans i18nKey="nav:select-items">Select Items</Trans>
              )}
            </div>
          </div>
        </div>
        <button
          className="bulk-button"
          onClick={clearAction}
          data-cy="clear-button">
          {clearCopy}
        </button>
        {onClose ? (
          <CloseButton onClick={onClose} data-cy="add-close" />
        ) : null}
      </div>
    </div>
  )
}

export default GlobalNavBulkEdit
