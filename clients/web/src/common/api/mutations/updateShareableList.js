import { gql } from 'common/utilities/gql/gql'
import * as Sentry from '@sentry/nextjs'
import { requestGQL } from 'common/utilities/request/request'

const updateShareableListQuery = gql`
  mutation updateShareableList($data: UpdateShareableListInput!) {
    updateShareableList(data: $data) {
      updatedAt
      title
      status
      description
      slug
      listItemNoteVisibility
    }
  }
`
export function updateShareableList({
  title,
  description,
  externalId,
  status,
  listItemNoteVisibility
}) {
  const data = {
    description,
    externalId,
    status,
    title,
    listItemNoteVisibility
  }

  return requestGQL({
    query: updateShareableListQuery,
    operationName: 'updateShareableList',
    variables: { data }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { updateShareableList, errors } = response?.data || {}
    if (errors) throw new UpdateShareableListError(errors)

    return updateShareableList
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class UpdateShareableListError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UpdateShareableListError'
  }
}
