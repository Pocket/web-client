const gql = String.raw

const getHomeQuery = gql`
  query Home($locale: String) {
    homeSlateLineup(locale: $locale) {
      slates {
        slateId: id
        recommendationReasonType
        headline
        subheadline
        moreLink {
          url
          text
        }
        recommendations(count: 12) {
          corpusRecommendationId: id
          corpusItem {
            imageUrl
            thumbnail: imageUrl
            url
            title
            excerpt
            language
            publisher
            authors {
              name
            }
          }
          reason {
            name
            type
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
export async function getUnifiedHome(locale: string) {
  return requestGQL({
    query: getHomeQuery,
    operationName: 'GetHome',
    variables: { locale }
  })
    .then(handleResponse)
    .catch((error: Error) => {
      // Return error to client here
      return { error }
    })
}

function handleResponse(response) {
  const slates = response?.data?.homeSlateLineup?.slates
  if (!slates) throw new HomeRequestError()

  const itemsById = slates
    .map(getItemsFromSlate)
    .reduce((previous, current) => ({ ...previous, ...current }), {})

  const slatesById = slates.reduce(processSlates, {})
  const slateArray = slates.map((slate) => slate.slateId)

  return { itemsById, slatesById, slateArray }
}

function getItemsFromSlate({ recommendations }) {
  return recommendations.reduce((previous, current) => {
    const corpusItem = current?.corpusItem
    const topic = current?.reason?.name
    const corpusRecommendationId = current?.corpusRecommendationId
    if (!corpusItem) return previous
    return {
      ...previous,
      [corpusRecommendationId]: {
        ...corpusItem,
        externalUrl: corpusItem.url,
        saveUrl: corpusItem.url,
        itemId: corpusRecommendationId,
        topic,
        corpusRecommendationId,
        analyticsData: {
          url: corpusItem.url,
          corpusRecommendationId
        }
      }
    }
  }, {})
}

function processSlates(previous, { recommendations, ...slate }) {
  const recIds = recommendations.map((rec) => rec.corpusRecommendationId)
  return { ...previous, [slate.slateId]: { ...slate, recommendations: recIds } }
}

class HomeRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'HomeRequestError'
  }
}
