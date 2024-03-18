import { requestGQL } from 'common/utilities/request/request'
import { TOPICS_BY_NAME } from 'common/constants'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { processLineup } from 'common/api/derivers/lineups'
import { gql } from 'common/utilities/gql/gql'

const getTopicLineupQuery = gql`
  query GetTopicLineup($id: String!, $recommendationCount: Int, $slateCount: Int) {
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
          curatedInfo {
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

export async function getTopicLineup(topic, recommendationCount = 30) {
  return requestGQL({
    query: getTopicLineupQuery,
    operationName: 'GetTopicLineup',
    variables: { id: TOPICS_BY_NAME[topic].id, recommendationCount, slateCount: 2 }
  })
    .then((response) => handleResponse(response, topic))
    .catch((error) => console.error(error))
}

function handleResponse(response, topic) {
  const { slateItemArrays, itemsById } = processLineup(response, `pocket_discover_${topic}`)
  const curatedItems = slateItemArrays[0]
  const algorithmicItems = slateItemArrays[1]

  // This is due to a disparity with how old school `collections` in topics work.
  // `collections` are 100% curated, so we have to check if there are any algorithmic
  // items in the response and either return the full curated payload OR slice the top 5 curated
  // and return the rest as algorithmic
  const curatedItemIds = algorithmicItems ? curatedItems.slice(0, 5) : curatedItems
  const algorithmicIds = algorithmicItems ? algorithmicItems : []

  return { itemIds: [...curatedItemIds, ...algorithmicIds], itemsById }
}
