import { gql } from 'graphql-request'
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
    .then((response) => {
      console.log({ response })
      return response?.data?.deleteShareableListItem
    })
    .catch((error) => console.error(error))
}
