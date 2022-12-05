import { deriveProfile } from 'common/api/derivers/item'

export const profileFromV3 = {
  feed_item_id: '5c5ec4c7-869b-4975-bacc-1a77b93fc90d',
  sort_id: 2,
  open_as: 'web',
  item: {
    user_id: '20137205',
    resolved_id: '1331787958',
    item_id: '1224052564',
    resolved_url:
      'https://medium.com/the-mission/it-s-much-easier-than-you-think-to-live-the-life-you-want-41e8356660bc',
    title: 'It\u2019s Much Easier Than You Think to Live the Life You Want',
    excerpt:
      'Maybe not \u201ceasy\u201d, but entirely possible. I recently listened to an episode of The World Wanderers Podcast where the host discussed working at a cafe in a great city that a lot of people would love to live in.',
    word_count: '1142',
    has_image: '1',
    has_video: '0',
    is_index: '0',
    is_article: '1',
    domain: 'medium.com',
    given_url:
      'https://medium.com/life-learning/it-s-much-easier-than-you-think-to-live-the-life-you-want-41e8356660bc#.f1mva9pd9',
    given_title:
      'It\u2019s Much Easier Than You Think to Live the Life You Want \u2014 Life Learning \u2014',
    favorite: '0',
    status: '2',
    time_added: '1460254882',
    time_updated: '1515628264',
    time_read: '1463417751',
    time_favorited: '0',
    image_src: 'https://cdn-images-1.medium.com/max/2000/1*YgK0w0_glqG9va3fQ2o_1Q.jpeg',
    positions: {
      1: {
        item_id: '1224052564',
        view: '1',
        section: '0',
        page: '1',
        node_index: '0',
        percent: '23',
        time_spent: '0',
        time_updated: '1463417755'
      }
    },
    authors: {
      33387238: {
        item_id: '1224052564',
        author_id: '33387238',
        name: 'Isaac Morehouse',
        url: 'https://medium.com/@isaacmorehouse'
      }
    },
    image: {
      item_id: '1224052564',
      src: 'https://miro.medium.com/max/2160/1*YgK0w0_glqG9va3fQ2o_1Q.jpeg',
      width: '1080',
      height: '717'
    },
    images: {
      1: {
        item_id: '1224052564',
        image_id: '1',
        src: 'https://miro.medium.com/max/2160/1*YgK0w0_glqG9va3fQ2o_1Q.jpeg',
        width: '1080',
        height: '717',
        credit: '',
        caption: 'Photo Credit: Rafael Le\u00e3o'
      }
    },
    amp_url: 'https://medium.com/amp/p/41e8356660bc',
    domain_metadata: {
      name: 'Medium',
      logo: 'https://logo.clearbit.com/medium.com?size=800',
      greyscale_logo: 'https://logo.clearbit.com/medium.com?size=800&greyscale=true'
    },
    listen_duration_estimate: 442
  },
  post: {
    post_id: '650286',
    quote:
      'Who cares if you bring in $100k a year if it only buys you a crappy apartment that you hate in a city that stresses you out with friends that don\u2019t inspire you and a daily existence you mostly daydream about escaping from?',
    comment: '',
    time_shared: '1463417738',
    like_status: '0',
    repost_status: '0',
    like_count: { count: '2', destination_url: 'https://getpocket.com/app/likes/650286' },
    repost_count: { count: '0', destination_url: 'https://getpocket.com/app/reposts/650286' },
    profile: {
      username: 'joelkelly',
      name: 'Joel McJeebers',
      description: 'Creator of stuff',
      avatar_url:
        'https://s3.amazonaws.com/pocket-profile-images/55bc34a9e087fb401228bc901c0db1f46377020.jpg',
      follower_count: '197',
      follow_count: '8',
      post_count: '19',
      data: null,
      time_updated: '1634617070',
      updated_at: '2021-10-18 23:17:50',
      is_following: '0',
      uid: '62ag0d1dp8cUHAc932T9by8Td8A9pd432fRZ2bO396m9bym16816cd63k89Hdy35',
      type: 'pocket',
      sort_id: 1
    }
  }
}

describe('Profile - Parsed', () => {
  const expectedSaveUrl = 'https://medium.com/life-learning/it-s-much-easier-than-you-think-to-live-the-life-you-want-41e8356660bc#.f1mva9pd9' //prettier-ignore
  const expectedExternalUrl = 'https://medium.com/life-learning/it-s-much-easier-than-you-think-to-live-the-life-you-want-41e8356660bc?utm_source=pocket_profile' //prettier-ignore
  const expectedReadUrl = false
  const expectedPermanentUrl = false
  const expectedAnalyticsUrl = 'https://medium.com/life-learning/it-s-much-easier-than-you-think-to-live-the-life-you-want-41e8356660bc#.f1mva9pd9' //prettier-ignore

  it('should derive v3 as expected', () => {
    const item = deriveProfile(profileFromV3, true)

    // User driven data points
    expect(item._createdAt).toBe(1460254882)
    expect(item._updatedAt).toBe(1515628264)
    expect(item.status).toBeFalsy()
    expect(item.isFavorite).toBe(false)
    expect(item.isArchived).toBe(false)
    expect(item.timeRead).toBeFalsy()
    expect(item.timeFavorited).toBeFalsy()
    expect(item.tags).toStrictEqual([])

    // UnDerived content should come from the server
    expect(item.itemId).toBe('1224052564')
    expect(item.resolvedId).toBe('1331787958')
    expect(item.isSyndicated).toBe(false)
    expect(item.isReadable).toBe(true)
    expect(item.isCollection).toBe(false)
    expect(item.isArticle).toBeTruthy()
    expect(item.isIndex).toBeFalsy()
    expect(item.hasVideo).toBe('NO_VIDEOS')
    expect(item.hasImage).toBe('HAS_IMAGES')
    expect(item.language).toBeFalsy()
    expect(item.fromPartner).toBeFalsy()

    // Derived content
    expect(item.title).toBe('It\u2019s Much Easier Than You Think to Live the Life You Want')
    expect(item.thumbnail).toBe(
      'https://pocket-image-cache.com/600x/filters:format(jpg):extract_focal()/https%3A%2F%2Fmiro.medium.com%2Fmax%2F2160%2F1*YgK0w0_glqG9va3fQ2o_1Q.jpeg'
    )
    expect(item.publisher).toBe('Medium')
    expect(item.excerpt).toBe(
      'Maybe not \u201ceasy\u201d, but entirely possible. I recently listened to an episode of The World Wanderers Podcast where the host discussed working at a cafe in a great city that a lot of people would love to live in.'
    )
    expect(item.saveUrl).toBe(expectedSaveUrl)
    expect(item.externalUrl).toBe(expectedExternalUrl)
    expect(item.readUrl).toBe(expectedReadUrl)
    expect(item.permanentUrl).toBe(expectedPermanentUrl)
    expect(item.isInternalItem).toBe(false)
    expect(item.timeToRead).toBe(6)
    expect(item.authors).toStrictEqual([
      {
        author_id: '33387238',
        item_id: '1224052564',
        name: 'Isaac Morehouse',
        url: 'https://medium.com/@isaacmorehouse'
      }
    ])
    expect(item.analyticsData.url).toBe(expectedAnalyticsUrl)
    expect(item.analyticsData.id).toBe('1224052564')
  })
})
