import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { PublisherRecs, Publisher } from './publisher-recs'
import { publisher, publisherRecommendations as publisherRecs } from 'mock/article'

describe('PublisherRecs', () => {
  it('does not render <Publisher> or <RecommendedArticle> when there are no recommendations', () => {
    const { container } = render(<PublisherRecs />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('RecommendedArticle', () => {
  const recommendations = publisherRecs.relatedRightRail
  const publisherProps = publisher.theVerge
  const tooManyRecs = recommendations.slice(0, 8)
  const tooFewRecs = recommendations.slice(0, 2)

  const maxRecs = 3

  it('limits the displayed articles to the max count if more than the max was passed in', () => {
    const { queryAllByCy } = render(
      <PublisherRecs
        publisher={publisherProps}
        recommendations={tooManyRecs}
        maxRecommendations={maxRecs}
      />
    )
    expect(queryAllByCy('publisher-recs-article')).toHaveLength(3)
  })

  it('displays all articles passed in if less than the max number of articles', () => {
    const { queryAllByCy } = render(
      <PublisherRecs
        publisher={publisherProps}
        recommendations={tooFewRecs}
        maxRecommendations={maxRecs}
      />
    )
    expect(queryAllByCy('publisher-recs-article')).toHaveLength(2)
  })
})

describe('Publisher', () => {
  const publisherProps = publisher.theVerge

  it('renders a Publisher with a logo image, when available', () => {
    const { queryByCy } = render(<Publisher {...publisherProps} />)
    expect(queryByCy('publisher-logo')).toHaveAttribute('src', publisherProps.logo)
  })

  it('renders a Publisher with no logo when its logo url is not available', () => {
    const { recommendationName } = publisherProps
    const { queryByCy } = render(<Publisher recommendationName={recommendationName} />)
    expect(queryByCy('publisher-logo')).toBeFalsy()
  })

  it('renders a Publisher recommendationName, when available', () => {
    const { getByCy } = render(<Publisher {...publisherProps} name="This will not be used" />)
    expect(getByCy('publisher-recs-publisher-name')).toBeTruthy()
  })

  it('renders a Publisher name when a publisher has no recommendationName', () => {
    const { name, logo } = publisherProps
    const { getByCy } = render(<Publisher recommendationName={null} name={name} logo={logo} />)
    expect(getByCy('publisher-recs-publisher-name')).toBeTruthy()
  })
})
