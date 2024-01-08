import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

const advancedSearchSavedItemsQuery = gql`
  query AdvancedSearch(
    $queryString: String
    $filter: AdvancedSearchFilters
    $sort: SearchSortInput
    $pagination: PaginationInput
  ) {
    user {
      advancedSearch(
        queryString: $queryString
        filter: $filter
        sort: $sort
        pagination: $pagination
      ) {
        edges {
          node {
            searchHighlights {
              fullText
              url
              tags
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
                ...ItemDetails
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export async function getSavedItemsAdvancedSearch({
  filter = {},
  sortOrder = 'DESC', // 'ASC'
  sortBy = 'CREATED_AT', // 'TIME_TO_READ' || 'RELEVANCE'
  queryString = '',
  pagination
}) {
  const variables = getObjectWithValidKeysOnly({
    filter,
    sort: { sortOrder, sortBy },
    queryString,
    pagination
  })

  return requestGQL({ query: advancedSearchSavedItemsQuery, variables })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.advancedSearch
  if (!responseData) throw new MalformedItemAdvancedSearchError()

  const { pageInfo, edges, totalCount } = responseData
  return { pageInfo, edges, totalCount }
}

class MalformedItemAdvancedSearchError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MalformedItemAdvancedSearchError'
  }
}
