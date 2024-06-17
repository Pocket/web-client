import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { processAllList } from 'common/api/derivers/shared-lists'

const getShareableListsQuery = gql`
  query GetShareableLists($pagination: PaginationInput) {
    shareableLists {
      title
      description
      status
      slug
      listItemNoteVisibility
      createdAt
      updatedAt
      moderationStatus
      externalId
      items(pagination: $pagination) {
        edges {
          cursor
          node {
            title
            imageUrl
            externalId
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`

export async function getShareableLists() {
  const variables = {
    pagination: { first: 30 }
  }

  return requestGQL({
    query: getShareableListsQuery,
    operationName: 'GetShareableLists',
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableLists, errors } = response?.data || {}
    if (errors) throw new GetShareableListsError(errors)
    const processedData = processAllList(shareableLists)

    return processedData
  } catch (error) {
    console.warn(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetShareableListsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetShareableListsError'
  }
}
