import { requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import { getRecIds } from 'common/utilities'
import { recommendationsFromSlate } from 'common/utilities'

import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

export async function getDiscoverFeed({ recommendationCount = 30, locale }) {
  const id = getLocaleId(locale)
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount, slateCount: 2 }
  })
    .then(processSlates)
    .catch((error) => console.error(error))
}

function processSlates(response) {
  const slateLineup = getRecIds(response?.data?.getSlateLineup)
  const slates = response?.data?.getSlateLineup?.slates || []
  const top = slates[0] ? recommendationsFromSlate(slates[0], slateLineup) : []
  const bottom = slates[1] ? recommendationsFromSlate(slates[1], slateLineup) : []

  return [...top, ...bottom]
}

const getLocaleId = function (locale) {
  switch (locale) {
    case 'de': {
      return TOPIC_IDS['explore']['de'].id
    }

    default: {
      return TOPIC_IDS['explore']['en'].id
    }
  }
}
