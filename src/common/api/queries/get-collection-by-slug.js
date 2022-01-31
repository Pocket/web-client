import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getCollectionBySlug = gql`
  query GetCollectionBySlug($getCollectionBySlugSlug: String!) {
    getCollectionBySlug(slug: $getCollectionBySlugSlug) {
      slug
      title
      excerpt
      intro
      imageUrl
      thumbnail: imageUrl
      authors {
        name
        bio
        imageUrl
      }
      partnership {
        type
        name
        url
        imageUrl
      }
      stories {
        url
        title
        excerpt
        thumbnail: imageUrl
        fromPartner
        authors {
          name
        }
        publisher
        item {
          ...ItemDetails
        }
      }
      externalId
      IABParentCategory {
        slug
      }
      IABChildCategory {
        slug
      }
      curationCategory {
        slug
      }
    }
  }
  ${FRAGMENT_ITEM}
`

export default getCollectionBySlug
