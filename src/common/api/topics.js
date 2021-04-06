import { request } from 'common/utilities/request/request'

import { GraphQLClient } from 'graphql-request'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'
import { GRAPHQL_URL, TOPIC_IDS } from 'common/constants'

export async function getNewTopicFeed(id, recommendationCount = 30) {
  const variables = { id, recommendationCount }

  return request({
    api_url: GRAPHQL_URL,
    path: 'graphql',
    method: 'POST',
    body: JSON.stringify({
      query: getSlateLineup,
      variables
    })
  })
  .then((response) => response.data?.getSlateLineup)
  .catch((error) => console.error(error))
}

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
