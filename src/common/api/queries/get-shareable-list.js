import { gql } from 'graphql-request'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'
import { processIndividualList } from 'common/api/derivers/shared-lists'

const getShareableListQuery = gql`
  query ShareableList($externalId: ID!) {
    shareableList(externalId: $externalId) {
      title
      description
      externalId
      slug
      status
      moderationStatus
      createdAt
      updatedAt
      listItems {
        url
        title
        imageUrl
        externalId
        publisher
        excerpt
        authors
        sortOrder
        createdAt
        updatedAt
      }
    }
  }
`
export function getShareableList(externalId) {
  return requestGQL({
    query: getShareableListQuery,
    operationName: 'getShareableList',
    variables: { externalId }
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