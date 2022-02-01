import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getCollectionsQuery = gql`
  query GetCollections($getCollectionLang: String!) {
    getCollections(filters: { language: $getCollectionLang }) {
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

export function getCollections(lang = 'en') {
  return requestGQL({
    query: getCollectionsQuery,
    variables: { getCollectionLang: lang }
  })
    .then((response) => response?.data?.getCollections?.collections)
    .catch((error) => console.error(error))
}
