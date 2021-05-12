import { requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'

import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

export async function getDiscoverFeed(recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPIC_IDS['explore'].id, recommendationCount }
  })
    .then(processSlates)
    .catch((error) => console.error(error))
}

function getIdsForAnalytics(data) {
  const { id, experimentId, requestId } = data
  return {
    requestId,
    experimentId,
    id
  }
}

function processSlates(response) {
  const slateLineup = getIdsForAnalytics(response?.data?.getSlateLineup)
  const slates = response?.data?.getSlateLineup?.slates || []
  const top = slates[0]?.recommendations.map(item => {
    return {
      ...item,
      slateLineup,
      slate: getIdsForAnalytics(slates[0])
    }
  })
  const bottom = slates[1]?.recommendations.map(item => {
    return {
      ...item,
      slateLineup,
      slate: getIdsForAnalytics(slates[1])
    }
  })

  return [...top, ...bottom]
}
