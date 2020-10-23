import { request } from 'common/utilities/request/request'

/**
 * Fetch Article text from Parser
 */
export const getArticleText = (url) => {
  return request({
    path: 'v3/getItemArticle',
    data: {
      url //resolved_url
    },
    auth: true
  })
}

export const getSuggestedTags = (itemId) => {
  return request({
    path: 'v3/getSuggestedTags',
    data: {
      version: 2,
      item_id: itemId
    }
  })
}

// Can this scope be limited? Or include it with the item request?
export const getRecentFriends = () => {
  return request({
    path: 'v3/get',
    data: {
      images: 1,
      videos: 1,
      tags: 1,
      rediscovery: 1,
      annotations: 1,
      authors: 1,
      itemTopics: 1,
      meta: 1,
      posts: 1,
      total: 1,
      state: 'all',
      shares: 'recent_friends',
      count: 1,
      locale_lang: 'en-US'
    }
  })
}
