import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'

import ThemedImg from './themed-img'

import internetSaveButton from 'static/images/internet-save-button.svg'

describe('ThemedImg', () => {
  it('renders a light mode image if props.srcLight is provided', () => {
    const img = shallow(<ThemedImg srcLight={internetSaveButton} />)
    const lightImg = img.find("[data-cy='themed-img-light']")

    assert(lightImg.exists())
  })

  it('renders a dark mode image if props.srcDark is provided', () => {
    const img = shallow(<ThemedImg srcDark={internetSaveButton} />)
    const darkImg = img.find("[data-cy='themed-img-dark']")

    assert(darkImg.exists())
  })

  it('renders a sepia mode image if props.srcSepia is provided', () => {
    const img = shallow(<ThemedImg srcSepia={internetSaveButton} />)
    const sepiaImg = img.find("[data-cy='themed-img-sepia']")

    assert(sepiaImg.exists())
  })

  it('renders images for all color modes if props.srcLight, props.srcDark, and props.srcSepia are provided', () => {
    const img = shallow(
      <ThemedImg
        srcLight={internetSaveButton}
        srcDark={internetSaveButton}
        srcSepia={internetSaveButton}
      />
    )
    const lightImg = img.find("[data-cy='themed-img-light']")
    const darkImg = img.find("[data-cy='themed-img-dark']")
    const sepiaImg = img.find("[data-cy='themed-img-sepia']")

    assert(lightImg.exists() && darkImg.exists() && sepiaImg.exists())
  })

  it('does not wrap the images with <figure> if useWrapper prop is false', () => {
    const img = shallow(
      <ThemedImg srcLight={internetSaveButton} useWrapper={false} />
    )
    const wrapper = img.find("[data-cy='figure-wrapper']")

    assert(!wrapper.exists())
  })

  it('returns a img element using the alt value, if provided', () => {
    const img = shallow(
      <ThemedImg
        srcLight={internetSaveButton}
        alt="A button to save the internet"
      />
    )
    const lightImg = img.find("[data-cy='themed-img-light']")

    assert.equal(lightImg.name(), 'img')
    assert.equal(lightImg.prop('alt'), 'A button to save the internet')
  })
})
