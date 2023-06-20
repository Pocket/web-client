import { deriveCorpusItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const homeSlate = {
  corpusRecommendationId: '19ec34d6f6d3496aad28a67c4b0f93e3',
  corpusItem: {
    topImageUrl:
      'https://s3.amazonaws.com/pocket-curatedcorpusapi-prod-images/a62a1cf3-360d-4e27-8e57-2d4807d530b3.jpeg',
    publisher: 'Atlas Obscura',
    title: 'Exit Interview: I Was a Black, Female Thru-Hiker on the Appalachian Trail',
    url: 'https://getpocket.com/explore/item/exit-interview-i-was-a-black-female-thru-hiker-on-the-appalachian-trail',
    topic: 'TRAVEL',
    authors: [
      {
        name: 'Sarah Laskow'
      }
    ],
    id: 'e8dd547d-2db3-4e79-885a-f73bd246fb04'
  }
}

describe('Home', () => {
  const expectedSaveUrl = 'https://getpocket.com/explore/item/exit-interview-i-was-a-black-female-thru-hiker-on-the-appalachian-trail' //prettier-ignore
  const expectedExternalUrl = 'https://getpocket.com/explore/item/exit-interview-i-was-a-black-female-thru-hiker-on-the-appalachian-trail?utm_source=pocket_home' //prettier-ignore
  const expectedReadUrl = false
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'https://getpocket.com/explore/item/exit-interview-i-was-a-black-female-thru-hiker-on-the-appalachian-trail' //prettier-ignore

  const item = deriveCorpusItem(homeSlate)

  it('should derive corpusItem as expected', () => {
    // User driven data points
    expect(item._createdAt).toBeFalsy()
    expect(item._updatedAt).toBeFalsy()
    expect(item.status).toBeFalsy()
    expect(item.isFavorite).toBeFalsy()
    expect(item.isArchived).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toBeFalsy()

    // UnDerived content should come from the server
    expect(item.itemId).toBeFalsy()
    expect(item.resolvedId).toBeFalsy()
    expect(item.id).toBe('e8dd547d-2db3-4e79-885a-f73bd246fb04')
    expect(item.isSyndicated).toBeFalsy()
    expect(item.isReadable).toBeFalsy()
    expect(item.isCollection).toBeFalsy()
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBeFalsy()
    expect(item.hasImage).toBeFalsy()
    expect(item.language).toBeFalsy()

    // Derived content
    expect(item.title).toBe(
      'Exit Interview: I Was a Black, Female Thru-Hiker on the Appalachian Trail'
    )
    expect(item.thumbnail).toBe(
      'https://s3.amazonaws.com/pocket-curatedcorpusapi-prod-images/a62a1cf3-360d-4e27-8e57-2d4807d530b3.jpeg'
    )
    expect(item.publisher).toBe('Atlas Obscura')
    expect(item.excerpt).toBeFalsy()
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBeFalsy()
    expect(item.authors).toStrictEqual([
      {
        name: 'Sarah Laskow'
      }
    ])

    expect(item.analyticsData.corpusRecommendationId).toBe('19ec34d6f6d3496aad28a67c4b0f93e3')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    /*Excluding recents here since we no longer have actions on them*/
    const whitelist = /^home.(?!recent)/
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
            destination: 'external',
            ...item.analyticsData
          }
        })
        expect(isValid).toBeTruthy()
      })
    })
  })
})
