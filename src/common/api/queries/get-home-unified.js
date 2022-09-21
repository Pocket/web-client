import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getHomeQuery = gql`
  query Home {
    homeSlateLineup {
      slates {
        slateId: id
        recommendationReasonType
        headline
        subheadline
        moreLink {
          url
          text
        }
        recommendations {
          corpusItem {
            corpusItemId: id
            imageUrl
            url
            title
            excerpt
            language
            publisher
            authors {
              name
            }
            topic
          }
        }
      }
    }
  }
`

/**
 * getUnifiedHome will transition to getHome once we are clear of legacy home implimentations
 * @param {} param0
 * @returns
 */
export async function getUnifiedHome() {
  return requestGQL({
    query: getHomeQuery,
    operationName: 'GetHome',
    variables: {}
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const slates = response?.data?.homeSlateLineup?.slates
  if (!slates) throw new HomeRequestError()

  const itemsById = slates.map(getItemsFromSlate).reduce((p, c) => ({ ...p, ...c }), {})
  const slatesById = slates.reduce(processSlates, {})
  const slateArray = slates.map((slate) => slate.slateId)

  return { itemsById, slatesById, slateArray }
}

function getItemsFromSlate({ recommendations }) {
  return recommendations.reduce((previous, current) => {
    const corpusItem = current?.corpusItem
    if (!corpusItem) return previous
    return { ...previous, [corpusItem.corpusItemId]: corpusItem }
  }, {})
}

function processSlates(previous, { recommendations, ...slate }) {
  const recIds = recommendations.map((rec) => rec.corpusItem?.corpusItemId)
  return { ...previous, [slate.slateId]: { ...slate, recommendations: recIds } }
}

class HomeRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'HomeRequestError'
  }
}
