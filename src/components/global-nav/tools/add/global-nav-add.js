import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { AddIcon, CrossIcon, ErrorIcon } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'
import { screenMediumHandset } from '@pocket/web-ui'
import { css } from 'linaria'
import classnames from 'classnames'
import isURL from 'validator/lib/isURL'
import { Trans, useTranslation } from 'common/setup/i18n'
import { KEYS } from 'common/constants'
import Mousetrap from 'mousetrap'

const addStyle = css`
  width: 100%;
  display: flex;
  align-items: center;

  .add-input {
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

  .add-button {
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
      <CloseLabel>
        <Trans i18nKey="nav:cancel">Cancel</Trans>
      </CloseLabel>
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
  const { t } = useTranslation()

  const inputEl = useRef(null)

  const [addUrl, updateAddUrl] = useState(value)
  const [isMobile, updateIsMobile] = useState(false)
  const [inputError, updateInputError] = useState(false)

  const handleInputChange = (e) => {
    updateInputError(false)
    updateAddUrl(e?.target?.value)
  }

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const validUrl = isURL(addUrl, {
      protocols: ['http', 'https'],
      allow_underscores: true
    })
    if (!validUrl) return updateInputError(t('nav:please-enter-a-valid-url'))

    const protocolRegEx = new RegExp('^https?://')
    const prefix = !!protocolRegEx.test(addUrl) ? '' : 'https://'
    onSubmit(`${prefix}${addUrl}`)

    onClose()
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === KEYS.ESCAPE) inputEl.current.blur()
  }

  useEffect(() => {
    Mousetrap.bind('esc', onClose)
    return () => Mousetrap.unbind('esc')
  }, [onClose])

  useEffect(() => {
    updateIsMobile(window.innerWidth < screenMediumHandset)
  }, [window.innerWidth])

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  return (
    <form className={addStyle} onSubmit={handleSubmit} autoComplete="off">
      <div className={addContainerStyle}>
        <AddIcon className={addIconStyle} />
        <input
          type="url"
          name="add-input"
          ref={inputEl}
          className={classnames(['add-input', { 'has-value': !!addUrl }])}
          aria-label={t('nav:add-item-to-pocket', 'Add Item to Pocket')}
          value={addUrl}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={handleKeyUp}
          placeholder={isMobile ? t(mobilePlaceholder) : t(placeholder)}
          data-cy="add-input"
        />
        {inputError ? (
          <div className="error-message">
            <div>
              <ErrorIcon /> {inputError}
            </div>
          </div>
        ) : null}
      </div>
      <button
        className="add-button"
        onClick={handleSubmit}
        data-cy="add-button">
        <Trans i18nKey="nav:add">Add</Trans>
      </button>
      {onClose ? (
        <CloseButton onClick={onClose} data-cy="add-close" />
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
  placeholder: 'nav:save-a-url-https',
  mobilePlaceholder: 'nav:save-a-url'
}

// This is so the localization parser can pick up these runtime variables
// t('nav:save-a-url-https', 'Save a URL https://...')
// t('nav:save-a-url', 'Save a URL')

export default GlobalNavAdd
