import { cx } from '@emotion/css'
import { errorMessageStyle, helperTextStyle, inputWrapper } from './input-styles'
import React from 'react'

const InputWrapper = ({
  labelText,
  helperText,
  error,
  displayErrorInline,
  className,
  disabled,
  value,
  name,
  showCharacterLimit,
  characterLimit,
  children
}) => {
  const characterCount = value?.length
  const characterCountLabel = `${characterCount}/${characterLimit}`
  const characterLimitError = characterCount > characterLimit ? 'Character Limit Exceeded' : null
  const errorWithLengthCheck = error || characterLimitError || null
  return (
    <div
      className={cx(
        inputWrapper,
        className && className,
        !!errorWithLengthCheck && 'invalid',
        disabled && 'disabled'
      )}
      data-testid="input-wrapper">
      {children}
      <span className={cx('label-wrapper', !!value && 'has-value')}>
        <label htmlFor={name} data-testid="input-label">
          {labelText}
        </label>
      </span>

      {(helperText || showCharacterLimit) && !errorWithLengthCheck ? (
        <span className={helperTextStyle} data-testid="helper-text">
          {showCharacterLimit ? characterCountLabel : helperText}
        </span>
      ) : null}

      {errorWithLengthCheck && typeof errorWithLengthCheck === 'string' ? (
        <span
          className={cx(helperTextStyle, errorMessageStyle, displayErrorInline & 'inline-error')}
          data-testid="error-text">
          {errorWithLengthCheck}
        </span>
      ) : null}
    </div>
  )
}

export default InputWrapper
