import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { collectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { partnerCollectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { ItemCard as CollectionCard } from 'connectors/item-card/collection/collection-card'
import { deriveCollectionPage } from 'connectors/items-by-id/collection/page.derive'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedCollection = deriveCollectionPage([collectionFromClientApi])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    collectionsBySlug: {
      [derivedCollection.item_id]: derivedCollection
    }
  }

  beforeAll(() => mockAllIsIntersecting())

  it('renders a collection', () => {
    const { getByCy } = wrappedRender(<CollectionCard id={derivedCollection.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
