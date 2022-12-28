import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { lineupAnalytics } from 'common/api/derivers/discover/discover.spec'
import { slateAnalytics } from 'common/api/derivers/discover/discover.spec'
import { recommendationsFromSlate } from 'common/api/derivers/discover/discover.spec'

import { ItemCard as DiscoverCard } from 'connectors/item-card/discover/card'
import { deriveRecommendation } from 'common/api/derivers/item'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedDiscoverItem = deriveRecommendation(recommendationsFromSlate, {
    lineupAnalytics,
    slateAnalytics
  })

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    discoverItemsById: {
      [derivedDiscoverItem.itemId]: derivedDiscoverItem
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // Discover card
  it('renders a discover item', () => {
    const { getByCy } = wrappedRender(<DiscoverCard id={derivedDiscoverItem.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
