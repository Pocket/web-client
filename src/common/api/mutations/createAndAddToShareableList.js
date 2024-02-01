import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { processAllList } from 'common/api/derivers/shared-lists'
import * as Sentry from '@sentry/nextjs'

const createAndAddToShareableListQuery = gql`
  mutation CreateAndAddToShareableList(
    $listData: CreateShareableListInput!
    $itemData: [AddItemInput!]!
  ) {
    createAndAddToShareableList(listData: $listData, itemData: $itemData) {
      title
      status
      slug
      moderationStatus
      description
      externalId
      createdAt
      updatedAt
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
export function createAndAddToShareableList(listData, itemData) {
  return requestGQL({
    query: createAndAddToShareableListQuery,
    operationName: 'createAndAddToShareableList',
    variables: { listData, itemData }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { createAndAddToShareableList, errors } = response?.data || {}
    if (errors) throw new CreateAndAddToShareableListError(errors)
    const processedData = processAllList([createAndAddToShareableList])

    return processedData
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class CreateAndAddToShareableListError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateAndAddToShareableListError'
  }
}
