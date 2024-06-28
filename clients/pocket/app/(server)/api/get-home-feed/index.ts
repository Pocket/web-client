import { gql, pocketRequest } from '@common/utilities/pocket-request'
import { getErrorMessage } from '@common/utilities/error-handler'

// Types
import type { CorpusSlate, CorpusRecommendation, SlateLineup } from '@common/types/pocket'
import type { Item } from '@common/types'

export type HomeQueryResponse = {
  itemsById: Record<string, Item>
  slatesById: Record<string, CorpusSlate>
  slateArray: string[]
}
type ResponseError = { responseError?: string }

/**
 * getHomeQuery
 * ---
 * Request query for HomeCorpus slate lineups
 */
const getHomeQuery = gql`
  query Home($locale: String) {
    homeSlateLineup(locale: $locale) {
      slates {
        id
        recommendationReasonType
        headline
        subheadline
        moreLink {
          url
          text
        }
        recommendations(count: 12) {
          id
          corpusItem {
            imageUrl
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
 * getHomeSlate
 * ---
 * Returns corpus recommendations slates.  Logged out will provide generics, while logged in
 * will be based on usage profiles
 */
export async function getHomeSlates(locale: string): Promise<HomeQueryResponse | ResponseError> {
  try {
    const response = await pocketRequest({
      query: getHomeQuery,
      variables: { locale }
    })

    const slates = response?.data?.homeSlateLineup?.slates
    if (!slates) throw new HomeRequestError('No slates were returned')

    const itemsById = slates
      .map(getItemsFromSlate)
      .reduce((previous: any, current: any) => ({ ...previous, ...current }), {})

    const slatesById = slates.reduce(processSlates, {})
    const slateArray = slates.map((slate: CorpusSlate) => slate.id)

    return { itemsById, slatesById, slateArray }
  } catch (error) {
    return { responseError: getErrorMessage(error) }
  }
}

/**
 * getItemsFromSlate
 * ---
 * We want to store items by ID to normalize things, this gives us back a items by id
 */
function getItemsFromSlate({ recommendations }: { recommendations: CorpusRecommendation[] }) {
  return recommendations.reduce((previous, current) => {
    const corpusItem = current?.corpusItem
    const topic = current?.reason?.name
    const corpusRecommendationId = current?.id
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

/**
 * processSlates
 * ---
 * We want to store items by ID to normalize things, this gives us back a flattened slates by id
 */
function processSlates(previous: any, { recommendations, ...slate }: CorpusSlate) {
  const recIds = recommendations.map((rec) => rec.id)
  return { ...previous, [slate.id]: { ...slate, recommendations: recIds } }
}

class HomeRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'HomeRequestError'
  }
}
