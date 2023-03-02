import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const createShareableListItemQuery = gql`
  mutation CreateShareableListItem($data: CreateShareableListItemInput!) {
    createShareableListItem(data: $data) {
      createdAt
      excerpt
      externalId
      imageUrl
      itemId
      sortOrder
      title
      updatedAt
      url
      publisher
    }
  }
`
export function createShareableListItem({ url, excerpt, imageUrl, title, listExternalId, publisher }) {
  const data = {
    excerpt,
    imageUrl,
    title,
    url,
    listExternalId,
    publisher,
    sortOrder: 1
  }

  return requestGQL({
    query: createShareableListItemQuery,
    operationName: 'createShareableListItem',
    variables: { data }
  })
    .then((response) => response?.data?.createShareableListItem)
    .catch((error) => console.error(error))
}
