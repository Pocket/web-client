import { gql } from 'graphql-request'

const getCollectionBySlug = gql`
  query GetCollectionBySlug($getCollectionBySlugSlug: String!) {
    getCollectionBySlug(slug: $getCollectionBySlugSlug) {
      slug
      title
      excerpt
      intro
      imageUrl
      authors {
        name
        bio
        imageUrl
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
