import { requestGQL } from 'common/utilities/request/request'

import getCollectionBySlugQuery from 'common/api/graphql-queries/get-collection-by-slug'
import getCollectionsQuery from 'common/api/graphql-queries/get-collections'
/**
 * Get a set of collections
 * @param {int} (optional @default 3) count Number of collection sets to return
 */
export function getCollectionSet(count = 3) {
  const path = `/web-client-api/getCollections?count=${count}`
  return fetch(path)
    .then((response) => response.json())
    .catch((error) => error)
}

export function getCollections() {
  return requestGQL({
    query: getCollectionsQuery,
    variables: {}
  })
    .then((response) => response?.data?.getCollections?.collections)
    .catch((error) => console.error(error))
}

export function getCollectionBySlug(slug) {
  return requestGQL({
    query: getCollectionBySlugQuery,
    variables: { getCollectionBySlugSlug: slug }
  })
    .then((response) => response?.data?.getCollectionBySlug)
    .catch((error) => console.error(error))
}
