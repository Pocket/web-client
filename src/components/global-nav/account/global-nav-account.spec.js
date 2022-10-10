import { wrappedRender, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import GlobalNavAccount from './global-nav-account'

const baseProps = { appRootSelector: '#root' }

describe('GlobalNavAccount', () => {
  it('renders properly when the user is signed out', () => {
    const { getByCy } = wrappedRender(<GlobalNavAccount {...baseProps} isLoggedIn={false} />)
    expect(getByCy('login-link'))
    expect(getByCy('signup-link'))
  })

  it('renders an upgrade link if the user is signed in but not a premium account', () => {
    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn isPremium={false} />
    )
    expect(getByCy('upgrade-link'))
  })

  it('does not render an upgrade link if the user is signed and a premium account', () => {
    const { queryByCy } = wrappedRender(<GlobalNavAccount {...baseProps} isLoggedIn isPremium />)
    expect(queryByCy('upgrade-link')).toBeFalsy()
  })

  it('renders the user’s avatar when signed in, using props.avatarSrc', () => {
    const { getByRole } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn avatarSrc="placekitten.com/50/50" />
    )
    expect(getByRole('img')).toHaveAttribute('src', 'placekitten.com/50/50')
  })

  it('renders the "view profile" menu link using props.profileUrl as the href', () => {
    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn profileUrl="https://getpocket.com/123kitties" />
    )
    const profileLink = getByCy('account-menu-profile-link')
    expect(profileLink).toHaveAttribute('href', 'https://getpocket.com/123kitties')
  })

  it('renders the "view profile" menu link using props.accountName as the display name', () => {
    const { getByText } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn accountName="George The Magnanimous" />
    )
    expect(getByText('George The Magnanimous'))
  })

  it('renders bubble notifications when set', () => {
    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn showNotification />
    )
    expect(getByCy('notification-avatar'))
  })

  it('does not render bubble notifications by default', () => {
    const { queryByCy } = wrappedRender(<GlobalNavAccount {...baseProps} isLoggedIn />)
    expect(queryByCy('notification-avatar')).toBeFalsy()
  })

  it('calls the onLogin callback when a login is clicked', () => {
    const onLoginClick = jest.fn()
    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} onLoginClick={onLoginClick} />
    )
    fireEvent.click(getByCy('login-link'))
    expect(onLoginClick).toHaveBeenCalled()
  })

  it('calls the onLinkClick callback when a login is clicked, passing name through', () => {
    const onLinkClick = jest.fn()

    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} onLinkClick={onLinkClick} />
    )

    fireEvent.click(getByCy('signup-link'))
    expect(onLinkClick).toHaveBeenCalledWith('signup')
  })

  it('calls the onAccountClick callback when the account menu is opened', () => {
    const onAccountClick = jest.fn()
    const { getByCy } = wrappedRender(
      <GlobalNavAccount {...baseProps} isLoggedIn onAccountClick={onAccountClick} />
    )
    expect(onAccountClick).not.toHaveBeenCalled()
    fireEvent.click(getByCy('account-menu-avatar'))
    expect(onAccountClick).toHaveBeenCalledTimes(1)
  })
})
