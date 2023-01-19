import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getCollectionsQuery = gql`
  query GetCollections($filters: CollectionsFiltersInput) {
    getCollections(filters: $filters) {
      collections {
        slug
        title
        excerpt
        intro
        thumbnail: imageUrl
        authors {
          name
          bio
          imageUrl
        }
        stories {
          thumbnail: imageUrl
        }
      }
    }
  }
`

export function getCollections(language = 'en', labels) {
  return requestGQL({
    query: getCollectionsQuery,
    operationName: 'GetCollections',
    variables: {
      filters: {
        labels,
        language
      }
    }
  })
    .then((response) => {
      return response?.data?.getCollections?.collections
    })
    .catch((error) => console.error(error))
}
