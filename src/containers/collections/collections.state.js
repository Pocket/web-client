import { deriveCollection } from 'common/api/derivers/item'
import { getCollectionBySlug } from 'common/api/queries/get-collection-by-slug'
import { getCollections } from 'common/api/queries/get-collections'

import { HYDRATE } from 'actions'
import { COLLECTIONS_HYDRATE } from 'actions'

import { arrayToObject } from 'common/utilities/object-array/object-array'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateCollections = (payload) => ({ type: COLLECTIONS_HYDRATE, payload })

/** REDUCERS
 --------------------------------------------------------------- */
export const collectionsPageReducers = (state = [], action) => {
  switch (action.type) {
    case COLLECTIONS_HYDRATE: {
      const { payload } = action
      return Object.keys(payload)
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { collectionsPage } = action.payload
      return collectionsPage
    }

    default:
      return state
  }
}


export const collectionsBySlugReducers = (state = {}, action) => {
  switch (action.type) {
    case COLLECTIONS_HYDRATE: {
      const { payload } = action
      return { ...payload }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { collectionsBySlug } = action.payload
      return { ...state, ...collectionsBySlug }
    }

    default:
      return state
  }
}


/** ASYNC Functions
 --------------------------------------------------------------- */
/**
 * fetchCollections
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return data {object} An object representing the collection
 */
export async function fetchCollections(lang = 'en') {
  try {
    const response = await getCollections(lang)
    if (!response) return { error: 'No data found' }

    const derivedCollections = response.map((collection) => deriveCollection(collection))
    return arrayToObject(derivedCollections, 'slug')
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('collection.state.collections', error)
  }
}

/**
 * fetchCollectionBySlug
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return data {object} An object representing the collection
 */
export async function fetchCollectionBySlug({ slug }) {
  try {
    const response = await getCollectionBySlug(slug)
    if (!response) return { error: 'No data found' }

    const { stories: passedStories, storiesById, ...rest } = response
    const url = `/collections/${slug}`
    // Derive items
    const validStories = passedStories.filter(validateStory)
    const stories = validStories.map((story) => story?.item?.itemId)

    return {
      collection: {
        [slug]: {
          itemId: slug,
          stories,
          url,
          pageSaveStatus: 'unsaved',
          saveStatus: 'unsaved',
          ...rest
        }
      },
      storiesById,
      stories: validStories
    }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('collection.state.collectionBySlug', error)
  }
}

const validateStory = function (story) {
  return story?.item?.itemId?.length && story?.url?.length
}

export async function fetchArrayOfCollectionSlugs(slugs) {
  try {
    const getSlugsCollections = async () => {
      return Promise.all(slugs.map((slug) => getCollectionBySlug(slug)))
    }

    const response = await getSlugsCollections()
    const derivedCollections = response.map((collection) => deriveCollection(collection))
    const collections = arrayToObject(derivedCollections, 'slug')
    return collections
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('collection.state.collectionBySlug', error)
  }
}
