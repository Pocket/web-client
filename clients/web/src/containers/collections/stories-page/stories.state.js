import { COLLECTION_STORIES_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'
import { getCollectionBySlug } from 'common/api/queries/get-collection-by-slug'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateStoryPage = (storyIdsBySlug) => ({ type: COLLECTION_STORIES_HYDRATE, storyIdsBySlug }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const pageCollectionStoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_STORIES_HYDRATE: {
      const { storyIdsBySlug } = action
      return { ...state, ...storyIdsBySlug }
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
 * fetchCollectionBySlug
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return data {object} An object representing the collection
 */
export async function fetchCollectionBySlug({ slug }) {
  try {
    const response = await getCollectionBySlug(slug)
    const { itemsById, storyIdsBySlug } = response || {}

    // No items by id here.  We could throw an error, but this might break things when
    // collections are in a non-published state.  As it stands right now,
    // this is handled on the page side
    if (!itemsById) return

    return { itemsById, storyIdsBySlug }
  } catch (error) {
    console.warn('collection.state.collectionBySlug', error)
  }
}
