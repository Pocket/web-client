import { SUPPORTED_LOCALES } from '@common/localization'

import { getErrorMessage } from '@common/utilities/error-handler'
import { gql, pocketRequest } from '@common/utilities/pocket-request'

import { FRAGMENT_ITEM_PREVIEW } from '../_fragments/preview'

// Types
import type {
  CorpusSlate,
  CorpusRecommendation,
  CorpusSlateLineup,
  PocketMetadata
} from '@common/types/pocket'

interface ResponseError {
  responseError?: string
}

export type SlateWithRecIds = {
  recIds: string[]
} & Omit<CorpusSlate, 'recommendations'>

export interface HomeQueryResponse {
  itemsById: Record<string, PocketMetadata>
  slatesById: Record<string, SlateWithRecIds>
  slateArray: string[]
}

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
        recommendationReasonType
        recommendations(count: 12) {
          corpusItem {
            preview {
              ...ItemPreviewFragment
            }
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

    const slatesWithItemsById = slates.map(getItemsFromSlate)
    const itemsById = combineSlateItems(slatesWithItemsById)

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
function getItemsFromSlate({
  recommendations
}: {
  recommendations: CorpusRecommendation[]
}): Record<string, PocketMetadata> {
  return recommendations.reduce((previous, current) => {
    const corpusItem = current?.corpusItem
    if (!corpusItem) return previous
    const preview = current?.corpusItem?.preview
    const id = preview.id
    return { ...previous, [id]: preview }
  }, {})
}

/**
 * CombineSlateItems
 * ---
 * Quick utility to get a single object of items with ids as the key
 */
function combineSlateItems(
  objects: Record<string, PocketMetadata>[]
): Record<string, PocketMetadata> {
  return objects.reduce((acc, obj) => {
    return { ...acc, ...obj }
  }, {})
}

/**
 * processSlates
 * ---
 * We want to store items by ID to normalize things, this gives us back a flattened slates by id
 */
function processSlates(
  previous: Record<string, SlateWithRecIds>,
  { recommendations, ...slate }: CorpusSlate
) {
  const recIds = recommendations.map((rec) => rec?.corpusItem?.preview?.id)
  return { ...previous, [slate.id]: { ...slate, recIds } }
}

class HomeRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'HomeRequestError'
  }
}
