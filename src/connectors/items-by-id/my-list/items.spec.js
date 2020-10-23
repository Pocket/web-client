import assert from 'assert'
import { deriveMyListItems } from './items.derive'

// An item without expected values that make up the bulk of the visuals in a card
// EX: title, excerpt, images.  These are assumed to always be there, but there
// is a possibility they may be missing

const itemWithMissingData = [
  {
    item_id: '3059000415',
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
      133889445: {
        item_id: '3059000415',
        author_id: '133889445',
        name: 'Coronavirus',
        url: 'https://getpocket.com/explore/coronavirus'
      },
      133889446: {
        item_id: '3059000415',
        author_id: '133889446',
        name: 'Business',
        url: 'https://getpocket.com/explore/business'
      },
      133889447: {
        item_id: '3059000415',
        author_id: '133889447',
        name: 'Career',
        url: 'https://getpocket.com/explore/career'
      },
      133889448: {
        item_id: '3059000415',
        author_id: '133889448',
        name: 'Entertainment',
        url: 'https://getpocket.com/explore/entertainment'
      },
      133889449: {
        item_id: '3059000415',
        author_id: '133889449',
        name: 'Food',
        url: 'https://getpocket.com/explore/food'
      },
      133889450: {
        item_id: '3059000415',
        author_id: '133889450',
        name: 'Parenting',
        url: 'https://getpocket.com/explore/parenting'
      },
      133889451: {
        item_id: '3059000415',
        author_id: '133889451',
        name: 'Politics',
        url: 'https://getpocket.com/explore/politics'
      },
      133889452: {
        item_id: '3059000415',
        author_id: '133889452',
        name: 'Science',
        url: 'https://getpocket.com/explore/science'
      },
      133889453: {
        item_id: '3059000415',
        author_id: '133889453',
        name: 'Self Improvement',
        url: 'https://getpocket.com/explore/self-improvement'
      },
      133889454: {
        item_id: '3059000415',
        author_id: '133889454',
        name: 'Technology',
        url: 'https://getpocket.com/explore/technology'
      },
      133889455: {
        item_id: '3059000415',
        author_id: '133889455',
        name: 'Travel',
        url: 'https://getpocket.com/explore/travel'
      },
      133889456: {
        item_id: '3059000415',
        author_id: '133889456',
        name: 'Health & Fitness',
        url: 'https://getpocket.com/explore/health'
      }
    },
    images: {
      1: {
        item_id: '3059000415',
        image_id: '1',
        src:
          'https://pocket-syndicated-images.s3.amazonaws.com/5f1b307571176.jpg',
        width: '0',
        height: '0',
        credit: '© Marco Bottigelli / Getty Images',
        caption: ''
      }
    },
    domain_metadata: {
      name: 'Pocket',
      logo: 'https://logo.clearbit.com/getpocket.com?size=800',
      greyscale_logo:
        'https://logo.clearbit.com/getpocket.com?size=800&greyscale=true'
    },
    listen_duration_estimate: 457
  }
]

describe('My List Items', function () {
  describe('deriveItemData', function () {
    it('should not fail when incomplete item data is passed in', function () {
      const derivedItems = deriveMyListItems(itemWithMissingData)
      const expectedSaveUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential' //prettier-ignore
      const expectedOpenUrl = 'https://getpocket.com/explore/item/the-undisciplined-pursuit-of-more-the-art-of-limiting-yourself-to-only-the-essential' //prettier-ignore

      assert.deepStrictEqual(derivedItems[0], {
        resolved_id: '3059000415',
        favorite: '0',
        status: '0',
        time_added: '1601654256',
        time_updated: '1601654256',
        time_read: '0',
        time_favorited: '0',
        sort_id: 1,
        is_article: '1',
        is_index: '0',
        has_video: '0',
        has_image: '1',
        lang: 'en',
        listen_duration_estimate: 457,
        title:
          'The Undisciplined Pursuit of More (The Art of Limiting Yourself to Only The Essential)',
        thumbnail:
          'https://pocket-image-cache.com/300x200/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Ano_upscale()%3Aformat(jpg)%3Aextract_cover()%2Fhttps%253A%252F%252Fpocket-syndicated-images.s3.amazonaws.com%252Farticles%252F5173%252F1595617454_GettyImages-1168909015.jpgcrop.jpg',
        publisher: 'Pocket',
        excerpt:
          'Many of us work in an endless stream of tasks, emails, notifications, meetings, multitasking in the process, never pausing and never ending. Pursuing more and more every day. Information overload is killing our brains.',
        save_url: expectedSaveUrl,
        open_url: expectedOpenUrl,
        read_time: 5,
        syndicated: false,
        save_status: 'unsaved'
      })
    })
  })
})
