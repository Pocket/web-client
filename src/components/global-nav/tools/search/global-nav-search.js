import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { SearchIcon, CrossIcon, ErrorIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { screenMediumHandset } from '@pocket/web-ui'
import { css } from 'linaria'
import classnames from 'classnames'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { Trans, useTranslation } from 'react-i18next'

const searchStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  .search-input {
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

  .search-button {
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
      <CloseLabel>
        <Trans i18nKey="nav:cancel">Cancel</Trans>
      </CloseLabel>
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
  const { t } = useTranslation()
  const inputEl = useRef(null)

  const [searchTerm, updateSearchTerm] = useState(value)
  const [isMobile, updateIsMobile] = useState(false)
  const [inputError, updateInputError] = useState(false)

  const handleInputChange = (e) => {
    updateInputError(false)
    updateSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (!searchTerm)
      return updateInputError(t('nav:please-enter-a-search-term'))

    onSubmit(searchTerm)
  }

  useEffect(() => {
    updateIsMobile(window.innerWidth < screenMediumHandset)
  }, [window.innerWidth])

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  return (
    <form className={searchStyle} onSubmit={handleSubmit} autoComplete="off">
      <div className={searchContainerStyle}>
        <SearchIcon className={searchIconStyle} />
        <input
          name="search-input"
          ref={inputEl}
          className={classnames([
            'search-input',
            { 'has-value': !!searchTerm }
          ])}
          aria-label={t('nav:search-your-collection', 'Search your collection')}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isMobile ? mobilePlaceholder : placeholder}
          {...testIdAttribute('search-input')}
        />
        {inputError ? (
          <div className="error-message">
            <div>
              <ErrorIcon /> {inputError}
            </div>
          </div>
        ) : null}
      </div>
      <button className="search-button" {...testIdAttribute('search-button')}>
        <Trans i18nKey="nav:search">Search</Trans>
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
  placeholder: PropTypes.node,
  /**
   * Text to display as a note to the user when the user input is still empty,
   * at mobile widths
   */
  mobilePlaceholder: PropTypes.node
}

GlobalNavSearch.defaultProps = {
  onClose: false,
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  placeholder: (
    <Trans i18nKey="nav:search-for-topics-and-interests">
      Search for topics and interests
    </Trans>
  ),
  mobilePlaceholder: (
    <Trans i18nKey="nav:search-for-topics">Search for topics</Trans>
  )
}

export default GlobalNavSearch
