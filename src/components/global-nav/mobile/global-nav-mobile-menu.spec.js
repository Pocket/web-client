import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { mockEvent } from '@pocket/web-utilities/test-utils'
import { testIdSelector } from '@pocket/web-utilities/test-utils'

import GlobalNavMobileMenu, { Menu, MobileLink } from './global-nav-mobile-menu'
import { Drawer } from '@pocket/web-ui'

const baseProps = {
  appRootSelector: '#root',
  isOpen: true,
  links: [
    {
      name: 'cheeses',
      id: 'cheeses-id',
      label: 'Cheeses',
      url: 'https://cheese.com'
    },
    {
      name: 'chocolates',
      id: 'chocolates-id',
      label: 'Chocolates',
      url: 'https://frans.com'
    }
  ]
}

describe('GlobalNavMobileMenu', () => {
  it('shows the menu when reflecting the `isOpen` prop', () => {
    // Menu is held in the drawer component
    const wrapper = shallow(
      <GlobalNavMobileMenu {...baseProps} isOpen={true} />
    )
    const drawer = wrapper.find(Drawer)

    assert.equal(drawer.prop('isOpen'), true)

    const wrapper2 = shallow(
      <GlobalNavMobileMenu {...baseProps} isOpen={false} />
    )
    const drawer2 = wrapper2.find(Drawer)

    assert.equal(drawer2.prop('isOpen'), false)
  })

  it('renders a premium section only when a user is logged in, but NOT premium', () => {
    const wrapper = shallow(
      <GlobalNavMobileMenu
        {...baseProps}
        isUserLoggedIn={true}
        isUserPremium={false}
      />
    )
    const menu = wrapper.find(Menu).shallow()

    assert(menu.find(testIdSelector('premium-nudge-section')).exists())

    const wrapper2 = shallow(
      <GlobalNavMobileMenu
        {...baseProps}
        isUserLoggedIn={true}
        isUserPremium={true}
      />
    )
    const menu2 = wrapper2.find(Menu).shallow()

    assert(!menu2.find(testIdSelector('premium-nudge-section')).exists())
  })

  it('renders the correct number of links', () => {
    const wrapper = shallow(<GlobalNavMobileMenu {...baseProps} />)
    const links = wrapper.find(Menu).dive().find(MobileLink)

    assert.equal(links.length, 2)
  })

  it('renders the links with correct labels as specified in the `links` prop', () => {
    const wrapper = shallow(<GlobalNavMobileMenu {...baseProps} />)
    const links = wrapper.find(Menu).dive().find(MobileLink)

    const firstLink = links.at(0).dive().find('a')
    const secondLink = links.at(1).dive().find('a')

    assert.equal(firstLink.text(), baseProps.links[0].label)
    assert.equal(secondLink.text(), baseProps.links[1].label)
  })

  it('renders the links with correct urls as specified in the `links` prop', () => {
    const wrapper = shallow(<GlobalNavMobileMenu {...baseProps} />)
    const links = wrapper.find(Menu).dive().find(MobileLink)

    const firstLink = links.at(0).dive().find('a')
    const secondLink = links.at(1).dive().find('a')

    assert.equal(firstLink.prop('href'), baseProps.links[0].url)
    assert.equal(secondLink.prop('href'), baseProps.links[1].url)
  })

  it('applies the "selected" link state correctly based on props.selectedLink', () => {
    const wrapper = shallow(
      <GlobalNavMobileMenu
        {...baseProps}
        selectedLink={baseProps.links[0].name}
      />
    )
    const links = wrapper.find(Menu).dive().find(MobileLink)

    const firstLink = links.at(0).dive().find('a')

    assert.equal(firstLink.prop('className'), 'selected')
  })

  it('calls the props.onLinkClick callback with the name and url of a link when clicked', () => {
    const spy = sinon.spy()
    const wrapper = shallow(
      <GlobalNavMobileMenu {...baseProps} onLinkClick={spy} />
    )
    const links = wrapper.find(Menu).dive().find(MobileLink)

    const firstLink = links.at(0).dive().find('a')

    firstLink.simulate('click', mockEvent)

    assert(spy.calledWith(baseProps.links[0].name, baseProps.links[0].url))
  })
})
