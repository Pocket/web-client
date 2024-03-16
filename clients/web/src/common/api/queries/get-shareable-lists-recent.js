import { requestGQL } from 'common/utilities/request/request'
import * as Sentry from '@sentry/nextjs'
import { gql } from 'common/utilities/gql/gql'

const getRecentShareableListsQuery = gql`
  query GetShareableLists($pagination: PaginationInput) {
    shareableLists {
      title
      externalId
      items(pagination: $pagination) {
        edges {
          cursor
          node {
            title
            externalId
            itemId: externalId
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

export async function getRecentShareableLists() {
  const variables = {
    pagination: { first: 30 }
  }

  return requestGQL({
    query: getRecentShareableListsQuery,
    operationName: 'GetRecentShareableLists',
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableLists, errors } = response?.data || {}
    if (errors) throw new GetRecentShareableListsError(errors)
    return shareableLists
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetRecentShareableListsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetRecentShareableListsError'
  }
}
