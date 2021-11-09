import { deriveListItem } from 'common/api/derivers/item'

export const videoFromV3 = {
  item_id: '2815325547',
  resolved_id: '2815325547',
  given_url: 'https://www.youtube.com/watch?v=1AnG04qnLqI',
  given_title: 'Mufasa- its friday then. - YouTube',
  favorite: '0',
  status: '0',
  time_added: '1634839759',
  time_updated: '1634839759',
  time_read: '0',
  time_favorited: '0',
  sort_id: 2,
  resolved_title: 'Mufasa- its friday then.',
  resolved_url: 'http://www.youtube.com/watch?v=1AnG04qnLqI',
  excerpt: 'Original song: push the feeling on.',
  is_article: '0',
  is_index: '0',
  has_video: '2',
  has_image: '1',
  word_count: '0',
  lang: '',
  authors: {
    148589968: {
      name: 'Nicholashki',
      url: 'https://www.youtube.com/channel/UCpJ9wxRuDnq1DxMDoKHrJlg'
    }
  },
  images: {
    1: {
      item_id: '2815325547',
      image_id: '1',
      src: 'https://i.ytimg.com/vi/1AnG04qnLqI/mqdefault.jpg',
      width: '320',
      height: '180',
      credit: '',
      caption: ''
    }
  },
  videos: {
    1: {
      item_id: '2815325547',
      video_id: '1',
      src: 'http://www.youtube.com/watch?v=1AnG04qnLqI',
      width: '0',
      height: '0',
      type: '1',
      vid: '1AnG04qnLqI',
      length: '61'
    }
  },
  domain_metadata: {
    name: 'YouTube',
    logo: 'https://logo.clearbit.com/youtube.com?size=800',
    greyscale_logo: 'https://logo.clearbit.com/youtube.com?size=800&greyscale=true'
  },
  listen_duration_estimate: 0
}

export const videoFromClientApi = {
  node: {
    _createdAt: 1634839759,
    _updatedAt: 1634839759,
    url: 'https://www.youtube.com/watch?v=1AnG04qnLqI',
    status: 'UNREAD',
    isFavorite: false,
    favoritedAt: null,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '2815325547',
      authors: [
        {
          name: 'Nicholashki',
          url: 'https://www.youtube.com/channel/UCpJ9wxRuDnq1DxMDoKHrJlg'
        }
      ],
      domainMetadata: {
        name: 'YouTube',
        logo: 'https://logo.clearbit.com/youtube.com?size=800'
      },
      domain: null,
      excerpt: 'Original song: push the feeling on.',
      hasImage: 'HAS_IMAGES',
      hasVideo: 'IS_VIDEO',
      images: [
        {
          caption: '',
          credit: '',
          src: 'https://i.ytimg.com/vi/1AnG04qnLqI/mqdefault.jpg',
          width: 320,
          height: 180,
          imageId: 1
        }
      ],
      isArticle: false,
      isIndex: false,
      resolvedUrl: 'http://www.youtube.com/watch?v=1AnG04qnLqI',
      resolvedId: '2815325547',
      title: 'Mufasa- its friday then.',
      topImageUrl: null,
      videos: [
        {
          height: 0,
          src: 'http://www.youtube.com/watch?v=1AnG04qnLqI',
          type: 'YOUTUBE',
          vid: '1AnG04qnLqI',
          videoId: 1,
          width: 0,
          length: 61
        }
      ],
      wordCount: 0,
      datePublished: '2019-10-19 06:37:37',
      language: '',
      timeToRead: null,
      givenUrl: 'https://www.youtube.com/watch?v=1AnG04qnLqI',
      syndicatedArticle: null,
      collection: null
    }
  },
  cursor: 'MjgxNTMyNTU0N18qXzE2MzQ4Mzk3NTk='
}

describe('My List - Videos', () => {
  const expectedSaveUrl = 'https://www.youtube.com/watch?v=1AnG04qnLqI' //prettier-ignore
  const expectedExternalUrl = 'https://www.youtube.com/watch?utm_source=pocket_mylist&v=1AnG04qnLqI' //prettier-ignore
  const expectedReadUrl = '/read/2815325547' //prettier-ignore
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=2815325547'
  const expectedAnalyticsUrl = 'http://www.youtube.com/watch?v=1AnG04qnLqI'

  it('should derive v3 as expected', () => {
    const item = deriveListItem(videoFromV3, true)

    // User driven data points
    expect(item._createdAt).toBe(1634839759)
    expect(item._updatedAt).toBe(1634839759)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('2815325547')
    expect(item.resolvedId).toBe('2815325547')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('IS_VIDEO')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('')

    // Derived content
    expect(item.title).toBe('Mufasa- its friday then.')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.ytimg.com%2Fvi%2F1AnG04qnLqI%2Fmqdefault.jpg'
    )
    expect(item.publisher).toBe('YouTube')
    expect(item.excerpt).toBe('Original song: push the feeling on.')
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.timeToRead).toBeFalsy()
    expect(item.authors).toStrictEqual([
      {
        name: 'Nicholashki',
        url: 'https://www.youtube.com/channel/UCpJ9wxRuDnq1DxMDoKHrJlg'
      }
    ])
    expect(item.analyticsData).toStrictEqual({
      url: expectedAnalyticsUrl
    })
  })

  it('should derive clientAPI as expected', () => {
    const item = deriveListItem(videoFromClientApi)

    // User driven data points
    expect(item._createdAt).toBe(1634839759)
    expect(item._updatedAt).toBe(1634839759)
    expect(item.status).toBe('UNREAD')
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('2815325547')
    expect(item.resolvedId).toBe('2815325547')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeFalsy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('IS_VIDEO')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBe('')

    // Derived content
    expect(item.title).toBe('Mufasa- its friday then.')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.ytimg.com%2Fvi%2F1AnG04qnLqI%2Fmqdefault.jpg'
    )
    expect(item.publisher).toBe('YouTube')
    expect(item.excerpt).toBe('Original song: push the feeling on.')
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.timeToRead).toBeFalsy()
    expect(item.authors).toStrictEqual([
      {
        name: 'Nicholashki',
        url: 'https://www.youtube.com/channel/UCpJ9wxRuDnq1DxMDoKHrJlg'
      }
    ])
    expect(item.analyticsData).toStrictEqual({
      url: expectedAnalyticsUrl
    })
  })
})
