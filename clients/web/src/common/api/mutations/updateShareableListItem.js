import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const updateShareableListItemQuery = gql`
  mutation UpdateShareableListItem($data: UpdateShareableListItemInput!) {
    updateShareableListItem(data: $data) {
      note
      updatedAt
      externalId
    }
  }
`
export function updateShareableListItem({ externalId, note }) {
  const data = {
    externalId,
    note
  }

  return requestGQL({
    query: updateShareableListItemQuery,
    operationName: 'updateShareableListItem',
    variables: { data }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { updateShareableListItem, errors } = response?.data || {}
    if (errors) throw new UpdateShareableListItemError(errors)

    return updateShareableListItem
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class UpdateShareableListItemError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UpdateShareableListItemError'
  }
}
