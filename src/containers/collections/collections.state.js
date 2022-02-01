import { select, takeLatest, put } from 'redux-saga/effects'
import { deriveCollection } from 'common/api/derivers/item'
import { getCollectionBySlug } from 'common/api'
import { getCollections } from 'common/api'
import { saveItem } from 'common/api/_legacy/saveItem'
import { removeItemByUrl } from 'common/api/_legacy/removeItem'
import { saveItems } from 'common/api/_legacy/saveItem'

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
    case HYDRATE: {
      const { collectionsBySlug } = action.payload
      return { ...state, ...collectionsBySlug }
    }

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

    const { stories: passedStories, ...rest } = response
    const url = `/collections/${slug}`

    // Derive items
    const validStories = passedStories.filter(validateStory)
    const stories = validStories.map((story) => story?.item?.itemId)
    const urls = validStories.map((story) => story.url)

    return {
      collection: {
        [slug]: {
          itemId: slug,
          stories,
          url,
          urls,
          pageSaveStatus: 'unsaved',
          saveStatus: 'unsaved',
          ...rest
        }
      },
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
