import { gql } from 'graphql-request'

const getCollections = gql`
  query Query {
    getCollections {
      collections {
        slug
        title
        excerpt
        status
        intro
        imageUrl
        authors {
          name
        }
      }
    }
  }
`

export default getCollections
