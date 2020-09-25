import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { testIdSelector } from '@pocket/web-utilities/test-utils'
import * as reactRedux from 'react-redux'
import * as pocketHitsSignupState from 'connectors/pocket-hits/pocket-hits.state'
import { PocketHitsInlineSignup } from './ph-inline-signup'

describe('PocketHitsInlineSignup', () => {
  const noop = () => {}
  let useDispatchStub // eslint-disable-line no-unused-vars
  let useSelectorStub

  beforeEach(function () {
    useDispatchStub = sinon.stub(reactRedux, 'useDispatch').returns(noop)
    useSelectorStub = sinon.stub(reactRedux, 'useSelector')
  })

  afterEach(function () {
    sinon.restore()
  })

  it('dispatches a request to submit email for signup on form submit', () => {
    const signupRequestDispatchStub = sinon.stub(
      pocketHitsSignupState,
      'pocketHitsSignupRequested'
    )

    const container = shallow(<PocketHitsInlineSignup />)
    const form = container.find(testIdSelector('inline-form'))

    form.simulate('validSubmit', 'formId', 'foo@bar.com', 'captchakey')
    assert(signupRequestDispatchStub.calledWith('foo@bar.com', 'captchakey'))

    signupRequestDispatchStub.restore()
  })

  it('passes a pending state to the form component while the request is pending', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'pending'
      }
    }
    // tell useSelector to return the pending state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))
    const container = shallow(<PocketHitsInlineSignup />)
    let form = container.find(testIdSelector('inline-form'))

    assert.equal(form.prop('isProcessing'), true)
  })

  it('passes any request error to the form', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'failure',
        signupError: new Error()
      }
    }
    // tell mock useSelector to return the failure state to the component via our stub
    useSelectorStub.callsFake((fn) => fn(mockState))
    const container = shallow(<PocketHitsInlineSignup />)
    let form = container.find(testIdSelector('inline-form'))

    assert.equal(form.prop('errorMessage'), 'Oops! Something went wrong.')
  })

  it('shows a success message/state after a successful submit', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'success'
      }
    }
    // Set the redux signup state to "success".
    useSelectorStub.callsFake((fn) => fn(mockState))

    const container = shallow(<PocketHitsInlineSignup />)
    const successMessage = container.find(
      testIdSelector('pocket-hits-inline-success')
    )

    assert(successMessage.exists())
  })

  it('hides the email form after a successful submit', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'success'
      }
    }
    // Set the redux signup state to "success".
    useSelectorStub.callsFake((fn) => fn(mockState))

    const container = shallow(<PocketHitsInlineSignup />)
    const form = container.find(testIdSelector('inline-form'))

    assert(!form.exists())
  })
})
