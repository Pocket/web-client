import { requestGQL } from 'common/utilities/request/request'
import * as Sentry from '@sentry/nextjs'
import { gql } from 'common/utilities/gql/gql'
import { processAllList } from 'common/api/derivers/shared-lists'

const getShareableListsQuery = gql`
  query GetShareableLists {
    shareableLists {
      title
      description
      status
      slug
      listItemNoteVisibility
      createdAt
      updatedAt
      moderationStatus
      externalId
      listItems {
        imageUrl
        externalId
      }
    }
  }
`
export async function getShareableLists() {
  return requestGQL({
    query: getShareableListsQuery,
    operationName: 'GetShareableLists'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableLists, errors } = response?.data || {}
    if (errors) throw new GetShareableListsError(errors)
    const processedData = processAllList(shareableLists)

    return processedData
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetShareableListsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetShareableListsError'
  }
}