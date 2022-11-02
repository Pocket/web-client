import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const savedUnparsedFromV3 = {
  item_id: '3117582481',
  resolved_id: '3117582481',
  given_url: 'https://www.myswitzerland.com/en-us/destinations/blausee/',
  given_title: 'Blausee | Switzerland Tourism',
  favorite: '0',
  status: '0',
  time_added: '1634839845',
  time_updated: '1634839845',
  time_read: '0',
  time_favorited: '0',
  sort_id: 1,
  resolved_title: 'Blausee',
  resolved_url: 'https://www.myswitzerland.com/en-us/destinations/blausee/',
  excerpt:
    'Where are you from? The eyes of the beautiful maiden who died of a broken heart were deep blue. The Blue Lake is also deep blue, in eternal memory of the love of the maiden, which persists beyond death. The small Blausee, steeped in legend, is located in the midst of a small nature park.',
  is_article: '0',
  is_index: '0',
  has_video: '0',
  has_image: '1',
  word_count: '260',
  lang: 'en',
  top_image_url:
    'https://www.myswitzerland.com/-/media/st/gadmin/images/accommodation/summer/typically%20swiss/k-img_5780_2_36163.jpg',
  authors: {
    13653328: {
      name: 'Schweiz Tourismus',
      url: ''
    }
  },
  images: {
    1: {
      item_id: '3117582481',
      image_id: '1',
      src: 'https://www.myswitzerland.com/assets/img/graphics/areamap-preview.png?v=2f744ce322625f8b5ef3925b0c9fe50e',
      width: '0',
      height: '0',
      credit: '',
      caption: ''
    }
  },
  listen_duration_estimate: 101
}

export const savedUnparsedFromClientApi = {
  node: {
    _createdAt: 1634839845,
    _updatedAt: 1634839845,
    url: 'https://www.myswitzerland.com/en-us/destinations/blausee/',
    status: 'UNREAD',
    isFavorite: false,
    favoritedAt: null,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '3117582481',
      authors: [
        {
          name: 'Schweiz Tourismus',
          url: ''
        }
      ],
      domainMetadata: {
        name: 'myswitzerland.com',
        logo: null
      },
      domain: null,
      excerpt:
        'Where are you from? The eyes of the beautiful maiden who died of a broken heart were deep blue. The Blue Lake is also deep blue, in eternal memory of the love of the maiden, which persists beyond death. The small Blausee, steeped in legend, is located in the midst of a small nature park.',
      hasImage: 'HAS_IMAGES',
      hasVideo: 'NO_VIDEOS',
      images: [
        {
          caption: '',
          credit: '',
          src: 'https://www.myswitzerland.com/assets/img/graphics/areamap-preview.png?v=2f744ce322625f8b5ef3925b0c9fe50e',
          width: 0,
          height: 0,
          imageId: 1
        }
      ],
      isArticle: false,
      isIndex: false,
      resolvedUrl: 'https://www.myswitzerland.com/en-us/destinations/blausee/',
      resolvedId: '3117582481',
      title: 'Blausee',
      topImageUrl:
        'https://www.myswitzerland.com/-/media/st/gadmin/images/accommodation/summer/typically%20swiss/k-img_5780_2_36163.jpg',
      videos: null,
      wordCount: 260,
      datePublished: null,
      language: 'en',
      timeToRead: null,
      givenUrl: 'https://www.myswitzerland.com/en-us/destinations/blausee/',
      syndicatedArticle: null,
      collection: null
    }
  },
  cursor: 'MzExNzU4MjQ4MV8qXzE2MzQ4Mzk4NDU='
}

describe('Saves - Unparsed', () => {
  const expectedSaveUrl = 'https://www.myswitzerland.com/en-us/destinations/blausee/' //prettier-ignore
  const expectedExternalUrl = 'https://www.myswitzerland.com/en-us/destinations/blausee/?utm_source=pocket_saves' //prettier-ignore
  const expectedReadUrl = 'https://www.myswitzerland.com/en-us/destinations/blausee/?utm_source=pocket_saves' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3117582481'
  const expectedAnalyticsUrl = 'https://www.myswitzerland.com/en-us/destinations/blausee/'

  it('should derive v3 as expected', () => {
    const item = deriveListItem(savedUnparsedFromV3, true)

    // User driven data points
    expect(item._createdAt).toBe(1634839845)
    expect(item._updatedAt).toBe(1634839845)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3117582481')
    expect(item.resolvedId).toBe('3117582481')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(false)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Blausee')
    expect(item.thumbnail).toBe(
      'https://www.myswitzerland.com/-/media/st/gadmin/images/accommodation/summer/typically%20swiss/k-img_5780_2_36163.jpg'
    )
    expect(item.publisher).toBe('myswitzerland.com')
    expect(item.excerpt).toBe(
      'Where are you from? The eyes of the beautiful maiden who died of a broken heart were deep blue. The Blue Lake is also deep blue, in eternal memory of the love of the maiden, which persists beyond death. The small Blausee, steeped in legend, is located in the midst of a small nature park.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBe(2)
    expect(item.authors).toStrictEqual([
      {
        name: 'Schweiz Tourismus',
        url: ''
      }
    ])
    expect(item.analyticsData.id).toBe('3117582481')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(savedUnparsedFromClientApi)

    // User driven data points
    expect(item._createdAt).toBe(1634839845)
    expect(item._updatedAt).toBe(1634839845)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3117582481')
    expect(item.resolvedId).toBe('3117582481')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(false)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Blausee')
    expect(item.thumbnail).toBe(
      'https://www.myswitzerland.com/-/media/st/gadmin/images/accommodation/summer/typically%20swiss/k-img_5780_2_36163.jpg'
    )
    expect(item.publisher).toBe('myswitzerland.com')
    expect(item.excerpt).toBe(
      'Where are you from? The eyes of the beautiful maiden who died of a broken heart were deep blue. The Blue Lake is also deep blue, in eternal memory of the love of the maiden, which persists beyond death. The small Blausee, steeped in legend, is located in the midst of a small nature park.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBe(2)
    expect(item.authors).toStrictEqual([
      {
        name: 'Schweiz Tourismus',
        url: ''
      }
    ])
    expect(item.analyticsData.id).toBe('3117582481')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const item = deriveListItem(savedUnparsedFromClientApi)
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
