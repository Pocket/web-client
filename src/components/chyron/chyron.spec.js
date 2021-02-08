import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { Chyron } from './chyron'

describe('Chyron', () => {
  const baseProps = {
    instanceId: 'chyron.spec',
    children: <h1>testing!</h1>
  }

  it('renders with children without problem', () => {
    const element = shallow(<Chyron {...baseProps} />)
    let chyron = element.find("[data-cy='chyron-wrapper']")
    assert(element.exists())
    assert(chyron.exists())
  })

  it('does not render when initialDismissed is true', () => {
    const element = shallow(<Chyron {...baseProps} initialDismissed />)
    let chyron = element.find("[data-cy='chyron-wrapper']")
    assert(element.exists())
    assert(!chyron.exists())
  })

  it('does not render when initialSuccess is true', () => {
    const element = shallow(<Chyron {...baseProps} initialSuccess />)
    let chyron = element.find("[data-cy='chyron-wrapper']")
    assert(element.exists())
    assert(!chyron.exists())
  })
})
