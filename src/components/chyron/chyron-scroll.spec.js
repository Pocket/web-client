import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { ScrollChyron } from './chyron-scroll'

describe('ScrollChyron', () => {
  const baseProps = {
    instanceId: 'chyron-scroll.spec',
    children: <h1>testing!</h1>
  }

  it('renders with children without problem', () => {
    const element = shallow(<ScrollChyron {...baseProps} />)
    let chyron = element.find("[data-cy='scroll-chyron-wrapper']")
    assert(element.exists())
    assert(chyron.exists())
  })

  it('does not render when shouldHide is true', () => {
    const element = shallow(<ScrollChyron {...baseProps} shouldHide />)
    let chyron = element.find("[data-cy='scroll-chyron-wrapper']")
    assert(element.exists())
    assert(!chyron.exists())
  })
})
