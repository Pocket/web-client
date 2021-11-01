import { request, requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'
import { getRecIds } from 'common/utilities'
import { recommendationsFromSlate } from 'common/utilities'

export async function getNewTopicFeed(topic, recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPIC_IDS[topic].id, recommendationCount, slateCount: 2 }
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

function processSlates(response) {
  const slateLineup = getRecIds(response?.data?.getSlateLineup)
  const slates = response?.data?.getSlateLineup?.slates || []
  const curated = slates[0] ? recommendationsFromSlate(slates[0], slateLineup) : []
  const algorithmic = slates[1] ? recommendationsFromSlate(slates[1], slateLineup) : []

  return { curated, algorithmic }
}
