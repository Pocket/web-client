import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { deriveCollection } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import * as Sentry from '@sentry/nextjs'

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

/** Slugs only in this one ... it is used in server side renders to seed statc paths
 --------------------------------------------------------------- */
const getCollectionsSlugsQuery = gql`
  query GetCollections($filters: CollectionsFiltersInput) {
    getCollections(filters: $filters) {
      collections {
        slug
      }
    }
  }
`

export function getCollectionsSlugs(language = 'en', labels) {
  return requestGQL({
    query: getCollectionsSlugsQuery,
    operationName: 'GetCollectionSlugs',
    variables: {
      filters: {
        labels,
        language
      }
    }
  })
    .then(handleSlugsResponse)
    .catch((error) => console.error(error))
}

function handleSlugsResponse(response) {
  try {
    const { getCollections, errors } = response?.data || {}
    const { collections = [] } = getCollections
    const slugs = collections.map((collection) => collection?.slug)

    if (errors) throw new CollectionsRequestError(errors)
    if (!collections.length || !slugs.length) throw new CollectionsRequestEmptyError()

    return { slugs }
  } catch (error) {
    Sentry.captureMessage(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */

class CollectionsRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionsRequestError'
  }
}

class CollectionsRequestEmptyError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionsRequestError'
  }
}



