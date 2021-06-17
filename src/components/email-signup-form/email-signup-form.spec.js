import { render, fireEvent, mockGrecaptcha } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import EmailSignupForm, { PROCESSING_MESSAGE, INVALID_EMAIL_ERROR } from './email-signup-form'

describe('EmailSignupForm', () => {
  const baseProps = {
    instanceId: 'subscribe-to-pizza'
  }

  describe('checkbox', () => {
    it('renders the checkbox if props.showCheckbox is true', () => {
      const { getByRole } = render(<EmailSignupForm {...baseProps} showCheckbox />)
      expect(getByRole('checkbox')).toBeTruthy()
    })

    it('uses the checkbox label passed as prop', () => {
      const { getByLabelText } = render(
        <EmailSignupForm {...baseProps} showCheckbox checkboxLabel="I want extra cheese" />
      )
      expect(getByLabelText('I want extra cheese')).toBeTruthy()
    })
  })

  // !! The following tests are really just testing props are being passed, which seems extraneous
  it('uses the input label passed as a prop', () => {
    const { queryByText } = render(<EmailSignupForm {...baseProps} inputLabel="Email In A Dress" />)
    expect(queryByText('Email In A Dress')).toBeTruthy()
  })

  it('uses the button label passed as a prop', () => {
    const { queryByText } = render(<EmailSignupForm {...baseProps} buttonLabel="Button Magic!" />)
    expect(queryByText('Button Magic!')).toBeTruthy()
  })

  it('uses the button variant passed as a prop', () => {
    const { queryByCy } = render(<EmailSignupForm {...baseProps} buttonVariant="emphasized" />)
    expect(queryByCy('submit-button')).toHaveClass('emphasized')
  })

  it('renders a disabled/processing state if props.isProcessing is true', () => {
    const { getByText, getByRole } = render(<EmailSignupForm {...baseProps} isProcessing />)
    expect(getByRole('button')).toBeDisabled()
    expect(getByText(PROCESSING_MESSAGE)).toBeTruthy()
  })

  it('handles invalid emails gracefully', () => {
    const onValidationError = jest.fn()
    const { queryByText, getByCy, getByText, getByRole } = render(
      <EmailSignupForm {...baseProps} onValidationError={onValidationError} />
    )

    const submitButton = getByCy('submit-button')
    const emailInput = getByRole('textbox')
    fireEvent.change(emailInput, { target: { value: 'cheesemail' } })
    fireEvent.click(submitButton)
    expect(getByText(INVALID_EMAIL_ERROR)).toBeTruthy()

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } })

    expect(queryByText(INVALID_EMAIL_ERROR)).toBeFalsy()
    expect(onValidationError).toBeCalled()
  })

  it('displays an error message if passed as props.errorMessage', () => {
    const onValidationError = jest.fn()
    const { getByRole, getByText } = render(
      <EmailSignupForm
        {...baseProps}
        onValidationError={onValidationError}
        errorMessage="Not enough cheese"
      />
    )

    const emailInput = getByRole('textbox')
    fireEvent.change(emailInput, { target: { value: 'cheesemail' } })
    expect(getByText('Not enough cheese')).toBeTruthy()
  })

  it('calls props.onFocus, passing the instanceId, when the input is focused', () => {
    const onFocus = jest.fn()
    const { getByRole } = render(<EmailSignupForm {...baseProps} onFocus={onFocus} />)
    const emailInput = getByRole('textbox')
    fireEvent.focus(emailInput)
    expect(onFocus).toBeCalledWith(baseProps.instanceId)
  })

  it('calls props.onChange, passing the instanceId and value, when the input changes', () => {
    const onChange = jest.fn()
    const { getByRole } = render(<EmailSignupForm {...baseProps} onChange={onChange} />)
    const emailInput = getByRole('textbox')
    fireEvent.change(emailInput, { target: { value: 'pep' } })
    expect(onChange).toBeCalledWith(baseProps.instanceId, 'pep')
  })

  it('calls props.onValidSubmit, passing the instanceId and recaptcha response, when the user successfully completes the recaptcha', () => {
    mockGrecaptcha({ forceCallbackType: 'success', token: 'cheese-response-token' })
    const onValidSubmit = jest.fn()
    const { getByCy, getByRole } = render(
      <EmailSignupForm {...baseProps} onValidSubmit={onValidSubmit} />
    )

    const submitButton = getByCy('submit-button')
    const emailInput = getByRole('textbox')

    fireEvent.change(emailInput, { target: { value: 'gouda@cheese.com' } })
    fireEvent.click(submitButton)

    expect(onValidSubmit).toBeCalled()
    expect(onValidSubmit).toBeCalledWith(
      baseProps.instanceId,
      'gouda@cheese.com',
      'cheese-response-token',
      true
    )
  })

  it('applies a class to the form hide the recaptcha badge if props.hideRecaptchaBadge is true', () => {
    const { container } = render(<EmailSignupForm {...baseProps} hideCaptchaBadge />)
    expect(container.firstChild).toHaveClass('hidden-captcha-badge')
  })
})
