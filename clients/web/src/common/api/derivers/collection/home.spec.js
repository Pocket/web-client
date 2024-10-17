import { deriveItem } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

const collectionAsItem = {
  collection: {
    imageUrl:
      'https://s3.amazonaws.com/pocket-collectionapi-prod-images/c3d81de1-7e57-4393-ab61-6323c061c2ef.png',
    intro:
      'Conspiracy theories have never felt more mainstream. From persistent falsehoods about COVID-19 and vaccines to the Jan. 6 insurrection at the U.S. Capitol, it’s clear that those who fall into echo chambers online can cause tremendous harm offline. But how—and why—is this problem so pervasive? \n\nThese are the questions we think about daily at [The News Literacy Project](https://newslit.org/), the leading provider of news literacy education in the U.S. Here, we’re sharing a collection of articles and podcasts to help you understand the appeal of conspiratorial thinking, and how recent events have been influenced by conspiratorial beliefs. Plus, you’ll find resources to help you talk to anyone in your life who’s fallen down the rabbit hole and needs a hand climbing out—whether they realize it or not.',
    title: 'Down the Rabbit Hole: Why People Fall for Conspiracy Theories',
    excerpt: 'And how to talk to those who have fallen for falsehoods. \n'
  },
  isArticle: false,
  title: 'Going Down the Rabbit Hole: Why People Fall for Conspiracy Theories',
  itemId: '3664844706',
  resolvedId: '3664844706',
  resolvedUrl:
    'https://getpocket.com/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories',
  domain: null,
  domainMetadata: {
    name: 'Pocket'
  },
  excerpt:
    'News Literacy ProjectThe News Literacy Project, a nonpartisan education nonprofit, is building a national movement to advance the practice of news literacy throughout American society, creating better informed, more engaged and more empowered individuals—and ultimately a stronger democracy. Learn more about its work at newslit.org.',
  hasImage: 'HAS_IMAGES',
  hasVideo: 'NO_VIDEOS',
  images: [
    {
      caption:
        'News Literacy ProjectThe News Literacy Project, a nonpartisan education nonprofit, is building a national movement to advance the practice of news literacy throughout American society, creating better informed, more engaged and more empowered individuals—and ultimately a stronger democracy. Learn more about its work at newslit.org.',
      credit: '',
      height: 0,
      imageId: 1,
      src: 'https://pocket-image-cache.com/200x200/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2Fa395f855-0286-4dcf-865f-aa0ad1483f10.png',
      width: 0
    }
  ],
  topImageUrl:
    'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2Fc3d81de1-7e57-4393-ab61-6323c061c2ef.png',
  timeToRead: null,
  givenUrl:
    'http://getpocket.com/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories',
  syndicatedArticle: null
}

describe('Collection — Page as Home Item', () => {
  const expectedSaveUrl = 'http://getpocket.com/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories' //prettier-ignore
  const expectedExternalUrl = 'http://getpocket.com/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories?utm_source=pocket_home' //prettier-ignore
  const expectedReadUrl = '/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories' //prettier-ignore
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'http://getpocket.com/collections/going-down-the-rabbit-hole-why-people-fall-for-conspiracy-theories' //prettier-ignore

  const item = deriveItem({ item: collectionAsItem, utmId: 'pocket_home' })

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
    expect(item.itemId).toBe('3664844706')
    expect(item.resolvedId).toBe('3664844706')
    expect(item.slug).toBeFalsy()
    expect(item.isSyndicated).toBeFalsy()
    expect(item.isReadable).toBeFalsy()
    expect(item.isCollection).toBeTruthy()
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBeFalsy()
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('Down the Rabbit Hole: Why People Fall for Conspiracy Theories')
    // Expect this to be author image
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2Fc3d81de1-7e57-4393-ab61-6323c061c2ef.png'
    )
    expect(item.publisher).toBe('Pocket')
    expect(item.excerpt).toBe('And how to talk to those who have fallen for falsehoods. \n')
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(true)
    expect(item.timeToRead).toBe(null)
    expect(item.authors).toBeFalsy()
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const whitelist = /^collection./
    const blacklist = [
      'collection.story.impression',
      'collection.story.open',
      'collection.story.save'
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
            value: 'save-story-top', //'Fired when a user clicks the `Save` button, value is one of three: save-story-top, save-story-side, or save-story-bottom'
            ...item.analyticsData
          }
        })
        expect(isValid).toBeTruthy()
      })
    })
  })
})
