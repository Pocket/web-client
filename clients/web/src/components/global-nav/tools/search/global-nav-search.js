import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from '@ui/icons/SearchIcon'
import { CrossIcon } from '@ui/icons/CrossIcon'
import { ErrorIcon } from '@ui/icons/ErrorIcon'
import { breakpointMediumHandset } from 'common/constants'
import { screenMediumHandset } from 'common/constants'
import { css, cx } from '@emotion/css'

import { Trans, useTranslation } from 'next-i18next'
import { KEYS } from 'common/constants'
import Mousetrap from 'mousetrap'
import { RecentSearches } from './recent-searches'

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
    outline: 0;
    &.has-value {
      padding-right: var(--spacing400);
    }

    ${breakpointMediumHandset} {
      padding-left: var(--spacing075);
      &.has-value {
        padding-right: 3rem;
      }
    }
  }

  .search-button {
    font-size: var(--fontSize100);

    ${breakpointMediumHandset} {
      display: none;
    }
  }

  .mobile-submit {
    visibility: hidden;
    position: absolute;
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
  color: var(--color-grey40);

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

const CloseLabel = ({ children }) => <span className={closeLabelStyle}>{children}</span>

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

  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }
`

const CloseButton = ({ onClick }) => {
  return (
    <button className={closeButtonStyle} onClick={onClick} data-testid="search-cancel">
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
  margin-right: var(--spacing050);
  ${breakpointMediumHandset} {
    margin-right: 0;
  }
`

/**
 * Component to expose search functionality to users in places like GlobalNav.
 */
const GlobalNavSearch = ({
  onClose = false,
  onFocus = () => {},
  onBlur = () => {},
  value = '',
  placeholder = 'nav:search-for-topics-and-interests', // default localized key
  mobilePlaceholder = 'nav:search-for-topics', // default localized key
  onSubmit,
  recentSearches
}) => {
  const { t } = useTranslation()
  const inputEl = useRef(null)
  const formRef = useRef(null)

  const [isFocused, setIsFocused] = useState(true)
  const [searchTerm, updateSearchTerm] = useState(value)
  const [isMobile, updateIsMobile] = useState(false)
  const [inputError, updateInputError] = useState(false)

  const width = global?.innerWidth
  const handleInputChange = (e) => {
    updateInputError(false)
    updateSearchTerm(e?.target?.value)
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (!searchTerm) return updateInputError(t('nav:please-enter-a-search-term'))

    onSubmit(searchTerm)
  }

  const handleFocus = () => {
    onFocus()
    setIsFocused(true)
  }
  const handleBlur = () => {
    onBlur()
    setIsFocused(false)
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === KEYS.ESCAPE) inputEl.current.blur()
  }

  useEffect(() => {
    Mousetrap.bind('esc', onClose)
    return () => Mousetrap.unbind('esc')
  }, [onClose])

  useEffect(() => {
    updateIsMobile(width < screenMediumHandset)
  }, [width])

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  /**
   * This block finds all the relevant elements and traps focus for them.
   */
  useLayoutEffect(() => {
    if (!recentSearches?.length) return () => {}

    const focusableElements =
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const firstFocusableElement = formRef.current.querySelectorAll(focusableElements)[0] //prettier-ignore
    const focusableContent = formRef.current.querySelectorAll(focusableElements)
    const lastFocusableElement = focusableContent[focusableContent.length - 1]
    const total = focusableContent.length - 1
    const nodeArray = Array.from(focusableContent)

    Mousetrap(formRef.current).bind('up', function (e) {
      e.preventDefault()
      const current = nodeArray.indexOf(document.activeElement)
      const next = current === 0 ? total : current - 1
      focusableContent[next].focus()
    })

    Mousetrap(formRef.current).bind('down', function (e) {
      e.preventDefault()
      const current = nodeArray.indexOf(document.activeElement)
      const next = current === total ? 0 : current + 1
      focusableContent[next].focus()
    })

    Mousetrap(formRef.current).bind(['shift+tab'], function (e) {
      const isAtStart = document.activeElement === firstFocusableElement
      if (isAtStart) {
        e.preventDefault()
        lastFocusableElement.focus()
      }
    })

    Mousetrap(formRef.current).bind(['tab'], function (e) {
      const isAtEnd = document.activeElement === lastFocusableElement
      if (isAtEnd) {
        e.preventDefault()
        firstFocusableElement.focus() // add focus for the first focusable element
      }
    })

    return () => Mousetrap.unbind(['shift+tab', 'up', 'tab', 'down'])
  }, [recentSearches])

  return (
    <form className={searchStyle} onSubmit={handleSubmit} autoComplete="off" ref={formRef}>
      <div className={searchContainerStyle}>
        <SearchIcon className={searchIconStyle} />
        <input
          name="search-input"
          ref={inputEl}
          className={cx('search-input', !!searchTerm && 'has-value')}
          aria-label={t('nav:search-your-collection', 'Search your collection')}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          placeholder={isMobile ? t(mobilePlaceholder) : t(placeholder)}
          data-testid="search-input"
          enterKeyHint="search"
        />
        <RecentSearches searchTerms={recentSearches} isFocused={isFocused} />
        {inputError ? (
          <div className="error-message">
            <div>
              <ErrorIcon /> {inputError}
            </div>
          </div>
        ) : null}
      </div>
      <button className="search-button primary" data-testid="search-submit">
        <Trans i18nKey="nav:search">Search</Trans>
      </button>
      <input type="submit" className="mobile-submit" />
      {onClose ? <CloseButton onClick={onClose} data-testid="search-close" /> : null}
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

// This is so the localization parser can pick up these runtime variables
// t('nav:search-for-topics-and-interests', 'Search for topics and interests')
// t('nav:search-for-topics', 'Search for topics')

export default GlobalNavSearch
