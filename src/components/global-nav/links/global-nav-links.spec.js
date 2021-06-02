import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { mockEvent } from '@pocket/web-utilities/test-utils'

import GlobalNavLinks from './global-nav-links'
const baseProps = {
  links: [
    {
      name: 'cheeses',
      label: 'Cheeses',
      url: 'https://cheese.com'
    },
    { name: 'chocolates', label: 'Chocolates', url: 'https://frans.com' }
  ]
}

describe('GlobalNavLinks', () => {
  it('renders the correct number of links', () => {
    const links = shallow(<GlobalNavLinks {...baseProps} />)
    const linkAnchors = links.find('a')

    assert.equal(linkAnchors.length, 2)
  })

  it('renders the links with correct labels as specified in the `links` prop', () => {
    const links = shallow(<GlobalNavLinks {...baseProps} />)
    const linkAnchors = links.find('a')

    assert.equal(linkAnchors.at(0).text(), baseProps.links[0].label)
    assert.equal(linkAnchors.at(1).text(), baseProps.links[1].label)
  })

  it('renders the links with correct urls as specified in the `links` prop', () => {
    const links = shallow(<GlobalNavLinks {...baseProps} />)
    const linkAnchors = links.find('Link')

    assert.equal(linkAnchors.at(0).prop('href'), baseProps.links[0].url)
    assert.equal(linkAnchors.at(1).prop('href'), baseProps.links[1].url)
  })

  it('applies the "selected" link state correctly based on props.selectedLink', () => {
    const links = shallow(
      <GlobalNavLinks {...baseProps} selectedLink={baseProps.links[0].name} />
    )
    const linkAnchors = links.find('a')

    assert.equal(linkAnchors.at(0).prop('className'), 'selected')
    assert.notEqual(linkAnchors.at(1).prop('className'), 'selected')
  })

  it('calls the props.onLinkClick callback with the name and url of a link when clicked', () => {
    const spy = sinon.spy()
    const links = shallow(<GlobalNavLinks {...baseProps} onLinkClick={spy} />)
    const firstLink = links.find('a').at(0)

    firstLink.simulate('click', mockEvent)

    assert(spy.calledWith(baseProps.links[0].name, baseProps.links[0].url))
  })
})
