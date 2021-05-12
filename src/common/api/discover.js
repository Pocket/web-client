import { requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import { getRecIds } from 'common/utilities'
import { recommendationsFromSlate } from 'common/utilities'

import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

export async function getDiscoverFeed(recommendationCount = 30) {
  return requestGQL({
    query: getSlateLineup,
    variables: { id: TOPIC_IDS['explore'].id, recommendationCount }
  })
    .then(processSlates)
    .catch((error) => console.error(error))
}

function processSlates(response) {
  const slateLineup = getRecIds(response?.data?.getSlateLineup)
  const slates = response?.data?.getSlateLineup?.slates || []
  const top = recommendationsFromSlate(slates[0], slateLineup)
  const bottom = recommendationsFromSlate(slates[1], slateLineup)

  return [...top, ...bottom]
}
