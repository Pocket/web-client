import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { deriveCollection, deriveStory } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'

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
    operationName: 'GetCollectionBySlug',
    variables: { getCollectionBySlugSlug: slug }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { stories, ...collectionData } = response?.data?.collectionBySlug || {}

    if (!collectionData) throw new CollectionBySlugRequestError()

    const derivedCollection = deriveCollection(collectionData)
    const collectionBySlug = { [derivedCollection?.slug]: derivedCollection }

    const derivedStories = stories.filter(validateStory).map(deriveStory)

    // const stories = validStories
    const storiesById = arrayToObject(derivedStories, 'itemId')
    const storyIds = Object.keys(storiesById)
    const storyIdsBySlug = { [derivedCollection?.slug]: storyIds }

    return { itemsById: { ...collectionBySlug, ...storiesById }, storyIdsBySlug }
  } catch (error) {
    console.warn(error)
  }
}

function validateStory(story) {
  return story?.item?.itemId?.length && story?.url?.length
}

class CollectionBySlugRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CollectionBySlugRequestError'
  }
}