import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { deriveCollection } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'

const getCollectionsQuery = gql`
  query GetCollections($filters: CollectionsFiltersInput) {
    getCollections(filters: $filters) {
      collections {
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
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const collections = response?.data?.getCollections?.collections

  if (!collections) throw new CollectionsRequestError()

  const items = collections.map((collection) => deriveCollection(collection))
  const itemsBySlug = arrayToObject(items, 'slug')
  const itemSlugs = Object.keys(itemsBySlug)

  return { itemsBySlug, itemSlugs }
}

class CollectionsRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionsRequestError'
  }
}


