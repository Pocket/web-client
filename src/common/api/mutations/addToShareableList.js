import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const bulkCreateShareableListItemsQuery = gql`
  mutation BulkCreateShareableListItems($listExternalId: ID!, $items: [AddItemInput!]!) {
    addToShareableList(listExternalId: $listExternalId, items: $items) {
      externalId
      listItems {
        createdAt
        excerpt
        externalId
        imageUrl
        itemId
        sortOrder
        title
        updatedAt
        url
        publisher
      }
    }
  }
`

export function bulkCreateShareableListItems(items, listExternalId) {
  return requestGQL({
    query: bulkCreateShareableListItemsQuery,
    operationName: 'bulkCreateShareableListItemsQuery',
    variables: { items, listExternalId }
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
