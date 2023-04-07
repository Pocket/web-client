import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const createShareableListQuery = gql`
  mutation CreateShareableList($listData: CreateShareableListInput!, $listItemData: CreateShareableListItemWithList) {
    createShareableList(listData: $listData, listItemData: $listItemData) {
      title
      status
      slug
      moderationStatus
      description
      externalId
      createdAt
      updatedAt
      listItems {
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
  }
`
export function createShareableList({ listData, listItemData }) {
  return requestGQL({
    query: createShareableListQuery,
    operationName: 'createShareableList',
    variables: { listData, listItemData }
  })
    .then((response) => {
      const responseData = response?.data?.createShareableList
      const { title, description } = responseData
      return {
        ...responseData,
        title: decodeURIComponent(title),
        description: decodeURIComponent(description)
      }
    })
    .catch((error) => console.error(error))
}
