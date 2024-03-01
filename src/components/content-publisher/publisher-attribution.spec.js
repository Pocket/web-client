import { render } from '@config/jest'
import '@testing-library/jest-dom'

import { PublisherAttribution } from 'components/content-publisher/publisher-attribution'
import { publisher } from 'mock/article'

describe('PublisherAttribution', () => {
  const withCustomButton = publisher.theAtlantic
  const withNoLogo = publisher.noLogoPublisher
  const noArticleCta = publisher.theVerge

  it('renders follow publisher section when including a articleCta', () => {
    const { queryByTestId } = render(<PublisherAttribution publisher={withCustomButton} />)
    expect(queryByTestId('follow-publisher')).toBeInTheDocument()
  })

  it('doesn’t render a publisher image if logoWide is missing', () => {
    const { queryByTestId } = render(<PublisherAttribution publisher={withNoLogo} />)
    expect(queryByTestId('publisher-img')).toBeFalsy()
  })

  it('doesn’t render follow publisher section if articleCta is missing', () => {
    const { queryByTestId } = render(<PublisherAttribution publisher={noArticleCta} />)
    expect(queryByTestId('follow-publisher')).toBeFalsy()
  })
})
