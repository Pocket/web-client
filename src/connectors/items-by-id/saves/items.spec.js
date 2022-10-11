import { deriveSavesItems } from './items.derive'

// An item without expected values that make up the bulk of the visuals in a card
// EX: title, excerpt, images.  These are assumed to always be there, but there
// is a possibility they may be missing

const itemWithMissingData = [
  {
    item_id: '3059000416',
    resolved_id: '3059000415',
    given_url:
      'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
    given_title: '',
    favorite: '0',
    status: '0',
    time_added: '1601654256',
    time_updated: '1601654256',
    time_read: '0',
    time_favorited: '0',
    sort_id: 1,
    resolved_title:
      'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)',
    resolved_url:
      'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
    excerpt:
      'Many of us work in an endless stream of tasks, emails, notifications, meetings, multitasking in the process, never pausing and never ending. Pursuing more and more every day. Information overload is killing our brains.',
    is_article: '1',
    is_index: '0',
    has_video: '0',
    has_image: '1',
    word_count: '1181',
    lang: 'en',
    time_to_read: 5,
    top_image_url:
      'https://pocket-image-cache.com/1200x/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg',
    authors: {
      72862635: {
        item_id: '670857795',
        author_id: '72862635',
        name: 'Mark Singer',
        url: 'https://www.newyorker.com/contributors/mark-singer'
      }
    },
    images: {
      1: {
        item_id: '3059000415',
        image_id: '1',
        src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg',
        width: '0',
        height: '0',
        credit: '© Marco Bottigelli / Getty Images',
        caption: ''
      }
    },
    domain_metadata: {
      name: 'Pocket',
      logo: 'https://logo.clearbit.com/getpocket.com?size=800',
      greyscale_logo: 'https://logo.clearbit.com/getpocket.com?size=800&greyscale=true'
    },
    listen_duration_estimate: 457
  }
]

describe('Saves Items', () => {
  describe('deriveItemData', () => {
    it('should derive data as expected', () => {
      const derivedItems = deriveSavesItems(itemWithMissingData)
      const expectedSaveUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential' //prettier-ignore
      const expectedOpenUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential?utm_source=pocket_saves' //prettier-ignore
      const expectedOriginalUrl =
        'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential'
      const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=3059000416'
      expect(derivedItems[0]).toStrictEqual({
        item_id: '3059000416',
        resolved_id: '3059000415',
        favorite: '0',
        status: '0',
        time_added: '1601654256',
        time_updated: '1601654256',
        time_read: '0',
        time_favorited: '0',
        sort_id: 1,
        isCollection: false,
        is_article: '1',
        is_index: '0',
        has_video: '0',
        has_image: '1',
        lang: 'en',
        listen_duration_estimate: 457,
        openExternal: false,
        title:
          'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)',
        thumbnail:
          'https://pocket-image-cache.com/1200x/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F5173%2F1595617454_GettyImages-1168909015.jpgcrop.jpg',
        publisher: 'Pocket',
        excerpt:
          'Many of us work in an endless stream of tasks, emails, notifications, meetings, multitasking in the process, never pausing and never ending. Pursuing more and more every day. Information overload is killing our brains.',
        save_url: expectedSaveUrl,
        open_url: expectedOpenUrl,
        original_url: expectedOriginalUrl,
        permanent_url: expectedPermanentUrl,
        resolved_url:
          'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential',
        read_time: 5,
        syndicated: false,
        tags: undefined,
        annotations: undefined,
        images: {
          1: {
            item_id: '3059000415',
            image_id: '1',
            src: 'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg',
            width: '0',
            height: '0',
            credit: '© Marco Bottigelli / Getty Images',
            caption: ''
          }
        },
        videos: undefined,
        authors: {
          72862635: {
            item_id: '670857795',
            author_id: '72862635',
            name: 'Mark Singer',
            url: 'https://www.newyorker.com/contributors/mark-singer'
          }
        }
      })
    })
  })
})
