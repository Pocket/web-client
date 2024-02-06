import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { processAllList } from 'common/api/derivers/shared-lists'
import * as Sentry from '@sentry/nextjs'

const createAndAddToShareableListQuery = gql`
  mutation CreateAndAddToShareableList(
    $listData: CreateShareableListInput!
    $itemData: [AddItemInput!]!
    $pagination: PaginationInput
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
export function createAndAddToShareableList(listData, itemData) {
  const variables = {
    pagination: { first: 30 },
    listData,
    itemData
  }

  return requestGQL({
    query: createAndAddToShareableListQuery,
    operationName: 'createAndAddToShareableList',
    variables
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
