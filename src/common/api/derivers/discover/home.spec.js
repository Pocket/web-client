import { deriveRecommendation } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

// This comes from the lineup containing the slate
export const lineupAnalytics = {
  slateLineupExperiment: '11d4eab',
  slateLineupRequestId: '72063499-81c1-4e1a-949e-55e0ab349f12b',
  slateLineupId: '249850f0-61c0-46f9-a16a-f0553c222800'
}

// This comes from the slate containing the recommendations
export const slateAnalytics = {
  slateId: '0737b00e-a21e-4875-a4c7-3e14926d4acf',
  slateRequestId: '938098dc-9e9c-4990-b899-ddce1386663e',
  slateExperiment: '09fb6f1',
  displayName: 'Best of the web',
  description: 'New perspectives, intriguing deep-dives, and timeless classics'
}

export const recommendationsFromSlate = {
  recommendationId: 'RecommendationAPI/3365323914',
  curatedInfo: {
    title: "What You Do With Your Shopping Cart When You're Done With It Says A Lot About You",
    excerpt: 'Do you return or abandon it?',
    imageSrc:
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fview-of-branded-shopping-carts-lined-up-on-a-sidewalk-news-photo-1605802464.%3Fresize%3D640%3A*'
  },
  item: {
    collection: null,
    isArticle: true,
    title: "What You Do With Your Shopping Cart When You're Done With It Says A Lot About You",
    itemId: '3365323914',
    normalUrl:
      'http://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you',
    resolvedId: '3365323914',
    resolvedUrl:
      'https://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you',
    domain: null,
    domainMetadata: {
      name: 'Pocket'
    },
    excerpt: 'Do you return or abandon it?',
    hasImage: 'HAS_IMAGES',
    hasVideo: 'NO_VIDEOS',
    images: [
      {
        caption: '',
        credit: 'Leif Skoogfors/Getty Images',
        height: 0,
        imageId: 1,
        src: 'https://pocket-syndicated-images.s3.amazonaws.com/60d5201f30db4.jpg',
        width: 0
      }
    ],
    topImageUrl:
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fview-of-branded-shopping-carts-lined-up-on-a-sidewalk-news-photo-1605802464.%3Fresize%3D640%3A*',
    wordCount: 350,
    timeToRead: null,
    givenUrl:
      'http://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you',
    syndicatedArticle: {
      slug: 'people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you',
      publisher: {
        name: 'Delish',
        url: 'https://www.delish.com/?utm_source=pocket'
      }
    }
  }
}

describe('Home', () => {
  const expectedSaveUrl = 'http://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you' //prettier-ignore
  const expectedExternalUrl = 'http://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you?utm_source=pocket_home' //prettier-ignore
  const expectedReadUrl = false
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'http://getpocket.com/explore/item/people-think-what-you-do-with-your-shopping-cart-when-you-re-done-with-it-says-a-lot-about-you' //prettier-ignore

  const item = deriveRecommendation(
    recommendationsFromSlate,
    {
      ...lineupAnalytics,
      ...slateAnalytics
    },
    'pocket_home'
  )

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
    expect(item.itemId).toBe('3365323914')
    expect(item.resolvedId).toBe('3365323914')
    expect(item.isSyndicated).toBe(true)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBeFalsy()

    // Derived content
    expect(item.title).toBe(
      "What You Do With Your Shopping Cart When You're Done With It Says A Lot About You"
    )
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fview-of-branded-shopping-carts-lined-up-on-a-sidewalk-news-photo-1605802464.%3Fresize%3D640%3A*'
    )
    expect(item.publisher).toBe('Delish')
    expect(item.excerpt).toBe('Do you return or abandon it?')
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(null)
    expect(item.authors).toBeFalsy()

    expect(item.analyticsData.recommendationId).toBe('RecommendationAPI/3365323914')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)

    expect(item.analyticsData.slateLineupExperiment).toBe('11d4eab')
    expect(item.analyticsData.slateLineupRequestId).toBe('72063499-81c1-4e1a-949e-55e0ab349f12b')
    expect(item.analyticsData.slateLineupId).toBe('249850f0-61c0-46f9-a16a-f0553c222800')

    expect(item.analyticsData.slateId).toBe('0737b00e-a21e-4875-a4c7-3e14926d4acf')
    expect(item.analyticsData.slateRequestId).toBe('938098dc-9e9c-4990-b899-ddce1386663e')
    expect(item.analyticsData.slateExperiment).toBe('09fb6f1')
    expect(item.analyticsData.displayName).toBe('Best of the web')
    expect(item.analyticsData.description).toBe(
      'New perspectives, intriguing deep-dives, and timeless classics'
    )
  })

  describe('Snowplow', () => {
    const whitelist = /^home.(?!corpus)/
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
