import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { testIdSelector, mockEvent } from '@pocket/web-utilities/test-utils'

import EmailSignupForm, {
  PROCESSING_MESSAGE,
  INVALID_EMAIL_ERROR
} from './email-signup-form'

describe('EmailSignupForm', () => {
  const baseProps = {
    instanceId: 'subscribe-to-pizza'
  }

  describe('checkbox', () => {
    it('renders the checkbox if props.showCheckbox is true', () => {
      const form = shallow(<EmailSignupForm {...baseProps} showCheckbox />)
      const checkbox = form.find(testIdSelector('checkbox'))

      assert(checkbox.exists())
    })

    it('uses the checkbox label passed as prop', () => {
      const form = shallow(
        <EmailSignupForm
          {...baseProps}
          showCheckbox
          checkboxLabel="I want extra cheese"
        />
      )
      const checkbox = form.find(testIdSelector('checkbox'))

      assert.equal(
        checkbox.find('label').text('checkboxLabel'),
        'I want extra cheese'
      )
    })
  })

  it('uses the input label passed as a prop', () => {
    const form = shallow(
      <EmailSignupForm {...baseProps} inputLabel="Email Address" />
    )
    const input = form.find(testIdSelector('email-input'))

    assert.equal(input.prop('labelText'), 'Email Address')
  })

  it('uses the button label passed as a prop', () => {
    const form = shallow(<EmailSignupForm {...baseProps} buttonLabel="Gimme" />)
    const button = form.find(testIdSelector('submit-button'))

    assert.equal(button.prop('children'), 'Gimme')
  })

  it('uses the button variant passed as a prop', () => {
    const form = shallow(
      <EmailSignupForm {...baseProps} buttonVariant="emphasized" />
    )
    const button = form.find(testIdSelector('submit-button'))

    assert.equal(button.prop('variant'), 'emphasized')
  })

  it('renders a disabled/processing state if props.isProcessing is true', () => {
    const form = shallow(<EmailSignupForm {...baseProps} isProcessing />)
    const input = form.find(testIdSelector('email-input'))
    const button = form.find(testIdSelector('submit-button'))

    assert.equal(input.prop('disabled'), true)
    assert.equal(button.prop('disabled'), true)
    assert.equal(button.prop('children'), PROCESSING_MESSAGE)
  })

  it('displays an invalid email error if an invalid email was submitted', () => {
    const form = shallow(<EmailSignupForm {...baseProps} />)
    let input = form.find(testIdSelector('email-input'))

    // first trigger change event on the input with an invalid value
    // since input is another component, we'll just call its onChange prop
    input.prop('onChange')({ target: { value: 'cheesemail' } })
    // then submit the form
    form.simulate('submit', mockEvent)
    // get the updated value for the input
    input = form.find(testIdSelector('email-input'))

    assert.equal(input.prop('error'), INVALID_EMAIL_ERROR)
  })

  it('calls the onValidationError prop if an invalid email was submitted', () => {
    const spy = sinon.spy()
    const form = shallow(
      <EmailSignupForm {...baseProps} onValidationError={spy} />
    )
    let input = form.find(testIdSelector('email-input'))

    // first trigger change event on the input with an invalid value
    // since input is another component, we'll just call its onChange prop
    input.prop('onChange')({ target: { value: 'cheesemail' } })
    // then submit the form
    form.simulate('submit', mockEvent)

    assert(spy.calledWith(baseProps.instanceId))
  })

  it('clears the validation error message once the input changes again', () => {
    const form = shallow(<EmailSignupForm {...baseProps} />)
    let input = form.find(testIdSelector('email-input'))

    // first trigger change event on the input with an invalid value
    // since input is another component, we'll just call its onChange prop
    input.simulate('change', { target: { value: 'cheesemail' } })
    // then submit the form
    form.simulate('submit', mockEvent)
    // then change the input value again
    input.simulate('change', { target: { value: 'cheese' } })
    // get the updated value for the input
    input = form.find(testIdSelector('email-input'))

    assert.equal(input.prop('error'), '')
  })

  it('displays an error message if passed as props.errorMessage', () => {
    const form = shallow(
      <EmailSignupForm {...baseProps} errorMessage="Not enough cheese" />
    )
    const input = form.find(testIdSelector('email-input'))

    assert.equal(input.prop('error'), 'Not enough cheese')
  })

  it('calls props.onFocus, passing the instanceId, when the input is focused', () => {
    const spy = sinon.spy()
    const form = shallow(<EmailSignupForm {...baseProps} onFocus={spy} />)
    const input = form.find(testIdSelector('email-input'))
    input.simulate('focus', mockEvent)

    assert(spy.calledWith(baseProps.instanceId))
  })

  it('calls props.onChange, passing the instanceId and value, when the input changes', () => {
    const spy = sinon.spy()
    const form = shallow(<EmailSignupForm {...baseProps} onChange={spy} />)
    const input = form.find(testIdSelector('email-input'))
    // since input is another component, we'll just call its onChange prop to simulate a change
    input.simulate('change', { target: { value: 'pep' } })

    assert(spy.calledWith(baseProps.instanceId, 'pep'))
  })

  it('calls props.onValidSubmit, passing the instanceId and recaptcha response, when the user successfully completes the recaptcha', () => {
    const spy = sinon.spy()
    const form = shallow(<EmailSignupForm {...baseProps} onValidSubmit={spy} />)
    const input = form.find(testIdSelector('email-input'))

    input.simulate('change', { target: { value: 'gouda@cheese.com' } })

    const recaptcha = form.find(testIdSelector('recaptcha'))
    recaptcha.simulate('change', 'recaptcha-response-string')

    assert(
      spy.calledWith(
        baseProps.instanceId,
        'gouda@cheese.com',
        'recaptcha-response-string'
      )
    )
  })

  it('applies a class to the form hide the recaptcha badge if props.hideRecaptchaBadge is true', () => {
    const form = shallow(<EmailSignupForm {...baseProps} hideCaptchaBadge />)

    assert(form.hasClass('hidden-captcha-badge'))
  })
})
