import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

import { savedParsedFromClientApi } from 'common/api/derivers/list/parsed.spec'
import { savedUnparsedFromClientApi } from 'common/api/derivers/list/unparsed.spec'
import { savedVideoFromClientApi } from 'common/api/derivers/list/video.spec'
import { savedImageFromClientApi } from 'common/api/derivers/list/image.spec'
import { savedLegacyListItemFromClientApi } from 'common/api/derivers/list/legacy.spec'
import { savedCollectionFromClientApi } from 'common/api/derivers/list/collection.spec'

import { ItemCard as SavesCard } from 'connectors/item-card/saves/card'
import { deriveListItem } from 'common/api/derivers/item'

describe('ItemCard', () => {
  //Legacy Derivers

  const derivedSavedParsed = deriveListItem(savedParsedFromClientApi)
  const derivedSavedUnparsed = deriveListItem(savedUnparsedFromClientApi)
  const derivedSavedVideo = deriveListItem(savedVideoFromClientApi)
  const derivedSavedImage = deriveListItem(savedImageFromClientApi)
  const derivedSavedLegacy = deriveListItem(savedLegacyListItemFromClientApi)
  const deriveSavedCollection = deriveListItem(savedCollectionFromClientApi)

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    savesItemsById: {
      [derivedSavedParsed.itemId]: derivedSavedParsed,
      [derivedSavedUnparsed.itemId]: derivedSavedUnparsed,
      [derivedSavedVideo.itemId]: derivedSavedVideo,
      [derivedSavedImage.itemId]: derivedSavedImage,
      [derivedSavedLegacy.itemId]: derivedSavedLegacy,
      [deriveSavedCollection.itemId]: deriveSavedCollection
    }
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // Saves cards
  it('renders a saved article that can be parsed', () => {
    const { getByCy } = wrappedRender(<SavesCard id={derivedSavedParsed.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved article that can`t be parsed', () => {
    const { getByCy } = wrappedRender(<SavesCard id={derivedSavedUnparsed.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved collection', () => {
    const { getByCy } = wrappedRender(<SavesCard id={deriveSavedCollection.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved video', () => {
    const { getByCy } = wrappedRender(<SavesCard id={derivedSavedVideo.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a saved image', () => {
    const { getByCy } = wrappedRender(<SavesCard id={derivedSavedImage.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a legacy saved item', () => {
    const { getByCy } = wrappedRender(<SavesCard id={derivedSavedLegacy.itemId} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
