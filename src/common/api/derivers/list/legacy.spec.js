import { deriveListItem } from 'common/api/derivers/item'

// An item without expected values that make up the bulk of the visuals in a card
// EX: title, excerpt, images.  These are assumed to always be there, but there
// is a possibility they may be missing

const legacyListItem = {
  item_id: '3059000415',
  resolved_id: '3059000415',
  given_url:
    'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
  given_title: 'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The',
  favorite: '1',
  status: '0',
  time_added: '1634852432',
  time_updated: '1634852432',
  time_read: '0',
  time_favorited: '1602888587',
  sort_id: 0,
  resolved_title:
    'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)',
  resolved_url:
    'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
  excerpt:
    'For too long, we have overemphasized the external aspect of choices and underemphasized our internal ability to choose.',
  is_article: '1',
  is_index: '0',
  has_video: '0',
  has_image: '1',
  word_count: '1192',
  lang: 'en',
  time_to_read: 5,
  top_image_url:
    'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg',
  authors: {
    148370955: {
      item_id: '3059000415',
      author_id: '148370955',
      name: 'Thomas Oppong',
      url: 'https://learn.thomasoppong.com/'
    }
  },
  images: {
    1: {
      src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg'
    }
  },
  domain_metadata: {
    name: 'Pocket',
    logo: 'https://logo.clearbit.com/getpocket.com?size=800',
    greyscale_logo: 'https://logo.clearbit.com/getpocket.com?size=800&greyscale=true'
  },
  listen_duration_estimate: 461
}

const legacyListItemFromClientApi = {
  node: {
    _createdAt: 1634852432,
    _updatedAt: 1634852432,
    url: 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
    status: 'UNREAD',
    isFavorite: true,
    favoritedAt: 1602888587,
    isArchived: false,
    archivedAt: null,
    tags: [],
    item: {
      itemId: '3059000415',
      authors: [
        {
          id: '148370955',
          name: 'Thomas Oppong',
          url: 'https://learn.thomasoppong.com/'
        }
      ],
      domainMetadata: {
        name: 'Pocket',
        logo: 'https://logo.clearbit.com/getpocket.com?size=800'
      },
      domain: null,
      excerpt:
        'For too long, we have overemphasized the external aspect of choices and underemphasized our internal ability to choose.',
      hasImage: 'HAS_IMAGES',
      hasVideo: 'NO_VIDEOS',
      images: [
        {
          src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg'
        }
      ],
      isArticle: true,
      isIndex: false,
      resolvedUrl:
        'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
      resolvedId: '3059000415',
      title:
        'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)',
      topImageUrl:
        'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg',
      videos: null,
      wordCount: 1192,
      datePublished: null,
      language: 'en',
      timeToRead: 5,
      givenUrl:
        'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
      syndicatedArticle: {
        slug: 'the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
        publisher: {
          name: 'Thomas Oppong',
          url: 'https://learn.thomasoppong.com/',
          logo: 'https://pocket-syndicated-publisher-logos.s3.amazonaws.com/5f0ccb9b26311.JPG'
        }
      },
      collection: null
    }
  },
  cursor: 'MzA1OTAwMDQxNV8qXzE2MzQ4NTI0MzI='
}

describe('My List - Original Deriver', () => {
  const expectedSaveUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential' //prettier-ignore
  const expectedExternalUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential?utm_source=pocket_mylist' //prettier-ignore
  const expectedReadUrl = '/read/3059000415'
  const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3059000415'

  it('should derive legacy data as expected', () => {
    const derivedItem = deriveListItem(legacyListItem, true)

    expect(derivedItem._createdAt).toBe(1634852432)
    expect(derivedItem._updatedAt).toBe(1634852432)
    expect(derivedItem.status).toBe('UNREAD')
    expect(derivedItem.isFavorite).toBe(true)
    expect(derivedItem.favoritedAt).toBe(1602888587)
    expect(derivedItem.isArchived).toBe(false)
    expect(derivedItem.archivedAt).toBe(0)

    expect(derivedItem.itemId).toBe('3059000415')
    expect(derivedItem.resolvedId).toBe('3059000415')

    expect(derivedItem.isSyndicated).toBe(false)
    expect(derivedItem.isReadable).toBe(true)
    expect(derivedItem.isCollection).toBe(false)
    expect(derivedItem.isArticle).toBeTruthy()
    expect(derivedItem.isIndex).toBeFalsy()
    expect(derivedItem.hasVideo).toBe('NO_VIDEOS')
    expect(derivedItem.hasImage).toBe('HAS_IMAGES')
    expect(derivedItem.language).toBe('en')
    expect(derivedItem.title).toBe(
      'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)'
    )
    expect(derivedItem.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg'
    )
    expect(derivedItem.publisher).toBe('Pocket')
    expect(derivedItem.excerpt).toBe(
      'For too long, we have overemphasized the external aspect of choices and underemphasized our internal ability to choose.'
    )
    expect(derivedItem.saveUrl).toBe(expectedSaveUrl)
    expect(derivedItem.externalUrl).toBe(expectedExternalUrl)
    expect(derivedItem.readUrl).toBe(expectedReadUrl)
    expect(derivedItem.permanentUrl).toBe(expectedPermanentUrl)
    expect(derivedItem.timeToRead).toBe(5)
    expect(derivedItem.tags).toStrictEqual([])
    expect(derivedItem.annotations).toBe(undefined)
    expect(derivedItem.images).toStrictEqual([
      {
        src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg'
      }
    ])
    expect(derivedItem.videos).toBe(undefined)
    expect(derivedItem.authors).toStrictEqual([
      {
        item_id: '3059000415',
        author_id: '148370955',
        name: 'Thomas Oppong',
        url: 'https://learn.thomasoppong.com/'
      }
    ])
    expect(derivedItem.analyticsData).toStrictEqual({
      url: expectedSaveUrl
    })
  })

  it('should derive client api data as expected', () => {
    const derivedItem = deriveListItem(legacyListItemFromClientApi)

    expect(derivedItem._createdAt).toBe(1634852432)
    expect(derivedItem._updatedAt).toBe(1634852432)
    expect(derivedItem.status).toBe('UNREAD')
    expect(derivedItem.isFavorite).toBe(true)
    expect(derivedItem.favoritedAt).toBe(1602888587)
    expect(derivedItem.isArchived).toBe(false)
    expect(derivedItem.archivedAt).toBeFalsy()

    expect(derivedItem.itemId).toBe('3059000415')
    expect(derivedItem.resolvedId).toBe('3059000415')

    expect(derivedItem.isSyndicated).toBe(true)
    expect(derivedItem.isReadable).toBe(true)
    expect(derivedItem.isCollection).toBe(false)
    expect(derivedItem.isArticle).toBe(true)
    expect(derivedItem.isIndex).toBe(false)
    expect(derivedItem.hasVideo).toBe('NO_VIDEOS')
    expect(derivedItem.hasImage).toBe('HAS_IMAGES')
    expect(derivedItem.language).toBe('en')
    expect(derivedItem.title).toBe(
      'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)'
    )
    expect(derivedItem.thumbnail).toBe(
      'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg'
    )
    expect(derivedItem.publisher).toBe('Thomas Oppong')
    expect(derivedItem.excerpt).toBe(
      'For too long, we have overemphasized the external aspect of choices and underemphasized our internal ability to choose.'
    )
    expect(derivedItem.saveUrl).toBe(expectedSaveUrl)
    expect(derivedItem.externalUrl).toBe(expectedExternalUrl)
    expect(derivedItem.readUrl).toBe(expectedReadUrl)
    expect(derivedItem.permanentUrl).toBe(expectedPermanentUrl)
    expect(derivedItem.timeToRead).toBe(5)
    expect(derivedItem.tags).toStrictEqual([])
    expect(derivedItem.images).toStrictEqual([
      {
        src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg'
      }
    ])
    expect(derivedItem.videos).toBe(null)
    expect(derivedItem.authors).toStrictEqual([
      {
        id: '148370955',
        name: 'Thomas Oppong',
        url: 'https://learn.thomasoppong.com/'
      }
    ])
    expect(derivedItem.analyticsData).toStrictEqual({
      url: expectedSaveUrl
    })
  })
})
