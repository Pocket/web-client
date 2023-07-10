import * as React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import ReactGA from 'react-ga'
import { testIdSelector } from '@pocket/web-utilities/test-utils'

import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

// imported dependencies for stubbing. We have to `import * as Foo from 'foo'`
// so that we're importing an object whose methods can be stubbed by sinon.
import * as reactRedux from 'react-redux'
import * as pocketHitsSignupState from 'connectors/pocket-hits/pocket-hits.state'

import PocketHitsSignupPage from './pocket-hits-signup'

/**
 * Because we have two forms on the same page, each form sets an internal state
 * id to identify the form. We will cut down to one form in the near future, and
 * so in this file we're only doing tests on the "top" form. In order to bypass
 * some of the form identifier logic, and always assume we're talking about the
 * top form, this function will manually trigger a submit event to trigger state
 * update to identify the top form as active. This way we don't have to repeat this
 * in every test where we're testing post-submit behaviors.
 */
function findTopForm(wrapper) {
  let form = wrapper.find(testIdSelector('email-form'))
  // simulating form submit to ensure that the current form id internal state is
  // set to "top", since we currently have two forms. We can remove this if/when
  // we only have one form instance on the page. Right now we're only testing the
  // top form.
  form.simulate('validSubmit', 'top', 'foo@bar.com', 'captchakey')
  // we've triggered a state update, so refresh our form reference:
  form = wrapper.find(testIdSelector('email-form'))

  return form
}

describe('PocketHitsSignupPage', function () {
  // redux dependencies are stubbed so that we don't need to set up a Provider/context,
  // and can mock the result of the dependencies when called.
  const noop = () => {}
  let useDispatchStub // eslint-disable-line no-unused-vars
  let useSelectorStub
  let useEffectStub

  beforeEach(function () {
    useDispatchStub = sinon.stub(reactRedux, 'useDispatch').returns(noop)
    useSelectorStub = sinon.stub(reactRedux, 'useSelector')
    useEffectStub = sinon.stub(React, 'useEffect')

    // stub GA dependencies as noops
    sinon.stub(ReactGA, 'initialize')
    sinon.stub(ReactGA, 'pageview')
  })

  afterEach(function () {
    // restore the original dependencies once all tests have run.
    sinon.restore()
  })

  it('dispatches a request to submit email for signup on form submit', () => {
    // stub/spy on our action creator that we want to assert was dispatched
    // from the component
    const signupRequestDispatchStub = sinon.stub(pocketHitsSignupState, 'pocketHitsSignupRequested')

    const container = shallow(<PocketHitsSignupPage />)
    const form = container.find(testIdSelector('email-form'))

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
    const container = shallow(<PocketHitsSignupPage />)
    let form = findTopForm(container)

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
    const container = shallow(<PocketHitsSignupPage />)
    let form = findTopForm(container)

    assert.equal(form.prop('errorMessage'), 'Oops! Something went wrong.')
  })

  it('scrolls the user to the top of the page after a successful submit', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'success'
      }
    }
    const scrollSpy = sinon.spy()
    const cachedScrollTo = global.scrollTo
    global.scrollTo = scrollSpy

    // Force useEffect to run in the component no matter what. Also set the redux
    // signup state to "success". This will trigger our request success handling
    // logic so that we can validate that the event is appropriately handled.
    useEffectStub.callsFake((fn) => fn())
    useSelectorStub.callsFake((fn) => fn(mockState))

    // now we render
    shallow(<PocketHitsSignupPage />)

    assert(scrollSpy.calledWith(0, 0))

    // reset globals that we modified to spy on
    global.scrollTo = cachedScrollTo
  })

  it('shows a success message/state after a successful submit', () => {
    const mockState = {
      pocketHits: {
        signupRequestState: 'success'
      }
    }
    // Set the redux signup state to "success".
    useSelectorStub.callsFake((fn) => fn(mockState))

    const container = shallow(<PocketHitsSignupPage />)
    const successMessage = container.find(testIdSelector('success-message'))

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

    const container = shallow(<PocketHitsSignupPage />)
    const form = container.find(testIdSelector('email-form'))

    assert(!form.exists())
  })

  // Here we test the different versions of the page based on the language
  // prop being passed. All content should default to English if a language
  // isn't supported, but different languages require different components
  // to be visible/hidden in different states.
  describe('english translation', () => {
    it('hides the top bar', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const topBar = container.find(testIdSelector('top-bar')).shallow()
      const header = topBar.find('header')

      assert(!header.exists())
    })

    it('hides checkbox', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const form = container.find(testIdSelector('email-form')).shallow()
      const checkbox = form.find({ type: 'checkbox' })

      assert(!checkbox.exists())
    })

    it('hides description text', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const description = container.find(testIdSelector('description')).shallow()
      const paragraph = description.find('p')

      assert(!paragraph.exists())
    })

    it('shows form subtext link', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const form = container.find(testIdSelector('form-subtext')).shallow()
      const formSubtext = form.find('span')

      assert(formSubtext.exists())
    })

    it('shows the hero image', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const heroImage = container.find(testIdSelector('hero-image')).shallow()
      const image = heroImage.find('img')

      assert(image.exists())
    })

    it('hides topics list', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const topicListContainer = container.find(testIdSelector('topic-list')).shallow()
      const topicList = topicListContainer.find('TopicList')

      assert(!topicList.exists())
    })

    it('shows publisher grid', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const publisherGridContainer = container.find(testIdSelector('publisher-grid')).shallow()
      const publisherGrid = publisherGridContainer.find('PublisherGrid')

      assert(publisherGrid.exists())
    })

    it('shows bottom form', () => {
      const container = shallow(<PocketHitsSignupPage />)
      const bottomFormContainer = container.find(testIdSelector('bottom-form')).shallow()
      const bottomForm = bottomFormContainer.find('EmailSignupForm')

      assert(bottomForm.exists())
    })
  })

  describe('german translation', () => {
    it('shows the top bar', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const topBar = container.find(testIdSelector('top-bar'))

      assert(topBar.exists())
    })

    it('hides checkbox', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const form = container.find(testIdSelector('email-form')).shallow()
      const checkbox = form.find({ type: 'checkbox' })

      assert(!checkbox.exists())
    })

    it('shows description text', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const description = container.find(testIdSelector('description')).shallow()
      const paragraph = description.find('p')

      assert(paragraph.exists())
    })

    it('shows form subtext link', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const form = container.find(testIdSelector('form-subtext')).shallow()
      const formSubtext = form.find('span')

      assert(formSubtext.exists())
    })

    it('hides the hero image', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const heroImage = container.find(testIdSelector('hero-image')).shallow()
      const image = heroImage.find('img')

      assert(!image.exists())
    })

    it('shows topics list', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const topicListContainer = container.find(testIdSelector('topic-list')).shallow()
      const topicList = topicListContainer.find('TopicList')

      assert(topicList.exists())
    })

    it('hides publisher grid', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const publisherGridContainer = container.find(testIdSelector('publisher-grid')).shallow()
      const publisherGrid = publisherGridContainer.find('PublisherGrid')

      assert(!publisherGrid.exists())
    })

    it('hides bottom form', () => {
      const container = shallow(<PocketHitsSignupPage language="de" />)
      const bottomFormContainer = container.find(testIdSelector('bottom-form')).shallow()
      const bottomForm = bottomFormContainer.find('EmailSignupForm')

      assert(!bottomForm.exists())
    })
  })
})
