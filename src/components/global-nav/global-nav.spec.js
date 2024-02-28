import { wrappedRender, mockModal } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

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
    const { getAllByCy } = wrappedRender(<GlobalNav appRootSelector="#root" flagsReady={true} />)
    const defaultLinks = getAllByCy(/global-nav-(.+)-link/)
    expect(defaultLinks).toHaveLength(2)
    expect(defaultLinks[0]).toHaveAttribute('href', DEFAULT_LINKS[0].url)
    expect(defaultLinks[1]).toHaveAttribute('href', DEFAULT_LINKS[1].url)
  })

  it('renders the custom links when `links` prop is passed', () => {
    const { queryAllByCy, getByCy } = wrappedRender(
      <GlobalNav appRootSelector="#root" flagsReady={true} {...baseProps} />
    )
    const defaultLinks = queryAllByCy(/global-nav-(.+)-link/)
    expect(defaultLinks).toHaveLength(0)
    expect(getByCy('cheeseburger-id')).toHaveAttribute('href', baseProps.links[0].url)
    expect(getByCy('chalupa-id')).toHaveAttribute('href', baseProps.links[1].url)
  })

  it('renders elements passed in `children` prop instead of standard nav, if provided', () => {
    const CustomNav = () => <button>Testing</button>
    const { getByText } = wrappedRender(
      <GlobalNav appRootSelector="#root" flagsReady={true}>
        <CustomNav />
      </GlobalNav>
    )
    expect(getByText('Testing'))
  })

  it('uses the correct custom URL when a user clicks the Pocket Logo', () => {
    const { getByCy } = wrappedRender(
      <GlobalNav
        appRootSelector="#root"
        flagsReady={true}
        pocketLogoOutboundUrl="https://cheeseburger.io"
      />
    )
    expect(getByCy('logo-link')).toHaveAttribute('href', 'https://cheeseburger.io')
  })
})
