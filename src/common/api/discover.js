import { requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import { processLineup } from 'common/api/derivers/lineups'

import getSlateLineup from 'common/api/queries/get-slate-lineup'

export async function getDiscoverFeed({ recommendationCount = 30, locale }) {
  const id = getLocaleId(locale)
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount, slateCount: 2 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const { slateItemArrays, itemsById } = processLineup(response)
  const top = slateItemArrays[0] || []
  const bottom = slateItemArrays[1] || []

  return { items: [...top, ...bottom], itemsById }
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
