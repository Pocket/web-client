import { select, takeEvery, put } from 'redux-saga/effects'
import { getCollectionBySlug } from 'common/api/collections'
import { getCollections } from 'common/api/collections'
import { saveItems } from 'common/api/saveItem'

import { HYDRATE } from 'actions'
import { COLLECTIONS_HYDRATE } from 'actions'
import { COLLECTIONS_SAVE_REQUEST } from 'actions'
import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTIONS_SAVE_FAILURE } from 'actions'

import { arrayToObject } from 'common/utilities'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateCollections = (payload) => ({ type: COLLECTIONS_HYDRATE, payload })
export const saveCollection = (slug) => ({ type: COLLECTIONS_SAVE_REQUEST, slug })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const collectionsReducers = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTIONS_HYDRATE: {
      const { payload } = action
      return { ...payload }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { collections } = action.payload
      return { ...state, ...collections }

    case COLLECTIONS_SAVE_REQUEST: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], saveStatus: 'saving' } }
    }

    case COLLECTIONS_SAVE_SUCCESS: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], saveStatus: 'saved' } }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const collectionsSagas = [takeEvery(COLLECTIONS_SAVE_REQUEST, collectionSaveRequest)]

/* SAGAS :: SELECTORS
 --------------------------------------------------------------- */
const getUrls = (state, slug) => state.collections[slug]?.urls

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* collectionSaveRequest(action) {
  try {
    const { slug } = action
    const urls = yield select(getUrls, slug)
    const response = yield saveItems(urls)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: COLLECTIONS_SAVE_SUCCESS, slug, count: urls.length })
  } catch (error) {
    yield put({ type: COLLECTIONS_SAVE_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */
/**
 * fetchCollections
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return data {object} An object representing the collection
 */
export async function fetchCollections({ baseUrl }) {
  try {
    const response = await getCollections(baseUrl)
    if (!response) return { error: 'No data found' }
    return response
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('collection.state.collections', error)
  }
}

/**
 * fetchCollectionBySlug
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return data {object} An object representing the collection
 */
export async function fetchCollectionBySlug({ slug, baseUrl }) {
  try {
    const response = await getCollectionBySlug(slug, baseUrl)
    if (!response) return { error: 'No data found' }

    const { stories: passedStories, ...rest } = response

    // Derive items
    const stories = passedStories.map((item) => item.item_id)
    const urls = passedStories.map((item) => item.url)
    const itemsById = arrayToObject(passedStories, 'item_id')

    return { collection: { [slug]: { stories, urls, save_status: 'unsaved', ...rest } }, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('collection.state.collectionBySlug', error)
  }
}
