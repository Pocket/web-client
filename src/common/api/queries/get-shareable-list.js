import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'
import { processIndividualList } from 'common/api/derivers/shared-lists'

const getShareableListQuery = gql`
  query ShareableList($externalId: ID!, $pagination: PaginationInput) {
    shareableList(externalId: $externalId) {
      title
      description
      externalId
      slug
      status
      listItemNoteVisibility
      moderationStatus
      createdAt
      updatedAt
      items(pagination: $pagination) {
        edges {
          cursor
          node {
            url
            title
            imageUrl
            externalId
            publisher
            excerpt
            authors
            note
            sortOrder
            createdAt
            updatedAt
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

export function getShareableList(externalId, pagination) {
  const variables = {
    pagination,
    externalId
  }

  return requestGQL({
    query: getShareableListQuery,
    operationName: 'getShareableList',
    variables
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableList, errors } = response?.data || {}

    if (errors) throw new GetShareableListError(errors)
    const processedData = processIndividualList(shareableList, 'pocket_list')

    return processedData
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetShareableListError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetShareableListError'
  }
}
