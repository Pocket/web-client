import { request } from 'common/utilities/request/request'

/**
 * Get the search page feed
 * @param {string} query single word search term to query
 * @param {int} (optional @default 20) count Number of articles to return
 */
export function getSearchFeed(topic, count = 20) {
  return request({
    path: 'v3/discover/search',
    params: {
      q: topic,
      count
    }
  })
}

export function getRecentSearches() {
  const since = Date.now() // This means we won't get list items back
  return request({
    path: 'v3/get',
    auth: true,
    params: {
      premium: 1,
      forcepremium: 1,
      since
    }
  })
}

export function saveRecentSearches(search) {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'recent_search', search }]
    })
  }).then((response) => response)
}
