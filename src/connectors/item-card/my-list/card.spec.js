import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { savedParsedFromV3 } from 'common/api/derivers/list/parsed.spec'
import { savedParsedFromClientApi } from 'common/api/derivers/list/parsed.spec'

import { savedUnparsedFromV3 } from 'common/api/derivers/list/unparsed.spec'
import { savedUnparsedFromClientApi } from 'common/api/derivers/list/unparsed.spec'

import { savedVideoFromV3 } from 'common/api/derivers/list/video.spec'
import { savedVideoFromClientApi } from 'common/api/derivers/list/video.spec'

import { savedImageFromV3 } from 'common/api/derivers/list/image.spec'
import { savedImageFromClientApi } from 'common/api/derivers/list/image.spec'

import { savedLegacyListItem } from 'common/api/derivers/list/legacy.spec'
import { savedLegacyListItemFromClientApi } from 'common/api/derivers/list/legacy.spec'

import { savedCollectionFromV3 } from 'common/api/derivers/list/collection.spec'
import { savedCollectionFromClientApi } from 'common/api/derivers/list/collection.spec'

import { ItemCard as MyListCard } from 'connectors/item-card/my-list/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'

describe('ItemCard', () => {
  //Legacy Derivers

  const derivedSavedParsed = deriveMyListItems([savedParsedFromV3])[0]
  const derivedSavedUnparsed = deriveMyListItems([savedUnparsedFromV3])[0]
  const derivedSavedVideo = deriveMyListItems([savedVideoFromV3])[0]
  const derivedSavedImage = deriveMyListItems([savedImageFromV3])[0]
  const derivedSavedLegacy = deriveMyListItems([savedLegacyListItem])[0]
  const deriveSavedCollection = deriveMyListItems([savedCollectionFromV3])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    myListItemsById: {
      [derivedSavedParsed.item_id]: derivedSavedParsed,
      [derivedSavedUnparsed.item_id]: derivedSavedUnparsed,
      [derivedSavedVideo.item_id]: derivedSavedVideo,
      [derivedSavedImage.item_id]: derivedSavedImage,
      [derivedSavedLegacy.item_id]: derivedSavedLegacy,
      [deriveSavedCollection.item_id]: deriveSavedCollection
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // My List cards
  it('renders a saved article that can be parsed', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedParsed.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved article that can`t be parsed', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedUnparsed.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved collection', () => {
    const { getByCy } = wrappedRender(<MyListCard id={deriveSavedCollection.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved video', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedVideo.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved image', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedImage.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a legacy saved item', () => {
    const { getByCy } = wrappedRender(<MyListCard id={derivedSavedLegacy.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
