import { request } from 'common/utilities/request/request'

/**
 * Get the topic page feed
 * @param {string} topic Topic to fetch
 * @param {int} (optional @default 5) curated_count Number of curated articles to return
 * @param {int} (optional @default 20) algorithmic_count Number of community sourced articles to return
 */
export function getTopicFeed(topic, curated = 5, algorithmic = 20, ssr = true) {
  return request({
    path: 'v3/discover/topics',
    ssr,
    params: {
      topics: topic,
      curated_count: curated,
      algorithmic_count: algorithmic
    }
  })
}

/**
 * Get the list of currated topics
 */
export function getTopicList(ssr) {
  return request({
    ssr,
    path: 'v3/discover/topicList'
  })
}
