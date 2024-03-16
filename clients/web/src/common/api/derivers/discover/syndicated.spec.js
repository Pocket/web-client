import { deriveRecommendation } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

// This comes from the lineup containing the slate
export const lineupAnalytics = {
  slateLineupExperiment: 'fc6d7d9',
  slateLineupRequestId: '31fac7b5-1d6a-4b51-ae1b-d193912a2b8b',
  slateLineupId: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
}

// This comes from the slate containing the recommendations
export const slateAnalytics = {
  description: 'Great stories that stand the test of time',
  displayName: 'In case you missed it',
  slateExperiment: '40ef250',
  slateRequestId: '0d4d49f4-55fc-417a-9097-561300da67a3',
  slateId: '2f2a3568-901f-4655-8735-daf67e8ecc5d'
}

export const recommendationsFromSlate = {
  recommendationId: 'RecommendationAPI/2418914954',
  publisher: 'getpocket.com',
  curatedInfo: null,
  itemId: '2418914954',
  item: {
    isArticle: true,
    title: 'The 3 Minutes It Takes To Read This Will Improve Your Conversations Forever',
    authors: [
      {
        name: 'Josh Spector',
        id: '369989'
      }
    ],
    itemId: '2418914954',
    resolvedId: '2418914954',
    resolvedUrl:
      'https://getpocket.com/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever',
    domain: null,
    domainMetadata: {
      name: 'Pocket'
    },
    excerpt: 'How to ask better questions.',
    hasImage: 'HAS_IMAGES',
    hasVideo: 'NO_VIDEOS',
    images: [
      {
        caption: '',
        credit: '',
        height: 0,
        imageId: 1,
        src: 'https://pocket-image-cache.com/direct?resize=w2000&url=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F2000%2F1%2AhMDpvos6wS8tFfm7bhXM4Q.jpeg',
        width: 0
      }
    ],
    videos: null,
    topImageUrl:
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-syndicated-images%2Farticles%2F326%2F1566916077_direct.jpg',
    timeToRead: 3,
    givenUrl:
      'http://getpocket.com/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever',
    collection: null,
    syndicatedArticle: {
      slug: 'the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever',
      publisher: {
        name: 'Josh Spector',
        url: 'http://joshspector.com'
      }
    }
  }
}

describe('Syndicated', () => {
  const expectedSaveUrl = 'http://getpocket.com/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever' //prettier-ignore
  const expectedExternalUrl = 'http://getpocket.com/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever?utm_source=pocket_discover' //prettier-ignore
  const expectedReadUrl = false
  const expectedPermanentUrl = false
  const expectedSyndicatedUrl = '/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever' //prettier-ignore
  const expectedAnalyticsUrl = 'http://getpocket.com/explore/item/the-3-minutes-it-takes-to-read-this-will-improve-your-conversations-forever' //prettier-ignore

  const item = deriveRecommendation(recommendationsFromSlate, {
    ...lineupAnalytics,
    ...slateAnalytics
  })

  it('should derive clientAPI as expected', () => {
    // User driven data points
    expect(item._createdAt).toBeFalsy()
    expect(item._updatedAt).toBeFalsy()
    expect(item.status).toBeFalsy()
    expect(item.isFavorite).toBeFalsy()
    expect(item.isArchived).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toBeFalsy()

    // UnDerived content should come from the server
    expect(item.itemId).toBe('2418914954')
    expect(item.resolvedId).toBe('2418914954')
    expect(item.isSyndicated).toBe(true)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBeFalsy()
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe(
      'The 3 Minutes It Takes To Read This Will Improve Your Conversations Forever'
    )
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-syndicated-images%2Farticles%2F326%2F1566916077_direct.jpg'
    )
    expect(item.publisher).toBe('Josh Spector')
    expect(item.excerpt).toBe('How to ask better questions.')
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.syndicatedUrl).toBe(expectedSyndicatedUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(3)
    expect(item.authors).toStrictEqual([
      {
        name: 'Josh Spector',
        id: '369989'
      }
    ])
    expect(item.analyticsData.recommendationId).toBe('RecommendationAPI/2418914954')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)

    expect(item.analyticsData.slateLineupExperiment).toBe('fc6d7d9')
    expect(item.analyticsData.slateLineupRequestId).toBe('31fac7b5-1d6a-4b51-ae1b-d193912a2b8b')
    expect(item.analyticsData.slateLineupId).toBe('9c3018a8-8aa9-4f91-81e9-ebcd95fc82da')

    expect(item.analyticsData.slateId).toBe('2f2a3568-901f-4655-8735-daf67e8ecc5d')
    expect(item.analyticsData.slateRequestId).toBe('0d4d49f4-55fc-417a-9097-561300da67a3')
    expect(item.analyticsData.slateExperiment).toBe('40ef250')
    expect(item.analyticsData.displayName).toBe('In case you missed it')
    expect(item.analyticsData.description).toBe('Great stories that stand the test of time')
  })

  describe('Snowplow', () => {
    const whitelist = /^discover./
    const blacklist = [
      'discover.report' // report requires runtime user interaction
    ]

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
