import { gql } from 'graphql-request'

const getCollections = gql`
  query GetCollections {
    getCollections {
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

export default getCollections
