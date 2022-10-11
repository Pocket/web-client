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

import { ItemCard as SavesCard } from 'connectors/item-card/saves/card'
import { deriveListItem } from 'common/api/derivers/item'

describe('ItemCard', () => {
  //Legacy Derivers

  const derivedSavedParsed = deriveListItem(savedParsedFromV3, true)
  const derivedSavedUnparsed = deriveListItem(savedUnparsedFromV3, true)
  const derivedSavedVideo = deriveListItem(savedVideoFromV3, true)
  const derivedSavedImage = deriveListItem(savedImageFromV3, true)
  const derivedSavedLegacy = deriveListItem(savedLegacyListItem, true)
  const deriveSavedCollection = deriveListItem(savedCollectionFromV3, true)

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
