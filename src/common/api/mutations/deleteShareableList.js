import { gql } from 'graphql-request'
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
    .then((response) => response?.data?.deleteShareableList)
    .catch((error) => console.error(error))
}
