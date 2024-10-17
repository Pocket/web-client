import { deriveStory } from 'common/api/derivers/item'
import { analyticsActions } from 'connectors/snowplow/actions'
import { validateSnowplowExpectations } from 'connectors/snowplow/snowplow.state'

export const storyFromClientApi = {
  url: 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html',
  title: 'Inside VW’s Campaign of Trickery',
  excerpt:
    '**SS**: “One of the guests in our Volkswagen episode was *New York Times* reporter Jack Ewing. Jack knows everything about VW, and it’s always wonderful to have the most authoritative voices on our show. He described for us what it’s like to visit VW’s headquarters in Germany, and talked about the company’s complicated history there. He also covered the VW emissions scandal from its beginning; you can read an excerpt of his book in this *NYT* article.”',
  thumbnail:
    'https://s3.amazonaws.com/pocket-collectionapi-prod-images/914953af-15fd-46b9-ba3c-eed3ed278f9a.jpeg',
  fromPartner: false,
  authors: [
    {
      name: 'Jack Ewing'
    }
  ],
  publisher: 'New York Times',
  fromPartner: true,
  item: {
    isArticle: true,
    title: 'Inside VW’s Campaign of Trickery',
    authors: [
      {
        name: 'JACK EWING',
        url: 'https://www.nytimes.com/by/jack-ewing'
      }
    ],
    itemId: '1731163180',
    resolvedId: '1731163180',
    resolvedUrl: 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html',
    domain: null,
    domainMetadata: {
      name: 'The New York Times'
    },
    excerpt:
      'This article is adapted from “Faster, Higher, Farther: The Volkswagen Scandal” by Jack Ewing, the European economics correspondent for The New York Times based in Frankfurt. The book, to be published May 23 by W. W.',
    hasImage: 'HAS_IMAGES',
    hasVideo: 'NO_VIDEOS',
    images: [
      {
        caption:
          'A West Virginia University study showed that Volkswagen diesel cars polluted more than they should. The researchers used a Horiba Motor Exhaust Gas Analyzer 7400LE in the testing.Credit...Greg Kahn for The New York Times',
        credit: '',
        height: 400,
        imageId: 1,
        src: 'https://static01.nyt.com/images/2017/05/07/business/07vwexcerpt1-web/07vwexcerpt1-web-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
        width: 600
      },
      {
        caption: '',
        credit: '',
        height: 0,
        imageId: 2,
        src: 'https://static01.nyt.com/images/2017/03/11/business/11-VW-02/11-VW-02-videoLarge.jpg',
        width: 0
      },
      {
        caption:
          'Marc Besch, far left, and Hemanth Kappanna were among the students and professors who tested Volkswagen cars for the Center for Alternative Fuels, Engines and Emissions.Credit...Greg Kahn for The New York Times',
        credit: '',
        height: 141,
        imageId: 3,
        src: 'https://static01.nyt.com/images/2017/05/07/business/07VW-EWING-diptych/07VW-EWING-diptych-articleInline-v3.jpg?quality=75&auto=webp&disable=upscale',
        width: 190
      },
      {
        caption: '',
        credit: '',
        height: 0,
        imageId: 4,
        src: 'https://static01.nyt.com/images/2015/09/22/business/international/vw-volkswagen-emissions-explainer-1442939652007/vw-volkswagen-emissions-explainer-1442939652007-videoLarge-v2.png',
        width: 0
      }
    ],
    topImageUrl:
      'https://static01.nyt.com/images/2017/05/07/business/07vwexcerpt1-web/07vwexcerpt1-web-facebookJumbo.jpg?year=2017&h=549&w=1050&s=9040da8dc525be00827fd1625a9bb1e954d7d895d974cec2d8a8395682209f60&k=ZQJBKqZ0VN',
    timeToRead: 14,
    givenUrl: 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html',
    syndicatedArticle: null
  }
}

describe('Collection — Story', () => {
  const expectedSaveUrl = 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html' //prettier-ignore
  const expectedExternalUrl = 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html?utm_source=pocket_collection_story' //prettier-ignore
  const expectedReadUrl = false //prettier-ignore
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'https://www.nytimes.com/2017/05/06/business/inside-vws-campaign-of-trickery.html' //prettier-ignore

  const item = deriveStory(storyFromClientApi)

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
    expect(item.itemId).toBe('1731163180')
    expect(item.resolvedId).toBe('1731163180')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBeFalsy()
    expect(item.fromPartner).toBeTruthy()

    // Derived content
    expect(item.title).toBe('Inside VW’s Campaign of Trickery')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F914953af-15fd-46b9-ba3c-eed3ed278f9a.jpeg'
    )
    expect(item.publisher).toBe('New York Times')
    expect(item.excerpt).toBe(
      '**SS**: “One of the guests in our Volkswagen episode was *New York Times* reporter Jack Ewing. Jack knows everything about VW, and it’s always wonderful to have the most authoritative voices on our show. He described for us what it’s like to visit VW’s headquarters in Germany, and talked about the company’s complicated history there. He also covered the VW emissions scandal from its beginning; you can read an excerpt of his book in this *NYT* article.”'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBe(14)
    expect(item.authors).toStrictEqual([{ name: 'Jack Ewing' }])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
  })

  describe('Snowplow', () => {
    const whitelist = /^collection.story/
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
