import { request } from 'common/utilities/request/request'

export function getSaves(data) {
  return request({
    path: 'v3/get',
    auth: true,
    params: {
      tags: 1, //	int	1 to include Tags in Items
      positions: 1, //	int	1 to include Positions in Items
      authors: 1, //	int	1 to include Authors in Items
      images: 1, //	int	1 to include Images in Items
      videos: 1, //	int	1 to include Videos in Items
      itemTopics: 1, //	int	1 to include Topics in Items
      meta: 1, //	int	1 to include ItemMeta in Items
      posts: 1, //	int	1 to include Posts in Items
      annotations: 1, //	int	1 to include Annotations in Items
      rediscovery: 1, // 1 to include carousel and highlights in the response, and also include badge_group_id in the Item
      total: 1, // include total number of items
      attribution: 2, //	int	2 to include attributionTypes in the response as well as including ExtendAttribution in Items
      state: 'all', // Only return items of this status. Supported values: unread, read, any active when omitted, all unread and archived items are returned
      sort: 'newest', //Sort preference. newest, oldest, title, site, relevance (relevance is premium only)
      ...data
    }
  })
}

export function searchSaves(data) {
  return request({
    path: 'v3/get',
    auth: true,
    params: {
      tags: 1, //	int	1 to include Tags in Items
      positions: 1, //	int	1 to include Positions in Items
      authors: 1, //	int	1 to include Authors in Items
      images: 1, //	int	1 to include Images in Items
      videos: 1, //	int	1 to include Videos in Items
      itemTopics: 1, //	int	1 to include Topics in Items
      meta: 1, //	int	1 to include ItemMeta in Items
      posts: 1, //	int	1 to include Posts in Items
      annotations: 1, //	int	1 to include Annotations in Items
      total: 1, // include total number of items
      attribution: 2, //	int	2 to include attributionTypes in the response as well as including ExtendAttribution in Items
      ...data
    }
  })
}

export function fetchSaves(params) {
  return request({
    path: 'v3/fetch',
    auth: true,
    params
  })
}
