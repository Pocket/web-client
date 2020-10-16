import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AddIcon, CrossIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { screenMediumHandset } from '@pocket/web-ui'
import { css } from 'linaria'
import classnames from 'classnames'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

const addStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  .add-input {
    /*search icon width + left margin + right margin*/
    padding-left: calc(20px + var(--spacing050) + var(--spacing075));
    height: var(--size300);
    width: 100%;
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

  .add-button {
    font-size: var(--fontSize100);

    ${breakpointMediumHandset} {
      display: none;
    }
  }
`

const addIconStyle = css`
  width: 20px;
  height: 20px;
  position: absolute;
  left: var(--spacing075);
  transform: translateY(-50%);
  top: 50%;
  margin: 0;

  ${breakpointMediumHandset} {
    display: none;
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

const closeButtonStyle = css`
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
    <button className={closeButtonStyle} onClick={onClick}>
      <CrossIcon className={closeIconStyle} />
      <CloseLabel>Cancel</CloseLabel>
    </button>
  )
}

const clearIconStyle = css`
  width: 20px;
  height: 20px;
  display: none;

  ${breakpointMediumHandset} {
    display: inline-block;
  }
`

const clearButtonStyle = css`
  right: var(--spacing050);
  position: absolute;
  color: var(--color-textTertiary);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  padding-right: var(--spacing100);
  background-color: transparent;

  span {
    color: var(--color-textSecondary);

    &:hover {
      color: var(--color-textPrimary);
    }
  }

  &:hover {
    background-color: transparent;
  }
  ${breakpointMediumHandset} {
    .clear-label {
      display: none;
    }
    right: 0;
  }
`

const ClearButton = ({ onClick }) => {
  return (
    <button className={clearButtonStyle} onClick={onClick}>
      <span className="clear-label">Clear</span>
      <CrossIcon className={clearIconStyle} />
    </button>
  )
}

const addContainerStyle = css`
  display: inline-flex;
  position: relative;
  align-items: center;
  flex: 1;
`

/**
 * Component to expose search functionality to users in places like GlobalNav.
 */
const GlobalNavAdd = ({
  onSubmit,
  onClose,
  onFocus,
  onBlur,
  value,
  placeholder,
  mobilePlaceholder
}) => {
  const initialSearchValue = ''
  const [addUrl, updateAddUrl] = useState(value)
  const [isMobile, updateIsMobile] = useState(false)

  const handleClear = () => updateAddUrl(initialSearchValue)

  const handleInputChange = (e) => updateAddUrl(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!addUrl) return

    onSubmit(addUrl)
  }

  useEffect(() => {
    updateIsMobile(window.innerWidth < screenMediumHandset)
  }, [window.innerWidth])

  return (
    <form className={addStyle} onSubmit={handleSubmit}>
      <div className={addContainerStyle}>
        <AddIcon className={addIconStyle} />
        <input
          type="url"
          name="q"
          className={classnames(['add-input', { 'has-value': !!addUrl }])}
          aria-label="Add Item to Pocket"
          value={addUrl}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isMobile ? mobilePlaceholder : placeholder}
          {...testIdAttribute('add-input')}
        />
        {addUrl ? (
          <ClearButton
            onClick={handleClear}
            {...testIdAttribute('add-clear')}
          />
        ) : null}
      </div>
      <button
        className="add-button"
        onClick={handleSubmit}
        {...testIdAttribute('add-button')}>
        Add
      </button>
      {onClose ? (
        <CloseButton onClick={onClose} {...testIdAttribute('add-close')} />
      ) : null}
    </form>
  )
}

GlobalNavAdd.propTypes = {
  /**
   * Callback function for processing a user's search term
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback function to run when a user clicks the Close button. Close button
   * will only appear if this function is present
   */
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  /**
   * Callback function when to run when a focuses on the search input. Receives
   * the event as a parameter
   */
  onFocus: PropTypes.func,
  /**
   * Callback function when the search input loses focus. Receives the event as
   * a parameter
   */
  onBlur: PropTypes.func,
  /**
   * Current value of the text input
   */
  value: PropTypes.string,
  /**
   * Text to display as a note to the user when the user input is still empty
   */
  placeholder: PropTypes.string,
  /**
   * Text to display as a note to the user when the user input is still empty,
   * at mobile widths
   */
  mobilePlaceholder: PropTypes.string
}

GlobalNavAdd.defaultProps = {
  onClose: false,
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  placeholder: 'Save a URL https://...',
  mobilePlaceholder: 'Save a URL'
}

export default GlobalNavAdd
