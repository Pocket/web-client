import { getErrorMessage } from '@common/utilities/error-handler'
import { gql, pocketRequest } from '@common/utilities/pocket-request'

import { getClaims, verifySession } from '../user-info/session'

import { FRAGMENT_ITEM_PREVIEW } from '../_fragments/preview'
import { FRAGMENT_ITEM_SAVED_INFO } from '../_fragments/saved-info'

// Types
import type { ResponseError } from '@common/types'
import type {
  Item,
  PageInfo,
  PaginationInput,
  PocketMetadata,
  SavedItem,
  SavedItemConnection,
  SavedItemsFilter,
  SavedItemsPage,
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

    const convertedEdges = edges
      ?.map((edge) => {
        const { item, ...savedData } = edge?.node || {}

        // We are gonna filter pending items out
        // ?? NOTE: Pending item was a future pattern to separate parser response
        // ?? from metadata.  As it stands, this is not fully implemented, but we
        // ?? will still handle this case for type safety
        if (item?.__typename === 'PendingItem') return false

        const { preview, itemId, shareId } = item as Item
        return { preview: { ...preview, itemId }, savedData }
      })
      .filter(Boolean)

    const itemsById = convertedEdges.reduce((previous, current) => {
      const { preview, saveData } = current
      return { ...previous, [preview.itemId]: preview }
    }, {})

    const saveDataById = convertedEdges.reduce((previous, current) => {
      const { preview, saveData } = current
      return { ...previous, [preview.itemId]: saveData }
    }, {})

    const savePageIds = edges.map((edge) => edge?.node?.item?.itemId)

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
