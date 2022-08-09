import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const savedCollectionFromV3 = {
  item_id: '3453456445',
  resolved_id: '3453456445',
  given_url: 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy',
  given_title: '',
  favorite: '0',
  status: '0',
  time_added: '1634839848',
  time_updated: '1634839847',
  time_read: '0',
  time_favorited: '0',
  sort_id: 0,
  resolved_title: 'Delicious Reads About Your Favorite Candy',
  resolved_url: 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy',
  excerpt:
    'From the history of Pez to the science of gummies, and why red Starburst reign supreme\u2014help yourself to some of the most fascinating stories about candy, sure to satisfy your sweet tooth.',
  is_article: '1',
  is_index: '0',
  has_video: '0',
  has_image: '1',
  word_count: '388',
  lang: 'en',
  top_image_url:
    'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png',
  authors: {
    117507886: {
      name: 'Amy Maoz',
      url: ''
    }
  },
  images: {
    1: {
      item_id: '3453456445',
      image_id: '1',
      src: 'https://pocket-image-cache.com/648x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png',
      width: '0',
      height: '0',
      credit: '',
      caption: ''
    }
  },
  domain_metadata: {
    name: 'Pocket',
    logo: 'https://logo.clearbit.com/getpocket.com?size=800'
  },
  listen_duration_estimate: 150
}

export const savedCollectionFromClientApi = {
  node: {
    _createdAt: 1634839848,
    _updatedAt: 1634839847,
    url: 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy',
    status: 'UNREAD',
    isFavorite: false,
    favoritedAt: null,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '3453456445',
      authors: [
        {
          id: '117507886',
          name: 'Amy Maoz',
          url: ''
        }
      ],
      domainMetadata: {
        name: 'Pocket',
        logo: 'https://logo.clearbit.com/getpocket.com?size=800'
      },
      domain: null,
      excerpt:
        'From the history of Pez to the science of gummies, and why red Starburst reign supreme—help yourself to some of the most fascinating stories about candy, sure to satisfy your sweet tooth.',
      hasImage: 'HAS_IMAGES',
      hasVideo: 'NO_VIDEOS',
      images: [
        {
          caption: '',
          credit: '',
          src: 'https://pocket-image-cache.com/648x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png',
          width: 0,
          height: 0,
          imageId: 1
        }
      ],
      isArticle: true,
      isIndex: false,
      resolvedUrl: 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy',
      resolvedId: '3453456445',
      title: 'Delicious Reads About Your Favorite Candy',
      topImageUrl:
        'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png',
      videos: null,
      wordCount: 388,
      datePublished: null,
      language: 'en',
      timeToRead: null,
      givenUrl: 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy',
      syndicatedArticle: null,
      collection: {
        slug: 'delicious-reads-about-your-favorite-candy',
        imageUrl:
          'https://s3.amazonaws.com/pocket-collectionapi-prod-images/756e1877-8857-45c4-b9f6-84c62a0700b5.png',
        excerpt:
          'From the history of Pez to the science of gummies, and why red Starburst reign supreme—help yourself to some of the most fascinating stories about candy, sure to satisfy your sweet tooth.',
        title: 'Delicious Reads About Your Favorite Candy'
      }
    }
  },
  cursor: 'MzQ1MzQ1NjQ0NV8qXzE2MzQ4Mzk4NDg='
}

describe('My List - Collection', () => {
  const expectedSaveUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore
  const expectedExternalUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy?utm_source=pocket_mylist' //prettier-ignore
  const expectedReadUrl = '/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3453456445'
  const expectedAnalyticsUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore

  it('should derive v3 as expected', () => {
    const item = deriveListItem(savedCollectionFromV3, true)

    // User driven data points
    expect(item._createdAt).toBe(1634839848)
    expect(item._updatedAt).toBe(1634839847)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3453456445')
    expect(item.resolvedId).toBe('3453456445')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(true)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Delicious Reads About Your Favorite Candy')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png'
    )
    expect(item.publisher).toBe('Pocket')
    expect(item.excerpt).toBe(
      'From the history of Pez to the science of gummies, and why red Starburst reign supreme—help yourself to some of the most fascinating stories about candy, sure to satisfy your sweet tooth.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(2)
    expect(item.authors).toStrictEqual([
      {
        name: 'Amy Maoz',
        url: ''
      }
    ])
    expect(item.analyticsData.id).toBe('3453456445')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(savedCollectionFromClientApi)

    // User driven data points
    expect(item._createdAt).toBe(1634839848)
    expect(item._updatedAt).toBe(1634839847)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3453456445')
    expect(item.resolvedId).toBe('3453456445')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(true)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Delicious Reads About Your Favorite Candy')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png'
    )
    expect(item.publisher).toBe('Pocket')
    expect(item.excerpt).toBe(
      'From the history of Pez to the science of gummies, and why red Starburst reign supreme—help yourself to some of the most fascinating stories about candy, sure to satisfy your sweet tooth.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(2)
    expect(item.authors).toStrictEqual([
      {
        id: '117507886',
        name: 'Amy Maoz',
        url: ''
      }
    ])
    expect(item.analyticsData.id).toBe('3453456445')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const item = deriveListItem(savedCollectionFromClientApi)
    const whitelist = /^my-list./
    const blacklist = []

    const sectionActions = Object.keys(analyticsActions).filter((action) => action.match(whitelist))
    const relevantActions = sectionActions.filter(
      (action) =>
        analyticsActions[action].entityTypes.includes('content') && !blacklist.includes(action)
    )

    relevantActions.map((identifier) => {
      it(`${identifier} should be valid`, () => {
        const { expects } = analyticsActions[identifier]
        const isValid = validateSnowplowExpectations({
          identifier,
          expects,
          data: {
            position: 0,
            destination: 'external',
            ...item.analyticsData
          }
        })
        expect(isValid).toBeTruthy()
      })
    })
  })
})
