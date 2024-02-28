import { render } from 'test-utils'
import '@testing-library/jest-dom'

import PocketRecs, { Publisher } from './pocket-recs'
import { pocketRecommendations as pocketRecs } from 'mock/article'

describe('PocketRecs', () => {
  const { relatedEndOfArticle: recommendations } = pocketRecs

  it('does not render <Heading> or <Recommendations> when there are no recommendations', () => {
    const { queryByCy } = render(<Publisher recommendations={[]} />)
    expect(queryByCy('pocket-recs-heading')).toBeFalsy()
    expect(queryByCy('pocket-recommended-articles')).toBeFalsy()
  })

  // TODO: Update once the recs api returns a new logo url
  describe('Publisher', () => {
    it('renders a Publisher with a logo image, when available', () => {
      const { corpusItem } = recommendations[0]
      const { publisher, target } = corpusItem
      const { queryByCy } = render(
        <Publisher name={publisher} logo={target?.publisher?.logoWideBlack} />
      )
      expect(queryByCy('pocket-rec-publisher-logo')).toBeTruthy()
    })

    it('renders the name of the Publisher when its logo url is not available', () => {
      const { corpusItem } = recommendations[0]
      const { publisher } = corpusItem
      const { queryByCy } = render(<Publisher name={publisher} />)
      expect(queryByCy('pocket-rec-publisher-logo')).toBeFalsy()
      expect(queryByCy('pocket-rec-publisher-name')).toHaveTextContent(publisher)
    })
  })

  describe('Recommendations', () => {
    const tooManyRecs = [...recommendations, ...recommendations]
    const tooFewRecs = recommendations.slice(0, 2)
    const maxRecs = 3

    it('limits the displayed articles to the max count if more than the max was passed in', () => {
      const { queryAllByCy } = render(
        <PocketRecs recommendations={tooManyRecs} maxRecommendations={maxRecs} />
      )
      expect(queryAllByCy('pocket-recs-article')).toHaveLength(3)
    })

    it('displays all articles passed in if less than the max number of articles', () => {
      const { queryAllByCy } = render(
        <PocketRecs recommendations={tooFewRecs} maxRecommendations={maxRecs} />
      )
      expect(queryAllByCy('pocket-recs-article')).toHaveLength(2)
    })
  })
})
