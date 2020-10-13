import assert from 'assert'
import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { mockEvent } from '@pocket/web-utilities/test-utils'

import GlobalNavTools from './global-nav-tools'
import { PlayIcon, TagIcon } from 'components/icons/icons'

describe('GlobalNavTools', () => {
  const baseProps = {
    tools: [
      {
        name: 'cheeses',
        label: 'Cheeses',
        icon: <PlayIcon />,
      },
      { name: 'chocolates', label: 'Chocolates', icon: <TagIcon /> },
    ],
  }

  it('renders the correct number of buttons', () => {
    const tools = shallow(<GlobalNavTools {...baseProps} />)
    const toolButtons = tools.find('button')

    assert.equal(toolButtons.length, 2)
  })

  it('renders the buttons with correct title attributes as specified in the `tools` prop', () => {
    const tools = shallow(<GlobalNavTools {...baseProps} />)
    const toolButtons = tools.find('button')

    assert.equal(toolButtons.at(0).prop('title'), baseProps.tools[0].label)
    assert.equal(toolButtons.at(1).prop('title'), baseProps.tools[1].label)
  })

  it('renders the buttons with correct icons as specified in the `links` prop', () => {
    const tools = shallow(<GlobalNavTools {...baseProps} />)
    const toolButtons = tools.find('button')

    assert(toolButtons.at(0).find(PlayIcon).exists())
    assert(toolButtons.at(1).find(TagIcon).exists())
  })

  it('calls the props.onToolClick callback with the name of the tool when clicked', () => {
    const spy = sinon.spy()
    const tools = shallow(<GlobalNavTools {...baseProps} onToolClick={spy} />)
    const firstButton = tools.find('button').at(0)

    firstButton.simulate('click', mockEvent)

    assert(spy.calledWith(baseProps.tools[0].name))
  })
})
