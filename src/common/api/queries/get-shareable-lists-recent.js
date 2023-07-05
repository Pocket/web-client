import { requestGQL } from 'common/utilities/request/request'
import * as Sentry from '@sentry/nextjs'
import { gql } from 'common/utilities/gql/gql'

const getRecentShareableListsQuery = gql`
  query GetShareableLists {
    shareableLists {
      title
      externalId
      listItems {
        externalId
        itemId: externalId
      }
    }
  }
`
export async function getRecentShareableLists() {
  return requestGQL({
    query: getRecentShareableListsQuery,
    operationName: 'GetRecentShareableLists'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableLists, errors } = response?.data || {}
    if (errors) throw new GetRecentShareableListsError(errors)
    return shareableLists
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetRecentShareableListsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetRecentShareableListsError'
  }
}
