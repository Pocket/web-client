import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const deleteShareableListItemQuery = gql`
  mutation deleteShareableListItem($externalId: ID!) {
    deleteShareableListItem(externalId: $externalId) {
      externalId
    }
  }
`
export function deleteShareableListItem({ id }) {
  return requestGQL({
    query: deleteShareableListItemQuery,
    operationName: 'deleteShareableListItem',
    variables: { externalId: id }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { deleteShareableListItem, errors } = response?.data || {}
    if (errors) throw new DeleteShareableListItemError(errors)

    return deleteShareableListItem
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class DeleteShareableListItemError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DeleteShareableListItemError'
  }
}
