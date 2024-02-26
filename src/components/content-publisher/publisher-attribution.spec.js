import { render } from 'test-utils'
import '@testing-library/jest-dom'

import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { publisher } from 'mock/article'

describe('PublisherAttribution', () => {
  const withCustomButton = publisher.theAtlantic
  const withNoLogo = publisher.noLogoPublisher
  const noArticleCta = publisher.theVerge

  it('renders follow publisher section when including a articleCta', () => {
    const { queryByCy } = render(<PublisherAttribution publisher={withCustomButton} />)
    expect(queryByCy('follow-publisher')).toBeInTheDocument()
  })

  it('doesn’t render a publisher image if logoWide is missing', () => {
    const { queryByCy } = render(<PublisherAttribution publisher={withNoLogo} />)
    expect(queryByCy('publisher-img')).toBeFalsy()
  })

  it('doesn’t render follow publisher section if articleCta is missing', () => {
    const { queryByCy } = render(<PublisherAttribution publisher={noArticleCta} />)
    expect(queryByCy('follow-publisher')).toBeFalsy()
  })
})
