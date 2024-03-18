import React from 'react'
import AutosizeInput from 'components/input-autosize/input-autosize'
import { KEYS } from 'common/constants'
import { css } from '@emotion/css'
import { validateEmail } from 'common/utilities/validate-email/validate-email'

const inputWrapper = css`
  max-width: 100%;
  display: inline-block;
  margin-bottom: 0.6em;
  input {
    font-family: 'Graphik Web';
    background-color: transparent;
    line-height: 22px;
    padding: 0;
    font-size: 16px;
    color: var(--color-formFieldTextPrimary);
    border: none;
    &:focus {
      outline: none;
    }
  }
`
// NOTE: AutosizeInput requires pure strings as className
const autoWrapper = css`
  overflow: hidden;
  max-width: 100%;
`
const inputStyle = css`
  display: block;
  min-width: 1em;
  border: 0;
  line-height: 16px;
  padding: 2px 0;
`

export function TagInput(props) {
  const {
    onBlur,
    setValue,
    value,
    handleRemoveAction,
    hasActiveTags,
    setBlur,
    deactivateTags,
    email,
    addTag,
    submitForm,
    characterLimit,
    hasError,
    setError,
    clearError,
    inputRef
  } = props

  /* Input Events
  –––––––––––––––––––––––––––––––––––––––––––––––––––– */
  const onChange = (event) => setValue(event.target.value)
  const onKeyUp = (event) => {
    switch (event.keyCode) {
      // Handle intent to remove
      case KEYS.BACKSPACE:
      case KEYS.DELETE: {
        clearInputError()
        if (!value.length) handleRemoveAction()
        return
      }

      // Handle intent to exit
      case KEYS.ESCAPE: {
        clearInputError()
        setValue('')
        if (hasActiveTags) deactivateTags()
        if (!value.length) setBlur()
        return
      }

      // How necessary is this on every keyup
      default:
        if (hasActiveTags) deactivateTags()
    }
  }

  const onKeyInput = (event) => {
    const trimmedValue = value.trim()

    // Check email validation. No longer used 1/19/23
    if (
      event.charCode === KEYS.COMMA ||
      event.keyCode === KEYS.TAB ||
      event.keyCode === KEYS.ENTER
    ) {
      if (email && !validateEmail(trimmedValue)) {
        setInputError()
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }

    // Add Tag on comma or tab
    if (event.charCode === KEYS.COMMA || event.keyCode === KEYS.TAB) {
      event.preventDefault()
      event.stopPropagation()
      if (trimmedValue) return addTag(`${trimmedValue}`)
      return
    }

    // Close on double enter
    if (event.keyCode === KEYS.ENTER) {
      event.preventDefault()
      event.stopPropagation()

      if (trimmedValue) {
        return addTag(`${trimmedValue}`)
      }

      // Only allow submitting when input is empty
      if (!value) {
        submitForm()
      }
    }

    // Set error on tag length limit
    if (
      value &&
      value.length >= characterLimit &&
      event.keyCode !== KEYS.BACKSPACE &&
      event.keyCode !== KEYS.DELETE &&
      event.keyCode !== KEYS.LEFT &&
      event.keyCode !== KEYS.UP &&
      event.keyCode !== KEYS.RIGHT &&
      event.keyCode !== KEYS.DOWN &&
      event.keyCode !== KEYS.ENTER
    ) {
      setInputError()
      event.preventDefault()
      return
    }
  }

  const setInputError = () => (!hasError ? setError() : null)
  const clearInputError = () => (hasError ? clearError() : null)

  return (
    <div className={inputWrapper}>
      <AutosizeInput
        data-testid="tagging-input"
        autoFocus={true} //eslint-disable-line
        className={autoWrapper}
        inputRef={inputRef}
        inputClassName={inputStyle}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyInput}
        onKeyPress={onKeyInput}
      />
    </div>
  )
}
