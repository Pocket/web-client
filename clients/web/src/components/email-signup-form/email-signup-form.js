import React, { useState } from 'react'
import PropTypes from 'prop-types'
import isEmail from 'validator/lib/isEmail'
import { css, cx } from '@emotion/css'
import Recaptcha from 'react-google-recaptcha'
import { TextInput } from 'components/form-fields/text-input'
import { breakpointSmallHandset, breakpointLargeHandset } from 'common/constants'

import { CAPTCHA_SITE_KEY } from 'common/constants'

// values exported only for testing purposes
export const INVALID_EMAIL_ERROR = 'Invalid email address'
export const PROCESSING_MESSAGE = 'Working on it...'

const formStyle = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-flow: wrap;

  ${breakpointSmallHandset} {
    flex-direction: column;
  }

  &.hidden-captcha-badge {
    .grecaptcha-badge {
      opacity: 0;
    }
  }
`
const inputStyle = css`
  flex-grow: 2;

  & > div {
    max-width: 100%;
  }

  input {
    max-width: 100%;
  }

  ${breakpointLargeHandset} {
    flex-grow: 1;
  }

  ${breakpointSmallHandset} {
    width: 100%;

    & > div {
      margin-bottom: var(--spacing050);
    }
  }
`

const buttonStyle = css`
  padding: 0.375em 0 0 var(--spacing100);
  flex-grow: 1;

  button {
    width: 100%;
  }

  ${breakpointSmallHandset} {
    padding: 0;
    width: 100%;
  }
`

const checkboxStyle = css`
  width: 100%;
  input[type='checkbox'] {
    vertical-align: top;
  }

  ${breakpointSmallHandset} {
    margin-top: var(--spacing150);
  }
`

/**
 * This component provides a form with an email input and a submit button.
 * The email input provides basic email validation. The form also supports
 * ReCaptcha protection. When a valid email is submitted and passes the ReCaptcha,
 * an `onValidSubmit` callback is called and passed the email and captcha values
 * so that the implementing code can determine what to do with the values.
 * The component also provides a number of other props/hooks to configure and
 * customize the form.
 */
const EmailSignupForm = ({
  instanceId,
  displayErrorInline,
  isProcessing = false,
  errorMessage = null,
  onValidSubmit = () => {},
  onValidationError = () => {},
  onFocus = () => {},
  onCheckboxChecked = () => {},
  onChange = () => {},
  formClassName = null,
  inputClassName = null,
  buttonClassName = null,
  hideCaptchaBadge = false,
  inputLabel = 'Your email address',
  buttonLabel = 'Subscribe',
  buttonVariant = 'primary',
  invalidEmailError = INVALID_EMAIL_ERROR,
  buttonLabelProcessing = PROCESSING_MESSAGE,
  showCheckbox = false,
  checkboxLabel = 'Stay updated on Pocket news, launches, surveys, and more.'
}) => {
  const recaptchaRef = React.createRef()
  const [emailValue, setEmailValue] = useState('')
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const [isRecaptchaProcessing, setIsRecaptchaProcessing] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(!showCheckbox)

  function handleInputFocus() {
    onFocus(instanceId)
  }

  function handleCheckboxClick(event) {
    const isChecked = event.target.checked
    setIsCheckboxChecked(isChecked)
    if (event.target.checked) {
      onCheckboxChecked(instanceId)
    }
  }

  function handleInputChange(event) {
    const inputVal = event.target.value
    setValidationErrorMessage('')
    setEmailValue(inputVal)

    onChange(instanceId, inputVal)
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }

    if (isEmail(emailValue)) {
      setIsRecaptchaProcessing(true)
      recaptchaRef.current.execute()
    } else {
      setValidationErrorMessage(invalidEmailError)
      onValidationError(instanceId)
    }
  }

  function handleRecaptchaComplete(recaptchaResponse) {
    onValidSubmit(instanceId, emailValue, recaptchaResponse, isCheckboxChecked)

    setIsRecaptchaProcessing(false)
  }

  return (
    <form
      className={cx(formStyle, formClassName, hideCaptchaBadge && 'hidden-captcha-badge')}
      onSubmit={handleFormSubmit}
      autoComplete="off">
      <div className={cx(inputStyle, inputClassName)}>
        <TextInput
          labelText={inputLabel}
          name={`${instanceId}-email-signup-input`}
          value={emailValue}
          onChange={handleInputChange}
          error={errorMessage || validationErrorMessage}
          displayErrorInline={displayErrorInline}
          onFocus={handleInputFocus}
          disabled={isProcessing || isRecaptchaProcessing}
          data-testid="email-input"
        />
      </div>
      <div className={cx(buttonStyle, buttonClassName)}>
        <button
          type="submit"
          disabled={isProcessing || isRecaptchaProcessing}
          className={buttonVariant}
          data-testid="submit-button">
          {isProcessing || isRecaptchaProcessing ? buttonLabelProcessing : buttonLabel}
        </button>
      </div>
      {showCheckbox ? (
        <div className={cx(checkboxStyle)} data-testid="checkbox">
          <input
            type="checkbox"
            onChange={handleCheckboxClick}
            name={`${instanceId}-signup-checkbox`}
            id={`${instanceId}-confirm-subscription`}
          />
          <label htmlFor={`${instanceId}-confirm-subscription`}>{checkboxLabel}</label>
        </div>
      ) : null}
      <Recaptcha
        ref={recaptchaRef}
        size="invisible"
        sitekey={CAPTCHA_SITE_KEY}
        onChange={handleRecaptchaComplete}
        data-testid="recaptcha"
      />
    </form>
  )
}

EmailSignupForm.propTypes = {
  /**
   * Id for this instance of the form. This value is used to aid in accessibility
   * of form labels, and is passed to callback functions so that if multiple
   * instances are used on the same page, we know which form the event originated from.
   */
  instanceId: PropTypes.string.isRequired,

  /**
   * Set to true to apply a loading state where the form will be disabled.
   */
  isProcessing: PropTypes.bool,

  /**
   * Pass any errors from failed network requests here, or other error states controlled
   * by the parent.
   */
  errorMessage: PropTypes.string,

  /**
   * Set to true to have the error message display inline below the text input, meaning
   * that it will take space in the layout and push other content below it, when
   * it appears.
   */
  displayErrorInline: PropTypes.bool,

  /**
   * Called when the user has submitted a valid email and successfully passed the
   * Recaptcha. The recaptcha response key is provided so that it can be passed
   * to the backend endpoint validating this form submission.
   */
  onValidSubmit: PropTypes.func,

  /**
   * Called when the user submits a value that fails email validation.
   */
  onValidationError: PropTypes.func,

  /**
   * Called when a user focuses on the text input.
   */
  onFocus: PropTypes.func,

  /**
   * Called when the user changes the value of the text input; receives the new value.
   */
  onChange: PropTypes.func,

  /**
   * Called when the user clicks the checkbox.
   */
  onCheckboxChecked: PropTypes.func,

  /**
   * A custom CSS class to apply to the <form> tag to override styles.
   */
  formClassName: PropTypes.string,

  /**
   * A custom CSS class to apply to the input container to override styles.
   */
  inputClassName: PropTypes.string,

  /**
   * A custom CSS class to apply to the button container to override styles.
   */
  buttonClassName: PropTypes.string,

  /**
   * Set to true to hide the Recaptcha badge. WARNING: if the badge is hidden,
   * Google requires you to implement specific disclaimer copy with your form.
   * See: https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
   */
  hideCaptchaBadge: PropTypes.bool,

  /**
   * Text to display as the input label.
   */
  inputLabel: PropTypes.string,

  /**
   * Text to display as the button label.
   */
  buttonLabel: PropTypes.string,

  /**
   * Variant style for the submit button.
   */
  buttonVariant: PropTypes.string,

  /**
   * Text to display if invalid email is typed in.
   */
  invalidEmailError: PropTypes.string,

  /**
   * Text to display as the button label when processing.
   */
  buttonLabelProcessing: PropTypes.string,

  /**
   * Set to true to show the checkbox
   */
  showCheckbox: PropTypes.bool,

  /**
   * Text to display as the checkbox label. WARNING: Changing this copy
   * may require legal approval in certain countries.
   */
  checkboxLabel: PropTypes.string
}

export default EmailSignupForm
