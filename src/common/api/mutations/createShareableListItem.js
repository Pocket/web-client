import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const createShareableListItemQuery = gql`
  mutation CreateShareableListItem($data: CreateShareableListItemInput!) {
    createShareableListItem(data: $data) {
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
`
export function createShareableListItem({
  url,
  excerpt,
  imageUrl,
  title,
  listExternalId,
  publisher,
  itemId,
  sortOrder
}) {
  const data = {
    excerpt,
    imageUrl,
    title,
    url,
    listExternalId,
    publisher,
    itemId,
    sortOrder
  }

  return requestGQL({
    query: createShareableListItemQuery,
    operationName: 'createShareableListItem',
    variables: { data }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { createShareableListItem, errors } = response?.data || {}
    if (errors) throw new CreateShareableListItemError(errors)

    return createShareableListItem
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

export function bulkAddShareableListItem(items) {
  // NOTE: pulling it from the array is temporary
  const { excerpt, imageUrl, title, url, listExternalId, publisher, itemId, sortOrder } = items[0]
  const data = {
    excerpt,
    imageUrl,
    title,
    url,
    listExternalId,
    publisher,
    itemId,
    sortOrder
  }

  return requestGQL({
    query: createShareableListItemQuery,
    operationName: 'createShareableListItemBulk',
    variables: { data }
  })
    .then(handleBulkResponse)
    .catch((error) => console.error(error))
}

function handleBulkResponse(response) {
  try {
    const { createShareableListItem, errors } = response?.data || {}
    // TODO: handle your errors!
    // error can also mean "already in list" and that's not necessarily
    // an "error" error, more a misunderstanding. Let's be better
    if (errors) throw new CreateShareableListItemBulkError(errors)

    return createShareableListItem
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class CreateShareableListItemError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateShareableListItemError'
  }
}

class CreateShareableListItemBulkError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateShareableListItemBulkError'
  }
}
