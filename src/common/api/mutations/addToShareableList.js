import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const bulkCreateShareableListItemsQuery = gql`
  mutation BulkCreateShareableListItems(
    $listExternalId: ID!
    $items: [AddItemInput!]!
    $pagination: PaginationInput
  ) {
    addToShareableList(listExternalId: $listExternalId, items: $items) {
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

export function bulkCreateShareableListItems(items, listExternalId) {
  const variables = {
    pagination: { first: 30 },
    listExternalId,
    items
  }

  return requestGQL({
    query: bulkCreateShareableListItemsQuery,
    operationName: 'bulkCreateShareableListItemsQuery',
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { addToShareableList, errors } = response?.data || {}
    if (errors) throw new BulkCreateShareableListItemsError(errors)

    return addToShareableList
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class BulkCreateShareableListItemsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BulkCreateShareableListItemsError'
  }
}
