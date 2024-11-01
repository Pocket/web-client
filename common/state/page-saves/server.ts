import { getErrorMessage } from '@common/utilities/error-handler'
import { gql, pocketRequest } from '@common/utilities/pocket-request'

import { FRAGMENT_ITEM_PREVIEW } from '../_fragments/preview'

import { FRAGMENT_ITEM_SAVED_INFO } from '../_fragments/saved-info'
import { verifySession } from '../user-info/session'

// Types
import type { ResponseError, ExcludesFalse } from '@common/types'
import type {
  Item,
  PageInfo,
  PaginationInput,
  PocketMetadata,
  SavedItem,
  SavedItemsFilter,
  SavedItemsSort,
  User
} from '@common/types/pocket'

// Custom Types for this return
export interface UserSavesQueryResponse {
  itemsById: Record<string, PocketMetadata>
  saveDataById: Record<string, SavedItem>
  savePageIds: string[]
  savePageInfo: PageInfo & {
    totalCount: number
  }
}

interface UserSavesArguments {
  pagination: PaginationInput
  sort?: SavedItemsSort
  filter?: SavedItemsFilter
}

type SavedData = Omit<SavedItem, 'item'>

interface ConvertedEdge {
  preview: PocketMetadata & { itemId: string }
  savedData: SavedData
}

const getUserSavesQuery = gql`
  query UserSaves($pagination: PaginationInput, $sort: SavedItemsSort, $filter: SavedItemsFilter) {
    user {
      savedItems(pagination: $pagination, sort: $sort, filter: $filter) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            item {
              ... on Item {
                itemId
                preview {
                  ...ItemPreviewFragment
                }
              }
            }
            ...ItemSavedFragment
          }
        }
      }
    }
  }
  ${FRAGMENT_ITEM_PREVIEW}
  ${FRAGMENT_ITEM_SAVED_INFO}
`

/**
 * getUserSaves
 * ---
 * Returns users saves
 */
export async function getUserSaves(
  variables: UserSavesArguments
): Promise<UserSavesQueryResponse | ResponseError> {
  try {
    const authResponse = await verifySession()

    const { token, isAuthenticated } = authResponse

    if (!isAuthenticated) throw new PageSavesError('User not authenticated')

    const response = await pocketRequest<{ user: Pick<User, 'savedItems'> }>(
      {
        query: getUserSavesQuery,
        variables
      },
      token
    )

    const savedItems = response?.user?.savedItems
    if (!savedItems) throw new PageSavesError('Issue retrieving user saves ')

    const { edges, pageInfo, totalCount } = savedItems

    // If there are no edges for some reason, let's just assume no items
    if (!edges) {
      return {
        itemsById: {},
        saveDataById: {},
        savePageIds: [],
        savePageInfo: { ...pageInfo, totalCount: 0 }
      }
    }

    // Let's run a quick consolidation so it's easier to normalize the data
    const convertedEdges: ConvertedEdge[] = edges
      .map((edge) => {
        const { item, ...savedData } = edge?.node ?? {}

        // We are gonna filter pending items out
        if (item?.__typename === 'PendingItem') return false

        const { preview, itemId } = item as Item
        return { preview: { ...preview, itemId }, savedData } as ConvertedEdge
      })
      .filter(Boolean as unknown as ExcludesFalse)

    // If something went wrong, let's abandon ship
    if (!convertedEdges?.length) throw new PageSavesError('Malformed Edges')

    const itemsById = convertedEdges.reduce((previous, current) => {
      const { preview } = current
      return { ...previous, [preview.itemId]: preview }
    }, {})

    const saveDataById = convertedEdges.reduce((previous, current) => {
      const { preview, savedData } = current
      return { ...previous, [preview.itemId]: savedData }
    }, {})

    const savePageIds = edges
      .map((edge) => edge?.node?.item?.itemId ?? false)
      .filter(Boolean as unknown as ExcludesFalse)

    return {
      itemsById,
      saveDataById,
      savePageIds,
      savePageInfo: { ...pageInfo, totalCount }
    }
  } catch (error) {
    return { responseError: getErrorMessage(error) }
  }
}

/**
 * UserRequestError
 * ---
 * Generic UserRequestError to make visibility more useful
 */
class PageSavesError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'PageSavesError'
  }
}
