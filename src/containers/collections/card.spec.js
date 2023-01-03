import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { collectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { partnerCollectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { ItemCard as CollectionCard } from 'containers/collections/card'
import { deriveCollection } from 'common/api/derivers/item'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedCollection = deriveCollection(collectionFromClientApi)

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    collectionsBySlug: {
      [derivedCollection.slug]: derivedCollection
    }
  }

  beforeAll(() => mockAllIsIntersecting())

  it('renders a collection', () => {
    const { getByCy } = wrappedRender(<CollectionCard id={derivedCollection.slug} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
