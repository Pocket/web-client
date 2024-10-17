import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

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

describe('Saves - Collection', () => {
  const expectedSaveUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore
  const expectedExternalUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy?utm_source=pocket_saves' //prettier-ignore
  const expectedReadUrl = '/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3453456445'
  const expectedAnalyticsUrl = 'https://getpocket.com/collections/delicious-reads-about-your-favorite-candy' //prettier-ignore

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
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F756e1877-8857-45c4-b9f6-84c62a0700b5.png'
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
    expect(item.timeToRead).toBe(null)
    expect(item.authors).toStrictEqual([
      {
        id: '117507886',
        name: 'Amy Maoz',
        url: ''
      }
    ])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const item = deriveListItem(savedCollectionFromClientApi)
    const whitelist = /^saves./
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
