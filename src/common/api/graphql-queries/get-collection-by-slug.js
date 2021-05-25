import { gql } from 'graphql-request'

const getCollectionBySlug = gql`
  query Query($getCollectionBySlugSlug: String!) {
    getCollectionBySlug(slug: $getCollectionBySlugSlug) {
      slug
      title
      excerpt
      intro
      imageUrl
      authors {
        name
      }
      stories {
        url
        title
        excerpt
        thumbnail: imageUrl
        authors {
          name
        }
        publisher
        item_id: externalId
      }
    }
  }
`

export default getCollectionBySlug
