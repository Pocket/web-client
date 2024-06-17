import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const updateShareableListItemsQuery = gql`
  mutation UpdateShareableListItems($data: [UpdateShareableListItemsInput!]!) {
    updateShareableListItems(data: $data) {
      sortOrder
      updatedAt
      externalId
    }
  }
`
export function updateShareableListItems(data) {
  return requestGQL({
    query: updateShareableListItemsQuery,
    operationName: 'updateShareableListItems',
    variables: { data }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { updateShareableListItems, errors } = response?.data || {}
    if (errors) throw new UpdateShareableListItemsError(errors)

    return updateShareableListItems
  } catch (error) {
    console.warn(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class UpdateShareableListItemsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UpdateShareableListItemsError'
  }
}
