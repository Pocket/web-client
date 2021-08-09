import { updateSaveStatus } from './items.state'
import { deriveDiscoverItems } from './items.derive'

// An item without expected values that make up the bulk of the visuals in a card
// EX: title, excerpt, images.  These are assumed to always be there, but there
// is a possibility they may be missing

// prettier-ignore
const itemWithMissingData = [
  {
      item: {
        isArticle: true,
        title: 'Simone Biles Finds Her Balance',
        itemId: '3357439790',
        normalUrl: 'http://glamour.com/story/simone-biles-finds-her-balance',
        resolvedId: '3357439791',
        resolvedUrl: 'https://www.glamour.com/story/simone-biles-finds-her-balance',
        domain: null,
        domainMetadata: { name: 'glamour.com' },
        excerpt: 'Thanks to a global pandemic, the greatest gymnast in history was forced to spend part of the last year finding some equilibrium in a life that had previously been all about the work. “I lived, I traveled, I did things I couldn’t do because of gymnastics,” she says.',
        hasImage: 'HAS_IMAGES',
        hasVideo: 'HAS_VIDEOS',
        images:     [
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 1,
            src: 'https://media.glamour.com/photos/60c27a1e56abbdcc1c897b6c/master/w_2560%2Cc_limit/Simone-sq.jpg',
            width: 0
          },
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 2,
            src: 'https://media.glamour.com/photos/60bfc37c27ca633a4e3a236f/master/w_1600%2Cc_limit/SimoneBiles_Cover.jpg',
            width: 0
          },
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 3,
            src: 'https://media.glamour.com/photos/60baa5e0d571ac6581080348/master/w_1600%2Cc_limit/20210410%252520K%252520CARTER%252520GLAMOUR%252520SB_0424_F4.jpg',
            width: 0
          },
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 4,
            src: 'https://media.glamour.com/photos/60c127d627ca633a4e3a23d5/master/w_1600%2Cc_limit/divider.jpg',
            width: 0
          },
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 5,
            src: 'https://media.glamour.com/photos/60c12bc833f8aa67c0facffd/master/w_1600%2Cc_limit/20210410%252520K%252520CARTER%252520GLAMOUR%252520SB_0273_F5.jpg',
            width: 0
          },
          {
            caption: '',
            credit: '',
            height: 0,
            imageId: 6,
            src: 'https://media.glamour.com/photos/60bfd9317be0bcd4ebce6726/master/w_1600%2Cc_limit/Simone-3.jpg',
            width: 0
          }
        ],
        topImageUrl: 'https://media.glamour.com/photos/60c398ba422dbde6db2b10be/16:9/w_1280,c_limit/20210410%2520K%2520CARTER%2520GLAMOUR%2520SB_0513_F4.png',
        wordCount: 2229,
        timeToRead: 10,
        givenUrl: 'http://glamour.com/story/simone-biles-finds-her-balance',
        syndicatedArticle: null
      },
      id: 'RecommendationAPI/3357439790',
      curatedInfo: {
        title: 'Simone Biles Finds Her Balance',
        excerpt: 'As she prepares for the 2021 Olympics—maybe her last—the 24-year-old is approaching her sport with a new sense of joy.',
        imageSrc: 'https://media.glamour.com/photos/60c398ba422dbde6db2b10be/16:9/w_1280,c_limit/20210410%2520K%2520CARTER%2520GLAMOUR%2520SB_0513_F4.png'
      },
      slateLineup: {
        requestId: 'd875dbad-d80b-49ff-a006-74773061ed7f',
        experimentId: 'fc6d7d9',
        id: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
      },
      slate: {
        requestId: 'ae98f30c-38f0-44d4-868e-986de9f8a8bb',
        experimentId: '0e07667',
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
      const expectedSaveUrl = 'http://glamour.com/story/simone-biles-finds-her-balance' //prettier-ignore
      const expectedOpenUrl = 'http://glamour.com/story/simone-biles-finds-her-balance?utm_source=pocket_discover' //prettier-ignore
      const expectedOriginalUrl = 'http://glamour.com/story/simone-biles-finds-her-balance' //prettier-ignore
      const expectedResolvedUrl = 'https://www.glamour.com/story/simone-biles-finds-her-balance'
      expect(derivedItems[0]).toStrictEqual({
        title: 'Simone Biles Finds Her Balance',
        item_id: '3357439790',
        resolved_id: '3357439791',
        thumbnail:
          'https://media.glamour.com/photos/60c398ba422dbde6db2b10be/16:9/w_1280,c_limit/20210410%2520K%2520CARTER%2520GLAMOUR%2520SB_0513_F4.png',
        publisher: 'glamour.com',
        excerpt:
          'As she prepares for the 2021 Olympics—maybe her last—the 24-year-old is approaching her sport with a new sense of joy.',
        save_url: expectedSaveUrl,
        open_url: expectedOpenUrl,
        original_url: expectedOriginalUrl,
        resolved_url: expectedResolvedUrl,
        read_time: 10,
        syndicated: false,
        save_status: 'unsaved',
        openExternal: false,
        recommendationId: 'RecommendationAPI/3357439790',
        slateLineup: {
          requestId: 'd875dbad-d80b-49ff-a006-74773061ed7f',
          experimentId: 'fc6d7d9',
          id: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
        },
        slate: {
          requestId: 'ae98f30c-38f0-44d4-868e-986de9f8a8bb',
          experimentId: '0e07667',
          id: '48e766be-5e96-46fb-acbf-55fee3ae8a28'
        }
      })
    })
  })
})
