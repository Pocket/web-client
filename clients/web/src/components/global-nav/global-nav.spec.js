import { render, mockModal } from '@config/jest'
import '@testing-library/jest-dom'

import GlobalNav from './global-nav'
import { DEFAULT_LINKS } from './links/global-nav-links'

const handleLinkClick = () => {}

const baseProps = {
  links: [
    {
      name: 'cheeseburger',
      id: 'cheeseburger-id',
      label: 'Cheeseburger',
      url: 'https://cheeseburger.io'
    },
    {
      name: 'chalupa',
      id: 'chalupa-id',
      label: 'Chalupa',
      url: 'http://chalupa.biz'
    }
  ],
  flagsReady: true,
  selectedLink: 'chalupa',
  onLinkClick: handleLinkClick,
  appRootSelector: '#root'
}

describe('GlobalNav', () => {
  mockModal()
  it('renders the "Discover" and "Saves" links by default', () => {
    const { getAllByTestId } = render(<GlobalNav appRootSelector="#root" flagsReady={true} />)
    const defaultLinks = getAllByTestId(/global-nav-(.+)-link/)
    expect(defaultLinks).toHaveLength(2)
    expect(defaultLinks[0]).toHaveAttribute('href', DEFAULT_LINKS[0].url)
    expect(defaultLinks[1]).toHaveAttribute('href', DEFAULT_LINKS[1].url)
  })

  it('renders the custom links when `links` prop is passed', () => {
    const { queryAllByTestId, getByTestId } = render(
      <GlobalNav appRootSelector="#root" flagsReady={true} {...baseProps} />
    )
    const defaultLinks = queryAllByTestId(/global-nav-(.+)-link/)
    expect(defaultLinks).toHaveLength(0)
    expect(getByTestId('cheeseburger-id')).toHaveAttribute('href', baseProps.links[0].url)
    expect(getByTestId('chalupa-id')).toHaveAttribute('href', baseProps.links[1].url)
  })

  it('renders elements passed in `children` prop instead of standard nav, if provided', () => {
    const CustomNav = () => <button>Testing</button>
    const { getByText } = render(
      <GlobalNav appRootSelector="#root" flagsReady={true}>
        <CustomNav />
      </GlobalNav>
    )
    expect(getByText('Testing'))
  })

  it('uses the correct custom URL when a user clicks the Pocket Logo', () => {
    const { getByTestId } = render(
      <GlobalNav
        appRootSelector="#root"
        flagsReady={true}
        pocketLogoOutboundUrl="https://cheeseburger.io"
      />
    )
    expect(getByTestId('logo-link')).toHaveAttribute('href', 'https://cheeseburger.io')
  })
})
