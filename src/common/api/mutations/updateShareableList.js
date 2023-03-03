import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const updateShareableListQuery = gql`
  mutation updateShareableList($data: UpdateShareableListInput!) {
    updateShareableList(data: $data) {
      updatedAt
      title
      status
      description
    }
  }
`
export function updateShareableList({ title, description, externalId, status }) {
  const data = {
    description,
    externalId,
    status,
    title
  }

  return requestGQL({
    query: updateShareableListQuery,
    operationName: 'updateShareableList',
    variables: { data }
  })
    .then((response) => {
      console.log({ response })
      return response?.data?.updateShareableList
    })
    .catch((error) => console.error(error))
}
