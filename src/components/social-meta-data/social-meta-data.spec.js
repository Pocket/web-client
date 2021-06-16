import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
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
  'pkt-description',
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
    const mockMetaData = { ...mockMetaContentData, ...mockMetaImageData }
    const { getByCy } = render(<SocialMetaData {...mockMetaData} />)

    expectedTags.forEach((tag) => expect(getByCy(tag)))
    optionalTags.forEach((tag) => expect(getByCy(tag)))
  })

  it('renders text only tags when meta data is passed in without an image', () => {
    const { queryByCy, getByCy } = render(<SocialMetaData {...mockMetaContentData} />)

    expectedTags.forEach((tag) => expect(getByCy(tag)).toBeTruthy())
    optionalTags.forEach((tag) => expect(queryByCy(tag)).toBeFalsy())
  })

  it('renders nothing when title, description, or url are not present', () => {
    const { container } = render(<SocialMetaData {...mockMetaImageData} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('displays default og:type element when type not included as a prop', () => {
    const { getByCy } = render(<SocialMetaData {...mockMetaContentData} />)
    expect(getByCy('og-type')).toHaveAttribute('content', 'website')
  })

  it('updates og:type element when including type prop', () => {
    const customTypeTag = 'gorgonzola'
    const { getByCy } = render(<SocialMetaData {...mockMetaContentData} type={customTypeTag} />)
    expect(getByCy('og-type')).toHaveAttribute('content', customTypeTag)
  })
})
