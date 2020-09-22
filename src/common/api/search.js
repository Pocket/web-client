import { request } from './request'

/**
 * Get the search page feed
 * @param {string} query single word search term to query
 * @param {int} (optional @default 20) count Number of articles to return
 */
export function getSearchFeed(topic, count = 20) {
  return request({
    path: '/discover/search',
    data: {
      q: topic,
      count
    }
  })
}
