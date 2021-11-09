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

import { collectionFromClientApi } from 'common/api/derivers/collection/page.spec'
import { partnerCollectionFromClientApi } from 'common/api/derivers/collection/page.spec'

import { storyFromClientApi } from 'common/api/derivers/collection/story.spec'

import { lineupAnalytics } from 'common/api/derivers/discover/discover.spec'
import { slateAnalytics } from 'common/api/derivers/discover/discover.spec'
import { recommendationsFromSlate } from 'common/api/derivers/discover/discover.spec'

import { ItemCard as DiscoverCard } from 'connectors/item-card/discover/card'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'

import { ItemCard as MyListCard } from 'connectors/item-card/my-list/card'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'

import { ItemCard as StoryCard } from 'connectors/item-card/collection/story-card'
import { deriveCollectionStories } from 'connectors/items-by-id/collection/stories.derive'

import { ItemCard as CollectionCard } from 'connectors/item-card/collection/collection-card'
import { deriveCollectionPage } from 'connectors/items-by-id/collection/page.derive'

describe('ItemCard', () => {
  //Legacy Derivers
  const derivedDiscoverItem = deriveDiscoverItems([recommendationsFromSlate])[0]

  const derivedSavedParsed = deriveMyListItems([savedParsedFromV3])[0]
  const derivedSavedUnparsed = deriveMyListItems([savedUnparsedFromV3])[0]
  const derivedSavedVideo = deriveMyListItems([savedVideoFromV3])[0]
  const derivedSavedImage = deriveMyListItems([savedImageFromV3])[0]
  const derivedSavedLegacy = deriveMyListItems([savedLegacyListItem])[0]
  const deriveSavedCollection = deriveMyListItems([savedCollectionFromV3])[0]

  const derivedStory = deriveCollectionStories([storyFromClientApi])[0]
  const derivedCollection = deriveCollectionPage([collectionFromClientApi])[0]

  const initialState = {
    user: { auth: true },
    analytics: {
      impressions: []
    },
    discoverItemsById: {
      [derivedDiscoverItem.item_id]: derivedDiscoverItem
    },
    myListItemsById: {
      [derivedSavedParsed.item_id]: derivedSavedParsed,
      [derivedSavedUnparsed.item_id]: derivedSavedUnparsed,
      [derivedSavedVideo.item_id]: derivedSavedVideo,
      [derivedSavedImage.item_id]: derivedSavedImage,
      [derivedSavedLegacy.item_id]: derivedSavedLegacy,
      [deriveSavedCollection.item_id]: deriveSavedCollection
    },
    collectionsBySlug: {
      [derivedCollection.item_id]: derivedCollection
    },
    collectionStoriesById: {
      [derivedStory.item_id]: derivedStory
    },
    homeItemsById: {}
  }

  beforeAll(() => {
    mockAllIsIntersecting()
  })

  // Discover card
  it('renders a discover item', () => {
    const { getByCy } = wrappedRender(<DiscoverCard id={derivedDiscoverItem.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
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

  it('renders a savedvideo', () => {
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

  it('renders a story', () => {
    const { getByCy } = wrappedRender(<StoryCard id={derivedStory.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })

  it('renders a collection', () => {
    const { getByCy } = wrappedRender(<CollectionCard id={derivedCollection.item_id} position={3} />, { initialState }) //prettier-ignore
    expect(getByCy('article-card-', { exact: false })).toMatchSnapshot()
  })
})
