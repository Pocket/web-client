import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import { shallow } from 'enzyme'
import { testIdSelector, mockEvent } from '@pocket/web-utilities/test-utils'

const useRefStub = sinon.stub()

// import GlobalNavAccount through proxyquire so that we can stub its dependencies
const GlobalNavAccount = proxyquire('./global-nav-account', {
  react: {
    useRef: useRefStub
  }
}).default

const baseProps = {
  appRootSelector: '#root'
}
const mockAvatarRef = { current: 'the avatar node!' }

describe('GlobalNavAccount', () => {
  beforeEach(() => {
    useRefStub.returns(mockAvatarRef)
  })

  afterEach(() => {
    sinon.reset()
  })

  it('renders a log in link if the user is signed out', () => {
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} />
    )
    const link = account.find(testIdSelector('login-link'))

    assert(link.exists())
  })

  it('renders a sign up link if the user is signed out', () => {
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} />
    )
    const link = account.find(testIdSelector('signup-link'))

    assert(link.exists())
  })

  it('renders an upgrade link if the user is signed in but not a premium account', () => {
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn isPremium={false} />
    )
    const link = account.find(testIdSelector('upgrade-link'))

    assert(link.exists())
  })

  it('does not render an upgrade link if the user is signed and a premium account', () => {
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn isPremium />
    )
    const link = account.find(testIdSelector('upgrade-link'))

    assert(!link.exists())
  })

  it('renders the user’s avatar when signed in, using props.avatarSrc', () => {
    const account = shallow(
      <GlobalNavAccount
        {...baseProps}
        isLoggedIn
        avatarSrc="placekitten.com/50/50"
      />
    )
    const avatar = account.find(testIdSelector('account-menu-avatar'))

    assert.equal(avatar.prop('src'), 'placekitten.com/50/50')
  })

  it('renders the "view profile" menu link using props.profileUrl as the href', () => {
    const account = shallow(
      <GlobalNavAccount
        {...baseProps}
        isLoggedIn
        profileUrl="getpocket.com/123kitties"
      />
    )
    const profileLink = account.find(
      testIdSelector('account-menu-profile-link')
    )

    assert.equal(profileLink.prop('href'), 'getpocket.com/123kitties')
  })

  it('renders the "view profile" menu link using props.accountName as the display name', () => {
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn accountName="George" />
    )
    const profileLink = account.find(
      testIdSelector('account-menu-profile-link')
    )

    assert(profileLink.prop('children').includes('George'))
  })

  it('calls the props.onLinkClick callback when a link is clicked, passing through the link name', () => {
    const spy1 = sinon.spy()
    const account1 = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} onLinkClick={spy1} />
    )
    const link1 = account1.find(testIdSelector('login-link'))
    link1.simulate('click', mockEvent)
    assert(spy1.calledWith('login'))

    const spy2 = sinon.spy()
    const account2 = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn onLinkClick={spy2} />
    )
    const link2 = account2.find(testIdSelector('account-menu-profile-link'))
    link2.simulate('click', mockEvent)
    assert(spy2.calledWith('view-profile'))
  })

  it('calls the props.onAccountClick callback when the account menu is opened', () => {
    const spy = sinon.spy()
    const account = shallow(
      <GlobalNavAccount {...baseProps} isLoggedIn onAccountClick={spy} />
    )
    const menu = account.find(testIdSelector('account-menu'))

    assert(!spy.calledOnce)
    menu.simulate('open')
    assert(spy.calledOnce)
  })

  it('uses the avatar button as the trigger for the account popup menu', () => {
    const account = shallow(<GlobalNavAccount {...baseProps} isLoggedIn />)
    const menu = account.find(testIdSelector('account-menu'))

    assert.equal(menu.prop('trigger'), mockAvatarRef)
  })
})
