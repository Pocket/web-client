import { render, fireEvent } from '@config/jest'
import '@testing-library/jest-dom'
import GlobalNavAccount from './global-nav-account'

const baseProps = { appRootSelector: '#root' }

describe('GlobalNavAccount', () => {
  it('renders properly when the user is signed out', () => {
    const { getByTestId } = render(<GlobalNavAccount {...baseProps} isLoggedIn={false} />)
    expect(getByTestId('login-link'))
  })

  it('renders the user’s avatar when signed in, using props.avatarSrc', () => {
    const { getByRole } = render(
      <GlobalNavAccount {...baseProps} isLoggedIn avatarSrc="placekitten.com/50/50" />
    )
    expect(getByRole('img')).toHaveAttribute('src', 'placekitten.com/50/50')
  })

  it('renders the "view profile" menu link using props.profileUrl as the href', () => {
    const { getByTestId } = render(
      <GlobalNavAccount {...baseProps} isLoggedIn profileUrl="https://getpocket.com/123kitties" />
    )
    const profileLink = getByTestId('account-menu-profile-link')
    expect(profileLink).toHaveAttribute('href', 'https://getpocket.com/123kitties')
  })

  it('renders the "view profile" menu link using props.accountName as the display name', () => {
    const { getByText } = render(
      <GlobalNavAccount {...baseProps} isLoggedIn accountName="George The Magnanimous" />
    )
    expect(getByText('George The Magnanimous'))
  })

  it('renders bubble notifications when set', () => {
    const { getByTestId } = render(<GlobalNavAccount {...baseProps} isLoggedIn showNotification />)
    expect(getByTestId('notification-avatar'))
  })

  it('does not render bubble notifications by default', () => {
    const { queryByTestId } = render(<GlobalNavAccount {...baseProps} isLoggedIn />)
    expect(queryByTestId('notification-avatar')).toBeFalsy()
  })

  it('calls the onLogin callback when a login is clicked', () => {
    const onLoginClick = jest.fn()
    const { getByTestId } = render(
      <GlobalNavAccount {...baseProps} isLoggedIn={false} onLoginClick={onLoginClick} />
    )
    fireEvent.click(getByTestId('login-link'))
    expect(onLoginClick).toHaveBeenCalled()
  })

  it('calls the onAccountClick callback when the account menu is opened', () => {
    const onAccountClick = jest.fn()
    const { getByTestId } = render(
      <GlobalNavAccount {...baseProps} isLoggedIn onAccountClick={onAccountClick} />
    )
    expect(onAccountClick).not.toHaveBeenCalled()
    fireEvent.click(getByTestId('account-menu-avatar'))
    expect(onAccountClick).toHaveBeenCalledTimes(1)
  })
})
