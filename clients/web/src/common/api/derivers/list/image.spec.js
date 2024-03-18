import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const savedImageFromClientApi = {
  node: {
    _createdAt: 1634839678,
    _updatedAt: 1634839679,
    url: 'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg',
    status: 'UNREAD',
    isFavorite: false,
    favoritedAt: null,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '3462094779',
      authors: [],
      domainMetadata: {
        name: 'cdn.dribbble.com',
        logo: null
      },
      domain: null,
      excerpt: '',
      hasImage: 'IS_IMAGE',
      hasVideo: 'NO_VIDEOS',
      images: [
        {
          src: 'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg'
        }
      ],
      isArticle: false,
      isIndex: false,
      resolvedUrl:
        'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg',
      resolvedId: '3462094779',
      title: '',
      topImageUrl: null,
      videos: null,
      datePublished: null,
      language: '',
      timeToRead: null,
      givenUrl:
        'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg',
      syndicatedArticle: null,
      collection: null
    }
  },
  cursor: 'MzQ2MjA5NDc3OV8qXzE2MzQ4Mzk2Nzg='
}

describe('Saves - Image', () => {
  const expectedSaveUrl = 'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg' //prettier-ignore
  const expectedExternalUrl = 'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg?utm_source=pocket_saves' //prettier-ignore
  const expectedReadUrl = '/read/3462094779' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3462094779'
  const expectedAnalyticsUrl = 'https://cdn.dribbble.com/users/59947/screenshots/16700535/media/335d386abb459f49570030e830429cef.jpg' //prettier-ignore

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(savedImageFromClientApi)

    // User driven data points
    expect(item._createdAt).toBe(1634839678)
    expect(item._updatedAt).toBe(1634839679)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3462094779')
    expect(item.resolvedId).toBe('3462094779')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('IS_IMAGE')
    expect(item.language).toBe('')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('335d386abb459f49570030e830429cef')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F59947%2Fscreenshots%2F16700535%2Fmedia%2F335d386abb459f49570030e830429cef.jpg'
    )
    expect(item.publisher).toBe('cdn.dribbble.com')
    expect(item.excerpt).toBeFalsy()
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBeFalsy()
    expect(item.authors).toStrictEqual([])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const item = deriveListItem(savedImageFromClientApi)
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
