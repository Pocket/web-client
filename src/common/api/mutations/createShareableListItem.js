import { gql } from 'graphql-request'
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
  itemId
}) {
  const data = {
    excerpt,
    imageUrl,
    title,
    url,
    listExternalId,
    publisher,
    itemId,
    sortOrder: 1
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

/** ERRORS
 --------------------------------------------------------------- */
class CreateShareableListItemError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateShareableListItemError'
  }
}
