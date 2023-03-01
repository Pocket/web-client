import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const deleteShareableListQuery = gql`
  mutation DeleteShareableList($externalId: ID!) {
    deleteShareableList(externalId: $externalId) {
      externalId
    }
  }
`

export function deleteShareableList({ externalId }) {
  return requestGQL({
    query: deleteShareableListQuery,
    operationName: 'deleteShareableList',
    variables: { data: { externalId } }
  })
    .then((response) => response?.data?.deleteShareableList)
    .catch((error) => console.error(error))
}
