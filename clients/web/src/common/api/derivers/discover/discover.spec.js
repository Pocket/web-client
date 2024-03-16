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
  slateId: '48e766be-5e96-46fb-acbf-55fee3ae8a28',
  slateRequestId: '9d76c3e8-5e12-4a62-a174-5912dac93f33',
  slateExperiment: '5ef3cfd',
  displayName: 'Spotlight',
  description: 'Essential articles to save to your Pocket'
}
export const recommendationsFromSlate = {
  recommendationId: 'RecommendationAPI/3460462323',
  curatedInfo: {
    title: 'Apple is ready to admit it was wrong about the future of laptops',
    excerpt: 'It’s fixed the faults, but it created many of them in the first place.',
    imageSrc:
      'https://cdn.vox-cdn.com/thumbor/26f5VRT9jvt6JW6WB4Nohu849cI=/0x137:1911x1138/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22938855/Apple_MacBook_Pro_Ports_10182021.jpg'
  },
  item: {
    ampUrl:
      'https://www.theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future',
    authors: [
      {
        id: '97580803',
        name: 'Jon Porter'
      }
    ],
    isArticle: true,
    title: 'Apple is ready to admit it was wrong about the future of laptops',
    itemId: '3460462323',
    resolvedId: '3460462323',
    resolvedUrl:
      'https://www.theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future',
    domainId: '3218333',
    originDomainId: null,
    contentLength: 50555,
    domain: null,
    domainMetadata: {
      logo: 'https://logo.clearbit.com/theverge.com?size=800',
      logoGreyscale: 'https://logo.clearbit.com/theverge.com?size=800&greyscale=true',
      name: 'The Verge'
    },
    mimeType: 'text/html',
    encoding: 'utf-8',
    excerpt:
      'There’s plenty to be excited about when it comes to Apple’s new 14- and 16-inch MacBook Pros.',
    hasImage: 'HAS_IMAGES',
    hasVideo: 'NO_VIDEOS',
    images: [
      {
        caption: 'Ports, ports, glorious ports.',
        credit: 'Image: Apple',
        height: 0,
        imageId: 1,
        src: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/70017541/Apple_MacBook_Pro_Ports_10182021.0.jpg',
        width: 0
      },
      {
        caption:
          'Apple Mac product line manager Shruti Haldea introduces the new MacBook Pro — including a physical function row!',
        credit: 'Screenshot: Apple',
        height: 0,
        imageId: 2,
        src: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/22939123/msedge_gtjccFwnty.jpg',
        width: 0
      },
      {
        caption: 'Apple’s 2016 MacBook Pro, and its sadly necessary USB-C adaptors.',
        credit: 'Image  Vjeran Pavic / The Verge',
        height: 0,
        imageId: 3,
        src: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7390289/vpavic_161031_1256_0096.0.jpg',
        width: 0
      },
      {
        caption: 'LG’s 5K monitor, announced onstage alongside the MacBook Pro 2016.',
        credit: 'Image: LG',
        height: 0,
        imageId: 4,
        src: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/22938876/HKN62_AV5.0.jpg',
        width: 0
      }
    ],
    isIndex: false,
    topImageUrl:
      'https://cdn.vox-cdn.com/thumbor/26f5VRT9jvt6JW6WB4Nohu849cI=/0x137:1911x1138/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22938855/Apple_MacBook_Pro_Ports_10182021.jpg',
    videos: null,
    dateResolved: '2021-10-27 07:47:47',
    datePublished: '2021-10-19 15:30:00',
    language: 'en',
    timeToRead: 7,
    givenUrl:
      'http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future',
    syndicatedArticle: null
  }
}

describe('Discover', () => {
  const expectedSaveUrl = 'http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future' //prettier-ignore
  const expectedExternalUrl = 'http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future?utm_source=pocket_discover' //prettier-ignore
  const expectedReadUrl = false
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'http://theverge.com/22734645/apple-macbook-pro-2021-ports-magsafe-touch-bar-usb-c-future' //prettier-ignore

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
    expect(item.itemId).toBe('3460462323')
    expect(item.resolvedId).toBe('3460462323')
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
    expect(item.title).toBe('Apple is ready to admit it was wrong about the future of laptops')
    expect(item.thumbnail).toBe(
      'https://cdn.vox-cdn.com/thumbor/26f5VRT9jvt6JW6WB4Nohu849cI=/0x137:1911x1138/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22938855/Apple_MacBook_Pro_Ports_10182021.jpg'
    )
    expect(item.publisher).toBe('The Verge')
    expect(item.excerpt).toBe(
      'It’s fixed the faults, but it created many of them in the first place.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBe(7)
    expect(item.authors).toStrictEqual([
      {
        id: '97580803',
        name: 'Jon Porter'
      }
    ])
    expect(item.analyticsData.recommendationId).toBe('RecommendationAPI/3460462323')
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)

    expect(item.analyticsData.slateLineupExperiment).toBe('fc6d7d9')
    expect(item.analyticsData.slateLineupRequestId).toBe('31fac7b5-1d6a-4b51-ae1b-d193912a2b8b')
    expect(item.analyticsData.slateLineupId).toBe('9c3018a8-8aa9-4f91-81e9-ebcd95fc82da')

    expect(item.analyticsData.slateId).toBe('48e766be-5e96-46fb-acbf-55fee3ae8a28')
    expect(item.analyticsData.slateRequestId).toBe('9d76c3e8-5e12-4a62-a174-5912dac93f33')
    expect(item.analyticsData.slateExperiment).toBe('5ef3cfd')
    expect(item.analyticsData.displayName).toBe('Spotlight')
    expect(item.analyticsData.description).toBe('Essential articles to save to your Pocket')
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
