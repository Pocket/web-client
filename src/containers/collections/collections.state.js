import { getCollections } from 'common/api/queries/get-collections'
import { HYDRATE } from 'actions'
import { COLLECTIONS_HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateCollections = (itemSlugs) => ({ type: COLLECTIONS_HYDRATE, itemSlugs })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageCollectionIdsReducers = (state = [], action) => {
  switch (action.type) {
    case COLLECTIONS_HYDRATE: {
      const { itemSlugs } = action
      return itemSlugs
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageCollectionIds } = action.payload
      return pageCollectionIds
    }

    default:
      return state
  }
}

export const pageCollectionStoriesReducers = (state = {}, action) => {
  switch (action.type) {
    case COLLECTIONS_HYDRATE: {
      const { payload } = action
      return { ...payload }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageCollectionStories } = action.payload
      return pageCollectionStories
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
export async function fetchCollections(lang = 'en', labels) {
  try {
    const { itemsBySlug, itemSlugs } = await getCollections(lang, labels)
    return { itemsBySlug, itemSlugs }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('collection.state.collections', error)
  }
}
