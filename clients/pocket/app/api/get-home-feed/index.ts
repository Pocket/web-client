import { gql, pocketRequest } from '@common/utilities/pocket-request'
import { getErrorMessage } from '@common/utilities/error-handler'
import { SUPPORTED_LOCALES } from '@common/localization'
import { FRAGMENT_ITEM_PREVIEW } from '../_fragments/preview'

// Types
import type { CorpusSlate, CorpusRecommendation, CorpusSlateLineup } from '@common/types/pocket'
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
            preview {
              ...ItemPreview
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

  ${FRAGMENT_ITEM_PREVIEW}
`

/**
 * getHomeSlate
 * ---
 * Returns corpus recommendations slates.  Logged out will provide generics, while logged in
 * will be based on usage profiles
 */
export async function getHomeSlates(locale: string): Promise<HomeQueryResponse | ResponseError> {
  try {
    const localeToUse = SUPPORTED_LOCALES.includes(locale) ? locale : 'en'
    const response = await pocketRequest<{ homeSlateLineup: CorpusSlateLineup }>({
      query: getHomeQuery,
      variables: { locale: localeToUse }
    })

    const slates = response?.homeSlateLineup?.slates
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
    const preview = current?.corpusItem?.preview
    const topic = current?.reason?.name
    const corpusRecommendationId = current?.id
    if (!corpusItem) return previous
    return {
      ...previous,
      [corpusRecommendationId]: {
        ...preview,
        externalUrl: preview.url,
        saveUrl: preview.url,
        id: corpusRecommendationId,
        itemId: corpusRecommendationId,
        topic,
        corpusRecommendationId,
        analyticsData: {
          url: preview.url,
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
