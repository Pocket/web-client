import { select, takeLatest, put } from 'redux-saga/effects'
import { getCollectionBySlug } from 'common/api/collections'
import { getCollections } from 'common/api/collections'
import { saveItem } from 'common/api/saveItem'
import { removeItemByUrl } from 'common/api/removeItem'
import { saveItems } from 'common/api/saveItem'

import { HYDRATE } from 'actions'
import { COLLECTIONS_HYDRATE } from 'actions'

import { COLLECTIONS_SAVE_REQUEST } from 'actions'
import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTIONS_SAVE_FAILURE } from 'actions'

import { COLLECTION_PAGE_SAVE_REQUEST } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_FAILURE } from 'actions'

import { COLLECTION_PAGE_UNSAVE_REQUEST } from 'actions'
import { COLLECTION_PAGE_UNSAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_UNSAVE_FAILURE } from 'actions'

import { arrayToObject } from 'common/utilities'
import { BASE_URL } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateCollections = (payload) => ({ type: COLLECTIONS_HYDRATE, payload })
export const saveCollection = (slug) => ({ type: COLLECTIONS_SAVE_REQUEST, slug })
export const saveCollectionPage = (slug) => ({ type: COLLECTION_PAGE_SAVE_REQUEST, slug })
export const unSaveCollectionPage = (slug) => ({ type: COLLECTION_PAGE_UNSAVE_REQUEST, slug })

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

    case COLLECTION_PAGE_SAVE_REQUEST: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], pageSaveStatus: 'saving' } }
    }

    case COLLECTION_PAGE_SAVE_SUCCESS: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], pageSaveStatus: 'saved' } }
    }

    case COLLECTION_PAGE_UNSAVE_SUCCESS:
    case COLLECTION_PAGE_SAVE_FAILURE: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], pageSaveStatus: 'unsaved' } }
    }

    case COLLECTIONS_SAVE_REQUEST: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], saveStatus: 'saving' } }
    }

    case COLLECTIONS_SAVE_SUCCESS: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], saveStatus: 'saved' } }
    }

    case COLLECTIONS_SAVE_FAILURE: {
      const { slug } = action
      return { ...state, [slug]: { ...state[slug], saveStatus: 'unsaved' } }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const collectionsSagas = [
  takeLatest(COLLECTIONS_SAVE_REQUEST, collectionSaveRequest),
  takeLatest(COLLECTION_PAGE_SAVE_REQUEST, collectionPageSave),
  takeLatest(COLLECTION_PAGE_UNSAVE_REQUEST, collectionPageUnSave)
]

/* SAGAS :: SELECTORS
 --------------------------------------------------------------- */
const getUrls = (state, slug) => state.collections[slug]?.urls

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* collectionPageSave(action) {
  try {
    const { slug } = action
    const url = `${BASE_URL}/collections/${slug}`

    console.log(url)
    const response = yield saveItem(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: COLLECTION_PAGE_SAVE_SUCCESS, slug })
  } catch (error) {
    yield put({ type: COLLECTION_PAGE_SAVE_FAILURE, error })
  }
}

function* collectionPageUnSave(action) {
  try {
    const { slug } = action
    const url = `${BASE_URL}/collections/${slug}`

    const response = yield removeItemByUrl(url)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: COLLECTION_PAGE_UNSAVE_SUCCESS, slug })
  } catch (error) {
    yield put({ type: COLLECTION_PAGE_UNSAVE_FAILURE, error })
  }
}

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
export async function fetchCollections() {
  try {
    const response = await getCollections()
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
export async function fetchCollectionBySlug({ slug }) {
  try {
    const response = await getCollectionBySlug(slug)
    if (!response) return { error: 'No data found' }

    const { stories: passedStories, ...rest } = response

    // Derive items
    const stories = passedStories.map((item) => item.item_id)
    const urls = passedStories.map((item) => item.url)
    const itemsById = arrayToObject(passedStories, 'item_id')

    return {
      collection: {
        [slug]: { stories, urls, pageSaveStatus: 'unsaved', saveStatus: 'unsaved', ...rest }
      },
      itemsById
    }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('collection.state.collectionBySlug', error)
  }
}
