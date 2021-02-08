import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'

import Avatar from './avatar'

describe('Avatar', () => {
  const baseProps = {
    size: '123px'
  }

  it('Sets the width & height styles of the avatar element to the size provided', () => {
    const avatar = shallow(<Avatar {...baseProps} />)

    assert.strictEqual(avatar.prop('style').width, '123px')
    assert.strictEqual(avatar.prop('style').height, '123px')
  })

  it('Renders a default icon if props.src isn’t provided', () => {
    const avatar = shallow(<Avatar {...baseProps} />)

    assert(avatar.find("[data-cy='avatar-default-']").exists())
  })

  it('Renders an image tag with src if props.src is provided', () => {
    const avatar = shallow(
      <Avatar {...baseProps} src="http://placekitten.com/150/150" />
    )
    const img = avatar.find("[data-cy='avatar-image-']")

    assert(img.exists())
    assert.strictEqual(img.prop('src'), 'http://placekitten.com/150/150')
  })

  it('Includes alt text on the image tag if props.altText is provided', () => {
    const avatar = shallow(
      <Avatar
        {...baseProps}
        src="http://placekitten.com/150/150"
        altText="kitties!"
      />
    )
    const img = avatar.find("[data-cy='avatar-image-']")

    assert.strictEqual(img.prop('alt'), 'kitties!')
  })

  it('applies a css class name to the outer node if props.className is provided', () => {
    const avatar = shallow(<Avatar {...baseProps} className="tiger-stripes" />)

    assert(avatar.prop('className').includes('tiger-stripes'))
  })
})
