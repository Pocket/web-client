import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM_PREVIEW } from '../fragments/fragment.preview'
import { itemFiltersFromGraph } from './get-saved-items.filters'
import { actionToCamelCase } from 'common/utilities/strings/strings'

const searchSavedItemsQuery = gql`
  query SearchSavedItems(
    $sort: SearchSortInput
    $pagination: PaginationInput
    $filter: AdvancedSearchFilters
    $queryString: String
  ) {
    user {
      advancedSearch(
        filter: $filter
        queryString: $queryString
        pagination: $pagination
        sort: $sort
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
        edges {
          node {
            searchHighlights {
              fullText
              title
            }
            savedItem {
              url
              _createdAt
              _updatedAt
              id
              status
              isFavorite
              favoritedAt
              isArchived
              archivedAt
              tags {
                id
                name
              }
              item {
                ... on Item {
                  givenUrl
                  itemId
                  isArticle
                  hasImage
                  hasVideo
                  timeToRead
                  shareId: id
                  preview {
                    ...ItemPreview
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${FRAGMENT_ITEM_PREVIEW}
`

/**
 * searchSavedItems({filter, sort, pagination, term})
 * @param {*} filter - object
 * @param {*} sort - object
 * @param {*} pagination - object
 * @param {*} term - string
 * @returns
 */
export async function getSavedItemsSearch({
  actionType,
  sortOrder = 'DESC',
  pagination,
  searchTerm: queryString
}) {
  const requestDetails = itemFiltersFromGraph[actionType]
  if (!requestDetails) throw new MalformedItemSearchError()

  const { filter, sort } = requestDetails

  const variables = {
    ...(filter && { filter }),
    sort: { ...sort, sortOrder },
    queryString,
    pagination
  }
  const operationName = actionToCamelCase(actionType)

  return requestGQL({ query: searchSavedItemsQuery, operationName, variables })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.advancedSearch
  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedItemSearchError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedItemSearchError'
  }
}
