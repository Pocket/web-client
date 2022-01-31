import { requestGQL } from 'common/utilities/request/request'

import getCollectionBySlugQuery from 'common/api/queries/get-collection-by-slug'
import getCollectionsQuery from 'common/api/queries/get-collections'

export function getCollections(lang = 'en') {
  return requestGQL({
    query: getCollectionsQuery,
    variables: { getCollectionLang: lang }
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
