/**
 * Gets a Lineup based on an id (at present we gather these from the D&L team)
 *
 * Explore options here:
 * https://studio.apollographql.com/graph/pocket-client-api/explorer?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoDKANgIYoIAyAlkgjAA4AUAJE2OkQoo8LAOYBCADRFueBFAhxESMHSYQkAYQgxUAgJKoAlEWAAdJEStFR5anUYs2XAM616zVh338ZfaXIKSsiqKOpaOnoygYrKoeHauigm5pbWVggAHuz4TMooPhbpVnxFxW4OLqZlxUSlabVgTC7stAQAcjSINcVgCC5QIuxhGj3pMcEqahpVqbXpTPRw1Q3zVnIuEFQAbghghatriwhwB2vpYShUCGPzWVD4w7e1oky7SACqeFTPxUgQeDgNCoXx%2Bh3mGy2uzAoN%2B6UgQJYcOsCJoLAAsuQaKEaCtzn8ujdwbUAL7IkouACCeDCUGu5KIAAsaC4AGp8BAQBnMlz6IG2BkoCDsPk0Wyw4nFPJi-p4-HWKA0YbhBlWQZ7RaqoguPBQBlkyXpADuALAiVQgryCAAKhAAEoIbEMlwEFRMRX0MDU2nXOXy7VUGCifXIg34%2Br42B4Bz7JAAMwgfvOl3phus90eKAZ0tsFF1od%2BYeKRasRZJIEkIG2NBENAARtcXBgQHMiGYQKUMG2QFAAIwADjrABZe2B%2BwBafu9gAM0-HQ%2BnAGYAOzjmg0ABsQ-nvY3AE490OEKOh1A4%2B2LOWSUA&variant=current
 *
 * Slate: Corpus of recommendations based on a particular concept (topic, curation, personalized, etc.)
 * Lineup: Set of slates generated from different sources (curation, algorithms, etc.)
 *
 */
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { requestGQL } from 'common/utilities/request/request'
import { TOPIC_IDS } from 'common/constants'
import { processLineup } from 'common/api/derivers/lineups'

const getDiscoverLineupQuery = gql`
  query GetDiscoverLineup($id: String!, $recommendationCount: Int, $slateCount: Int) {
    getSlateLineup(
      slateLineupId: $id
      recommendationCount: $recommendationCount
      slateCount: $slateCount
    ) {
      slateLineupExperiment: experimentId
      slateLineupRequestId: requestId
      slateLineupId: id
      slates {
        slateId: id
        slateRequestId: requestId
        slateExperiment: experimentId
        displayName
        description
        recommendations {
          recommendationId: id
          id
          curatedInfo: corpusItem {
            title
            excerpt
            imageSrc
          }
          item {
            ...ItemDetails
          }
        }
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export async function getDiscoverLineup({ recommendationCount = 30, locale }) {
  const id = getLocaleId(locale)
  return requestGQL({
    query: getDiscoverLineupQuery,
    operationName: 'GetDiscoverLineup',
    variables: { id, recommendationCount, slateCount: 2 }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const { slateItemArrays, itemsById } = processLineup(response, 'pocket_discover')
  const top = slateItemArrays[0] || []
  const bottom = slateItemArrays[1] || []

  return { itemIds: [...top, ...bottom], itemsById }
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
