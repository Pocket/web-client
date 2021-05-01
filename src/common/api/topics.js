import { request, requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

export async function getNewTopicFeed(topic, recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPIC_IDS[topic].id, recommendationCount }
  })
    .then(processSlates)
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

function processSlates(response) {
  const slates = response?.data?.getSlateLineup?.slates || []
  const curated = slates[0]?.recommendations
  const algorithmic = slates[1]?.recommendations
  return { curated, algorithmic }
}
