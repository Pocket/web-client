import { deriveListItem } from 'common/api/derivers/item'

const parsedFromV3 = {
  item_id: '3362121180',
  resolved_id: '3362121180',
  given_url: 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html',
  given_title: '',
  favorite: '0',
  status: '0',
  time_added: '1634765628',
  time_updated: '1634765628',
  time_read: '0',
  time_favorited: '0',
  sort_id: 4,
  resolved_title: 'The Secrets of \u2018Cognitive Super-Agers\u2019',
  resolved_url: 'https://www.nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html',
  excerpt:
    'By studying centenarians, researchers hope to develop strategies to ward off Alzheimer\u2019s disease and slow brain aging for all of us.',
  is_article: '1',
  is_index: '0',
  has_video: '0',
  has_image: '1',
  word_count: '1112',
  lang: 'en',
  time_to_read: 5,
  amp_url: 'https://www.nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.amp.html',
  top_image_url:
    'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg',
  authors: {
    62339103: {
      name: 'JANE E. BRODY',
      url: 'https://www.nytimes.com/by/jane-e-brody'
    }
  },
  images: {
    1: {
      item_id: '3362121180',
      image_id: '1',
      src: 'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
      width: '600',
      height: '398',
      credit: '',
      caption: ''
    },
    2: {
      item_id: '3362121180',
      image_id: '2',
      src: 'https://static01.nyt.com/images/2018/06/12/multimedia/jane-e-brody/jane-e-brody-thumbLarge.png',
      width: '0',
      height: '0',
      credit: '',
      caption: ''
    }
  },
  badge_group_id: '1',
  domain_metadata: {
    name: 'The New York Times',
    logo: 'https://logo.clearbit.com/nytimes.com?size=800',
    greyscale_logo: 'https://logo.clearbit.com/nytimes.com?size=800&greyscale=true'
  },
  listen_duration_estimate: 430
}

//prettier-ignore
const parsedFromClientApi =   {
  "node": {
      "_createdAt": 1634765628,
      "_updatedAt": 1634765628,
      "url": "http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html",
      "status": "UNREAD",
      "isFavorite": false,
      "favoritedAt": null,
      "isArchived": false,
      "archivedAt": null,
      "tags": [],
      "item": {
          "itemId": "3362121180",
          "authors": [
              {
                  "name": "JANE E. BRODY",
                  "url": "https://www.nytimes.com/by/jane-e-brody"
              }
          ],
          "domainMetadata": {
              "name": "The New York Times",
              "logo": "https://logo.clearbit.com/nytimes.com?size=800"
          },
          "domain": null,
          "excerpt": "By studying centenarians, researchers hope to develop strategies to ward off Alzheimer’s disease and slow brain aging for all of us.",
          "hasImage": "HAS_IMAGES",
          "hasVideo": "NO_VIDEOS",
          "images": [
              {
                  "src": "https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
              },
          ],
          "isArticle": true,
          "isIndex": false,
          "resolvedUrl": "https://www.nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html",
          "resolvedId": "3362121180",
          "title": "The Secrets of ‘Cognitive Super-Agers’",
          "topImageUrl": "https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg",
          "videos": null,
          "wordCount": 1112,
          "datePublished": "2021-06-21 04:00:09",
          "language": "en",
          "timeToRead": 5,
          "givenUrl": "http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html",
          "syndicatedArticle": null,
          "collection": null
      }
  },
  "cursor": "MzM2MjEyMTE4MF8qXzE2MzQ3NjU2Mjg="
}

describe('My List - Parsed', () => {
  const expectedSaveUrl = 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html' //prettier-ignore
  const expectedExternalUrl = 'http://nytimes.com/2021/06/21/well/mind/aging-memory-centenarians.html?utm_source=pocket_mylist' //prettier-ignore
  const expectedReadUrl = '/read/3362121180' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3362121180'

  it('should derive v3 as expected', () => {
    const item = deriveListItem(parsedFromV3, true)

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

    // Derived content
    expect(item.title).toBe('The Secrets of \u2018Cognitive Super-Agers\u2019')
    expect(item.thumbnail).toBe(
      'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg'
    )
    expect(item.publisher).toBe('The New York Times')
    expect(item.excerpt).toBe(
      'By studying centenarians, researchers hope to develop strategies to ward off Alzheimer\u2019s disease and slow brain aging for all of us.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.timeToRead).toBe(5)
    expect(item.authors).toStrictEqual([
      {
        name: 'JANE E. BRODY',
        url: 'https://www.nytimes.com/by/jane-e-brody'
      }
    ])
  })

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(parsedFromClientApi)

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

    // Derived content
    expect(item.title).toBe('The Secrets of \u2018Cognitive Super-Agers\u2019')
    expect(item.thumbnail).toBe(
      'https://static01.nyt.com/images/2021/06/22/science/21SCI-BRODY-CENTENARIANS/21SCI-BRODY-CENTENARIANS-facebookJumbo.jpg'
    )
    expect(item.publisher).toBe('The New York Times')
    expect(item.excerpt).toBe(
      'By studying centenarians, researchers hope to develop strategies to ward off Alzheimer\u2019s disease and slow brain aging for all of us.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.timeToRead).toBe(5)
    expect(item.authors).toStrictEqual([
      {
        name: 'JANE E. BRODY',
        url: 'https://www.nytimes.com/by/jane-e-brody'
      }
    ])
  })
})
