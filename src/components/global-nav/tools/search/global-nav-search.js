import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SearchIcon, CrossIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { screenMediumHandset } from '@pocket/web-ui'
import { css } from 'linaria'
import classnames from 'classnames'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

const searchStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  .search-input {
    /*search icon width + left margin + right margin*/
    padding-left: calc(20px + var(--spacing050) + var(--spacing075));
    height: var(--size300);
    width: 100%;
    margin-right: var(--spacing050);
    max-width: initial;
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

  .search-button {
    font-size: var(--fontSize100);

    ${breakpointMediumHandset} {
      display: none;
    }
  }
`

const searchIconStyle = css`
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

const searchContainerStyle = css`
  display: inline-flex;
  position: relative;
  align-items: center;
  flex: 1;
`

/**
 * Component to expose search functionality to users in places like GlobalNav.
 */
const GlobalNavSearch = ({
  onSubmit,
  onClose,
  onFocus,
  onBlur,
  value,
  placeholder,
  mobilePlaceholder
}) => {
  const initialSearchValue = ''
  const [searchTerm, updatesearchTerm] = useState(value)
  const [isMobile, updateIsMobile] = useState(false)

  const handleClear = () => updatesearchTerm(initialSearchValue)

  const handleInputChange = (e) => updatesearchTerm(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchTerm) return

    onSubmit(searchTerm)
  }

  useEffect(() => {
    updateIsMobile(window.innerWidth < screenMediumHandset)
  }, [window.innerWidth])

  return (
    <form className={searchStyle} onSubmit={handleSubmit}>
      <div className={searchContainerStyle}>
        <SearchIcon className={searchIconStyle} />
        <input
          type="search"
          name="q"
          className={classnames([
            'search-input',
            { 'has-value': !!searchTerm }
          ])}
          aria-label="Search your collection"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isMobile ? mobilePlaceholder : placeholder}
          {...testIdAttribute('search-input')}
        />
        {searchTerm ? (
          <ClearButton
            onClick={handleClear}
            {...testIdAttribute('search-clear')}
          />
        ) : null}
      </div>
      <button
        className="search-button"
        onClick={handleSubmit}
        {...testIdAttribute('search-button')}>
        Search
      </button>
      {onClose ? (
        <CloseButton onClick={onClose} {...testIdAttribute('search-close')} />
      ) : null}
    </form>
  )
}

GlobalNavSearch.propTypes = {
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

GlobalNavSearch.defaultProps = {
  onClose: false,
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  placeholder: 'Search for topics and interests',
  mobilePlaceholder: 'Search for topics'
}

export default GlobalNavSearch
