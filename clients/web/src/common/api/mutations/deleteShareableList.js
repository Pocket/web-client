import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const deleteShareableListQuery = gql`
  mutation DeleteShareableList($externalId: ID!) {
    deleteShareableList(externalId: $externalId) {
      externalId
    }
  }
`

export function deleteShareableList({ id }) {
  return requestGQL({
    query: deleteShareableListQuery,
    operationName: 'deleteShareableList',
    variables: { externalId: id }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { deleteShareableList, errors } = response?.data || {}
    if (errors) throw new DeleteShareableListError(errors)

    return deleteShareableList
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class DeleteShareableListError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DeleteShareableListError'
  }
}
