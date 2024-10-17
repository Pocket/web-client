import { deriveListItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

//prettier-ignore
export const savedParsedFromClientApi = {
  node: {
    _createdAt: 1634765628,
    _updatedAt: 1634765628,
    url: 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html',
    status: 'UNREAD',
    isFavorite: false,
    favoritedAt: null,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '3362121180',
      authors: [
        {
          name: 'JANE E. BRODY',
          url: 'https://www.nytimes.com/by/jane-e-brody'
        }
      ],
      domainMetadata: {
        name: 'The New York Times',
        logo: 'https://logo.clearbit.com/nytimes.com?size=800'
      },
      domain: null,
      excerpt:
        'By studying centenarians, researchers hope to develop strategies to ward off Alzheimer’s disease and slow brain aging for all of us.',
      hasImage: 'HAS_IMAGES',
      hasVideo: 'NO_VIDEOS',
      images: [
        {
          src: 'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
        }
      ],
      isArticle: true,
      isIndex: false,
      resolvedUrl: 'https://www.nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html',
      resolvedId: '3362121180',
      title: 'The Secrets of ‘Cognitive Super-Agers’',
      topImageUrl:
        'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg',
      videos: null,
      datePublished: '2021-06-21 04:00:09',
      language: 'en',
      timeToRead: 5,
      givenUrl: 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html',
      syndicatedArticle: null,
      collection: null
    }
  },
  cursor: 'MzM2MjEyMTE4MF8qXzE2MzQ3NjU2Mjg='
}

describe('Saves - Parsed', () => {
  const expectedSaveUrl = 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html' //prettier-ignore
  const expectedExternalUrl = 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html?utm_source=pocket_saves' //prettier-ignore
  const expectedReadUrl = '/read/3362121180' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3362121180'
  const expectedAnalyticsUrl = 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html' //prettier-ignore

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(savedParsedFromClientApi)

    // User driven data points
    expect(item._createdAt).toBe(1634765628)
    expect(item._updatedAt).toBe(1634765628)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('3362121180')
    expect(item.resolvedId).toBe('3362121180')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('en')
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('The Secrets of \u2018Cognitive Super-Agers\u2019')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2021%2F06%2F22%2Fscience%2F21SCI-BRODY-CENTENARIANS%2F21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg'
    )
    expect(item.publisher).toBe('The New York Times')
    expect(item.excerpt).toBe(
      'By studying centenarians, researchers hope to develop strategies to ward off Alzheimer\u2019s disease and slow brain aging for all of us.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(5)
    expect(item.authors).toStrictEqual([
      {
        name: 'JANE E. BRODY',
        url: 'https://www.nytimes.com/by/jane-e-brody'
      }
    ])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const item = deriveListItem(savedParsedFromClientApi)
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
