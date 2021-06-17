import { updateSaveStatus } from './items.state'
import { deriveDiscoverItems } from './items.derive'

// An item without expected values that make up the bulk of the visuals in a card
// EX: title, excerpt, images.  These are assumed to always be there, but there
// is a possibility they may be missing

// prettier-ignore
const itemWithMissingData = [
  {
    feed_item_id: '3458ace2-35c6-4ea5-a4ff-c004ccd7de0d-raff1a2c6',
    item: {
      item_id: '2951848646',
      resolved_id: '2954307210',
      normal_url: 'http://bloomberg.com/features/2020-carnival-cruise-coronavirus',
      resolved_url: 'https://www.bloomberg.com/features/2020-carnival-cruise-coronavirus/?utm_source=pocket&utm_medium=email&utm_campaign=pockethits',
      response_code: '503',
      content_length: '33',
      encoding: '',
      title: '',
      excerpt: '',
      word_count: '0',
      has_image: '0',
      has_video: '0',
      is_index: '0',
      is_article: '0',
      authors: [],
      images: [],
      videos: [],
      resolved_normal_url: 'http://bloomberg.com/features/2020-carnival-cruise-coronavirus?utm_source=pocket&utm_medium=email&utm_campaign=pockethits',
      domain_metadata: {
        name: 'Bloomberg',
        logo: 'https://logo.clearbit.com/bloomberg.com?size=800',
        greyscale_logo: 'https://logo.clearbit.com/bloomberg.com?size=800&greyscale=true'
      }
    },
    redirect_url: 'https://getpocket.com/redirect?url=https%3A%2F%2Fwww.bloomberg.com%2Ffeatures%2F2020-carnival-cruise-coronavirus%2F%3Futm_source%3Dpocket%26utm_medium%3Demail%26utm_campaign%3Dpockethits&h=8f2057741c81b67e7964c83fcb945e25b2722814bab17193be67e2b45350ccf3&nt=0',
    id: 'RecommendationAPI/3296676960',
    slateLineup: {
      requestId: '4bf3d704-1f73-4d39-9a97-935a4c982e5d',
      experimentId: 'fc6d7d9',
      id: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
    },
    slate: {
      requestId: '344a9e86-80e1-4c01-820f-17940d1628f4',
      experimentId: '3ec8c48',
      id: '48e766be-5e96-46fb-acbf-55fee3ae8a28'
    }
  }
]

describe('Discover Items', () => {
  let state = {}

  describe('updateSaveStatus', () => {
    beforeEach(() => {
      state = {
        abc123: { name: 'mittens', save_status: 'unsaved' },
        def456: { name: 'kittens', save_status: 'unsaved' }
      }
    })

    it('updates save status for a specific id correctly', () => {
      const newState = updateSaveStatus(state, 'abc123', 'saved')
      expect(newState['abc123'].save_status).toBe('saved')
      expect(newState['def456'].save_status).toBe('unsaved')
    })
  })

  describe('deriveItemData', () => {
    it('should not fail when incomplete item data is passed in', () => {
      const derivedItems = deriveDiscoverItems(itemWithMissingData)
      const expectedSaveUrl = 'http://bloomberg.com/features/2020-carnival-cruise-coronavirus' //prettier-ignore
      const expectedOpenUrl = 'https://getpocket.com/redirect?url=https%3A%2F%2Fwww.bloomberg.com%2Ffeatures%2F2020-carnival-cruise-coronavirus%2F%3Futm_source%3Dpocket%26utm_medium%3Demail%26utm_campaign%3Dpockethits' //prettier-ignore
      const expectedPermanentUrl = 'https://getpocket.com/library/?pl_i=2951848646' //prettier-ignore
      const expectedOriginalUrl = 'http://bloomberg.com/features/2020-carnival-cruise-coronavirus' //prettier-ignore

      expect(derivedItems[0]).toStrictEqual({
        title: 'http://bloomberg.com/features/2020-carnival-cruise-coronavirus',
        item_id: '2951848646',
        resolved_id: '2954307210',
        thumbnail: false,
        publisher: 'Bloomberg',
        excerpt: null,
        save_url: expectedSaveUrl,
        open_url: expectedOpenUrl,
        original_url: expectedOriginalUrl,
        permanent_url: expectedPermanentUrl,
        read_time: null,
        syndicated: false,
        save_status: 'unsaved',
        openExternal: true,
        recommendationId: 'RecommendationAPI/3296676960',
        slateLineup: {
          requestId: '4bf3d704-1f73-4d39-9a97-935a4c982e5d',
          experimentId: 'fc6d7d9',
          id: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
        },
        slate: {
          requestId: '344a9e86-80e1-4c01-820f-17940d1628f4',
          experimentId: '3ec8c48',
          id: '48e766be-5e96-46fb-acbf-55fee3ae8a28'
        }
      })
    })
  })
})
