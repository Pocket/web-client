import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const updateShareableListQuery = gql`
  mutation updateShareableList($data: UpdateShareableListInput!) {
    updateShareableList(data: $data) {
      updatedAt
      title
      status
      description
      slug
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
      const responseData = response?.data?.updateShareableList
      const { title, description } = responseData
      return {
        ...responseData,
        title: decodeURIComponent(title),
        description: decodeURIComponent(description)
      }
    })
    .catch((error) => console.error(error))
}
