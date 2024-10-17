import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

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
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fwww.myswitzerland.com%2F-%2Fmedia%2Fst%2Fgadmin%2Fimages%2Faccommodation%2Fsummer%2Ftypically%2520swiss%2Fk-img_5780_2_36163.jpg'
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
    expect(item.timeToRead).toBe(null)
    expect(item.authors).toStrictEqual([
      {
        name: 'Schweiz Tourismus',
        url: ''
      }
    ])
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
