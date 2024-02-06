import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { processAllList } from 'common/api/derivers/shared-lists'
import * as Sentry from '@sentry/nextjs'

const createShareableListQuery = gql`
  mutation CreateShareableList(
    $listData: CreateShareableListInput!
    $listItemData: CreateShareableListItemWithList
    $pagination: PaginationInput
  ) {
    createShareableList(listData: $listData, listItemData: $listItemData) {
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
export function createShareableList({ listData, listItemData }) {
  const variables = {
    pagination: { first: 30 },
    listItemData,
    listData
  }

  return requestGQL({
    query: createShareableListQuery,
    operationName: 'createShareableList',
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { createShareableList, errors } = response?.data || {}
    if (errors) throw new CreateShareableListError(errors)
    const processedData = processAllList([createShareableList])

    return processedData
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class CreateShareableListError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CreateShareableListError'
  }
}
