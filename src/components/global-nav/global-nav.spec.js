import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'

import GlobalNav, { DEFAULT_LINKS } from './global-nav'

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
      id: 'chulupa-id',
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
  it('renders the "Discover" and "My List" links by default', () => {
    const globalNav = shallow(
      <GlobalNav appRootSelector="#root" flagsReady={true} />
    )
    const defaultLinks = globalNav.find("[data-cy='primary-links']")

    assert(defaultLinks.exists())
    assert.equal(
      defaultLinks.shallow().find('a').get(0).props['href'],
      DEFAULT_LINKS[0].url
    )
    assert.equal(
      defaultLinks.shallow().find('a').get(1).props['href'],
      DEFAULT_LINKS[1].url
    )
  })

  it('renders the custom links when `links` prop is passed', () => {
    const globalNav = shallow(<GlobalNav {...baseProps} />)
    const passedLinks = globalNav.find("[data-cy='primary-links']")

    assert(passedLinks.exists())
    assert.equal(
      passedLinks.shallow().find('a').get(0).props['href'],
      baseProps.links[0].url
    )
    assert.equal(
      passedLinks.shallow().find('a').get(1).props['href'],
      baseProps.links[1].url
    )
  })

  it('renders elements passed in `children` prop instead of standard nav, if provided', () => {
    const CustomNav = () => {}
    const globalNav = shallow(
      <GlobalNav appRootSelector="#root" flagsReady={true}>
        <CustomNav />
      </GlobalNav>
    )

    assert(globalNav.find(CustomNav).exists())
  })

  it('uses the correct URL when a user clicks the Pocket Logo', () => {
    // default value
    const globalNav = shallow(
      <GlobalNav appRootSelector="#root" flagsReady={true} />
    )
    const defaultLogoUrl = globalNav.find("[data-cy='logo-link']")

    assert.equal(defaultLogoUrl.prop('href'), '/explore?src=navbar')

    // passed prop value
    const globalNav2 = shallow(
      <GlobalNav
        flagsReady={true}
        appRootSelector="#root"
        pocketLogoOutboundUrl="https://cheeseburger.io"
      />
    )
    const customLogoUrl = globalNav2.find("[data-cy='logo-link']")
    assert.equal(customLogoUrl.prop('href'), 'https://cheeseburger.io')
  })
})
