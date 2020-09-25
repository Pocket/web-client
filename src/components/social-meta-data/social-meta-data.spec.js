import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { testIdSelector } from '@pocket/web-utilities/test-utils'
import { SocialMetaData } from './social-meta-data'

const mockMetaContentData = {
  url: 'http://endless.horse/',
  description: 'An endless hooooooooooooooooooooooooooooorse',
  title: 'Yes, but why?'
}

const mockMetaImageData = {
  image: 'https://www.placecage.com/c/200/300'
}

const expectedTags = [
  'meta-description',
  'itemprop-name',
  'itemprop-description',
  'twitter-card',
  'twitter-url',
  'twitter-title',
  'twitter-description',
  'twitter-site',
  'fb-app_id',
  'og-type',
  'og-url',
  'og-title',
  'og-description',
  'og-site_name'
]

const optionalTags = ['itemprop-image', 'twitter-image', 'og-image']

describe('SocialMetaData', () => {
  it('renders tags when complete meta data is passed in', () => {
    const mockMetaData = Object.assign(
      {},
      mockMetaContentData,
      mockMetaImageData
    )
    const socialMetaTags = shallow(<SocialMetaData {...mockMetaData} />)

    const expectedTagsMissing = expectedTags.filter((tag) => {
      const foundTag = socialMetaTags.find(testIdSelector(tag))
      return !foundTag.exists()
    })

    const optionalTagsMissing = optionalTags.filter((tag) => {
      const foundTag = socialMetaTags.find(testIdSelector(tag))
      return !foundTag.exists()
    })

    assert(expectedTagsMissing.length === 0)
    assert(optionalTagsMissing.length === 0)
  })

  it('renders text only tags when meta data is passed in without an image', () => {
    const mockMetaData = Object.assign({}, mockMetaContentData)
    const socialMetaTags = shallow(<SocialMetaData {...mockMetaData} />)

    const expectedTagsMissing = expectedTags.filter((tag) => {
      const foundTag = socialMetaTags.find(testIdSelector(tag))
      return !foundTag.exists()
    })

    const optionalTagsMissing = optionalTags.filter((tag) => {
      const foundTag = socialMetaTags.find(testIdSelector(tag))
      return !foundTag.exists()
    })

    assert(expectedTagsMissing.length === 0)
    assert(optionalTagsMissing.length > 0)
  })

  it('renders nothing when title, description, or url are not present', () => {
    const mockMetaData = Object.assign({}, mockMetaImageData)
    const socialMetaTags = shallow(<SocialMetaData {...mockMetaData} />)

    assert(socialMetaTags.type() === null)
  })

  it('displays default og:type element when type not included as a prop', () => {
    const mockMetaData = Object.assign({}, mockMetaContentData)
    const socialMetaTags = shallow(<SocialMetaData {...mockMetaData} />)
    const typeTag = socialMetaTags.find(testIdSelector('og-type')).prop('content')

    assert(typeTag === "website")
  })

  it('updates og:type element when including type prop', () => {
    const customTypeTag = 'gorgonzola'
    const mockMetaData = Object.assign({}, mockMetaContentData)
    const socialMetaTags = shallow(<SocialMetaData {...mockMetaData} type={customTypeTag} />)
    const typeTag = socialMetaTags.find(testIdSelector('og-type')).prop('content')

    assert(typeTag === customTypeTag)
  })
})
