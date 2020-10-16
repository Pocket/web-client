import assert from 'assert'
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
    redirect_url: 'https://getpocket.com/redirect?url=https%3A%2F%2Fwww.bloomberg.com%2Ffeatures%2F2020-carnival-cruise-coronavirus%2F%3Futm_source%3Dpocket%26utm_medium%3Demail%26utm_campaign%3Dpockethits&h=8f2057741c81b67e7964c83fcb945e25b2722814bab17193be67e2b45350ccf3&nt=0'
  }
]

describe('Discover Items', function () {
  describe('updateSaveStatus', function () {
    beforeEach(function () {
      this.currentTest.state = {
        abc123: { name: 'mittens', save_status: 'unsaved' },
        def456: { name: 'kittens', save_status: 'unsaved' }
      }
    })

    it('updates save status for a specific id correctly', function () {
      const newState = updateSaveStatus(this.test.state, 'abc123', 'saved')
      assert.strictEqual(newState['abc123'].save_status, 'saved')
      assert.strictEqual(newState['def456'].save_status, 'unsaved')
    })
  })

  describe('deriveItemData', function () {
    it('should not fail when incomplete item data is passed in', function () {
      const derivedItems = deriveDiscoverItems(itemWithMissingData)
      const expectedSaveUrl = 'https://www.bloomberg.com/features/2020-carnival-cruise-coronavirus/?utm_source=pocket&utm_medium=email&utm_campaign=pockethits' //prettier-ignore
      const expectedOpenUrl = 'https://getpocket.com/redirect?url=https%3A%2F%2Fwww.bloomberg.com%2Ffeatures%2F2020-carnival-cruise-coronavirus%2F%3Futm_source%3Dpocket%26utm_medium%3Demail%26utm_campaign%3Dpockethits&h=8f2057741c81b67e7964c83fcb945e25b2722814bab17193be67e2b45350ccf3&nt=0' //prettier-ignore

      assert.deepStrictEqual(derivedItems[0], {
        title: null,
        resolved_id: '2954307210',
        thumbnail: null,
        publisher: 'Bloomberg',
        excerpt: null,
        save_url: expectedSaveUrl,
        open_url: expectedOpenUrl,
        read_time: null,
        syndicated: false,
        save_status: 'unsaved'
      })
    })
  })
})
