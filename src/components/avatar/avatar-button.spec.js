import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { mockEvent } from '@pocket/web-utilities/test-utils'

import { AvatarButton } from './avatar-button'

describe('Avatar', () => {
  const baseProps = {
    size: '123px',
    label: 'view your kitties'
  }

  it('Passes the size prop to the avatar element', () => {
    const button = shallow(<AvatarButton {...baseProps} />)
    const avatar = button.find("[data-cy='avatar-button-avatar-']")

    assert.strictEqual(avatar.prop('size'), baseProps.size)
  })

  it('Passes the src prop to the avatar element', () => {
    const button = shallow(
      <AvatarButton {...baseProps} src="http://placekitten.com/150/150" />
    )
    const avatar = button.find("[data-cy='avatar-button-avatar-']")

    assert.strictEqual(avatar.prop('src'), 'http://placekitten.com/150/150')
  })

  it('Applies a title attribute to the button if props.label is provided', () => {
    const button = shallow(<AvatarButton {...baseProps} />)

    assert.strictEqual(button.prop('title'), baseProps.label)
  })

  it('Calls the props.onClick callback when the button is clicked', () => {
    const spy = sinon.spy()
    const button = shallow(<AvatarButton {...baseProps} onClick={spy} />)

    button.simulate('click', mockEvent)

    assert(spy.calledOnce)
  })

  it('applies a css class name to the button element if props.className is provided', () => {
    const button = shallow(
      <AvatarButton {...baseProps} className="tiger-stripes" />
    )

    assert(button.prop('className').includes('tiger-stripes'))
  })
})
