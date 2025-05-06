import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { deriveCollection, deriveStory } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { IABLookup } from 'common/iab'

const getCollectionBySlugQuery = gql`
  query GetCollectionBySlug($getCollectionBySlugSlug: String!) {
    collectionBySlug(slug: $getCollectionBySlugSlug) {
      slug
      itemId: slug
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
  if (!slug) return // No slug, no collection for you

  return requestGQL({
    query: getCollectionBySlugQuery,
    operationName: 'GetCollectionBySlug',
    variables: { getCollectionBySlugSlug: slug }
  })
    .then((response) => handleResponse(response, slug))
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { collectionBySlug, errors } = response?.data || {}
    const { stories, ...collectionData } = collectionBySlug || {}

    if (errors) throw new CollectionBySlugRequestError(errors)
    if (!stories?.length) throw new CollectionBySlugStoriesError(stories)

    const collectionWithIab = reverseLookupIAB(collectionData)
    const derivedCollection = deriveCollection(collectionWithIab)
    const derivedCollectionBySlug = { [derivedCollection?.slug]: derivedCollection }
    const derivedStories = stories?.filter(validateStory).map(deriveStory)

    // const stories = validStories
    const storiesById = arrayToObject(derivedStories, 'itemId')
    const storyIds = derivedStories.map((i) => i.itemId)
    const storyIdsBySlug = { [derivedCollection?.slug]: storyIds }

    return { itemsById: { ...derivedCollectionBySlug, ...storiesById }, storyIdsBySlug }
  } catch (error) {
    console.error(error)
  }
}

function validateStory(story) {
  return story?.item?.itemId?.length && story?.url?.length
}

function reverseLookupIAB(data) {
  const iabSubCategory = data.IABChildCategory?.slug
  const iabTopCategory = data.IABParentCategory?.slug
  const iabSubCategoryId = iabSubCategory ? findKeyByLabel(iabSubCategory.trim()) : null
  const iabTopCategoryId = iabTopCategory ? findKeyByLabel(iabTopCategory.trim()) : null
  return { ...data, iabSubCategoryId, iabTopCategoryId }
}

function findKeyByLabel(labelToFind) {
  const entry = IABLookup.find((item) => item.formatted === labelToFind)
  return entry ? entry.id : null
}
/** ERRORS
 --------------------------------------------------------------- */
class CollectionBySlugRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionBySlugRequestError'
  }
}

class CollectionBySlugStoriesError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionBySlugStoriesError'
  }
}
