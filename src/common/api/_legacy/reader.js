import { request } from 'common/utilities/request/request'

/**
 * Get article from an id
 * @param {*} id Item id to get article data from
 */
export const getArticleFromId = (item_id) => {
  return request({
    path: 'v3/get',
    params: {
      tags: 1, //	int	1 to include Tags in Items
      positions: 0, //	int	1 to include Positions in Items
      authors: 1, //	int	1 to include Authors in Items
      images: 1, //	int	1 to include Images in Items
      videos: 1, //	int	1 to include Videos in Items
      meta: 1, //	int	1 to include ItemMeta in Items
      annotations: 1, //	int	1 to include Annotations in Items
      attribution: 2, //	int	2 to include attributionTypes in the response as well as including ExtendAttribution in Items
      item: item_id,
      state: 'all'
    },
    auth: true
  })
}

/**
 * Fetch Article text from Parser
 */
export const getArticleText = (url) => {
  return request({
    path: 'v3/getItemArticle',
    params: {
      url //resolved_url
    },
    auth: true
  })
}

export const getSuggestedTags = (itemId) => {
  return request({
    path: 'v3/getSuggestedTags',
    params: {
      version: 2,
      item_id: itemId
    },
    auth: true
  })
}

// Can this scope be limited? Or include it with the item request?
export const getRecentFriends = () => {
  return request({
    path: 'v3/get',
    params: {
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
    },
    auth: true
  })
}
