import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getCollectionBySlugQuery = gql`
  query GetCollectionBySlug($getCollectionBySlugSlug: String!) {
    collectionBySlug(slug: $getCollectionBySlugSlug) {
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

export function getCollectionBySlug(slug) {
  return requestGQL({
    query: getCollectionBySlugQuery,
    variables: { getCollectionBySlugSlug: slug }
  })
    .then((response) => response?.data?.collectionBySlug)
    .catch((error) => console.error(error))
}
