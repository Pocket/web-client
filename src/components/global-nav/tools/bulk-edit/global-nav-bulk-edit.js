import { css, cx } from 'linaria'

import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { CrossIcon } from '@pocket/web-ui'
import { ArchiveIcon, DeleteIcon, FavoriteIcon, TagIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'

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
    div {
      padding-left: var(--spacing100);
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

    ${breakpointMediumHandset} {
      display: none;
    }
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

const closeIconStyle = css`
  width: 20px;
  height: 20px;

  ${breakpointMediumHandset} {
    display: none;
  }
`

const closeLabelStyle = css`
  display: none;
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize085);
  color: var(--color-textSecondary);

  ${breakpointMediumHandset} {
    display: inline-block;
    height: auto;
  }
`

const CloseLabel = ({ children }) => (
  <span className={closeLabelStyle}>{children}</span>
)

const buttonStyle = css`
  margin-left: auto;
  background-color: transparent;
  color: var(--color-actionSecondary);

  &:hover {
    cursor: pointer;
    background-color: transparent;
    color: var(--color-actionSecondaryHover);

    span {
      color: var(--color-textPrimary);
    }
  }
`

const CloseButton = ({ onClick }) => {
  return (
    <button className={buttonStyle} onClick={onClick}>
      <CrossIcon className={closeIconStyle} />
      <CloseLabel>Cancel</CloseLabel>
    </button>
  )
}

const bulkContainerStyle = css`
  display: inline-flex;
  position: relative;
  align-items: center;
  flex: 1;
`

function GlobalNavBulkEdit({ onClose, clearBulkItems, bulkItemsCount }) {
  return (
    <div className={bulkStyle}>
      <div className={bulkContainerStyle}>
        <div className="bulk-container">
          <div className="bulk-actions">
            <button className={buttonStyle}>
              <TagIcon className={bulkIconActions} />
            </button>
            <button className={buttonStyle}>
              <FavoriteIcon className={bulkIconActions} />
            </button>
            <button className={buttonStyle}>
              <ArchiveIcon className={bulkIconActions} />
            </button>
            <button className={buttonStyle}>
              <DeleteIcon className={bulkIconActions} />
            </button>
            <div>
              {bulkItemsCount
                ? `${bulkItemsCount} item${
                    bulkItemsCount > 1 ? 's' : ''
                  } selected`
                : 'Select items to edit'}
            </div>
          </div>
        </div>
        <button
          className="bulk-button"
          onClick={clearBulkItems}
          {...testIdAttribute('clear-button')}>
          Clear
        </button>
        {onClose ? (
          <CloseButton onClick={onClose} {...testIdAttribute('add-close')} />
        ) : null}
      </div>
    </div>
  )
}

export default GlobalNavBulkEdit
