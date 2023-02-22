import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const createShareableListQuery = gql`
  mutation CreateShareableList($data: CreateShareableListInput!) {
    createShareableList(data: $data) {
      title
      status
      slug
      moderationStatus
      description
      externalId
    }
  }
`
export function createShareableList({ title, description }) {
  return requestGQL({
    query: createShareableListQuery,
    operationName: 'createShareableList',
    variables: { data: { title, description } }
  })
    .then((response) => response?.data?.createShareableList)
    .catch((error) => console.error(error))
}
