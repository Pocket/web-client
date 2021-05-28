import { put, takeEvery } from 'redux-saga/effects'

import { arrayToObject } from 'common/utilities'
import { getCollections as apiFetchCollections } from 'common/api/collections'
import { deriveCollectionItems } from 'connectors/items-by-id/collection/items.derive'

import { saveItem as saveItemAPI } from 'common/api/saveItem'

import { COLLECTION_ITEMS_REQUEST } from 'actions'
import { COLLECTION_ITEMS_REQUEST_SUCCESS } from 'actions'
import { COLLECTION_ITEMS_REQUEST_FAILURE } from 'actions'
import { COLLECTION_ITEMS_HYDRATE } from 'actions'
import { COLLECTION_ITEMS_SAVE_REQUEST } from 'actions'
import { COLLECTION_ITEMS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_ITEMS_SAVE_FAILURE } from 'actions'
import { COLLECTION_ITEMS_NO_IMAGE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getCollectionsItems = () => ({ type: COLLECTION_ITEMS_REQUEST })
export const hydrateItems = (hydrated) => ({ type: COLLECTION_ITEMS_HYDRATE, hydrated }) //prettier-ignore
export const saveItem = (id, url) => ({type: COLLECTION_ITEMS_SAVE_REQUEST, id, url}) //prettier-ignore
export const setNoImage = (id) => ({ type: COLLECTION_ITEMS_NO_IMAGE, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const collectionItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_ITEMS_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case COLLECTION_ITEMS_SAVE_REQUEST: {
      const { id } = action
      return updateSaveStatus(state, id, 'saving')
    }

    case COLLECTION_ITEMS_SAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case COLLECTION_ITEMS_SAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case COLLECTION_ITEMS_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    case COLLECTION_ITEMS_REQUEST_SUCCESS: {
      const { collectionItemsById } = action
      return { ...state, ...collectionItemsById }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { collectionItemsById } = action.payload
      return { ...state, ...collectionItemsById }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, save_status) {
  const updatedItem = { ...state[id], save_status }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const collectionItemsSagas = [
  takeEvery(COLLECTION_ITEMS_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(COLLECTION_ITEMS_REQUEST, collectionItemsRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* itemsSaveRequest(action) {
  try {
    const { url, id } = action

    const response = yield saveItemAPI(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: COLLECTION_ITEMS_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: COLLECTION_ITEMS_SAVE_FAILURE, error })
  }
}

function* collectionItemsRequest(action) {
  try {
    const collectionItemsById = yield fetchCollections()
    yield put({ type: COLLECTION_ITEMS_REQUEST_SUCCESS, collectionItemsById })
  } catch (error) {
    yield put({ type: COLLECTION_ITEMS_REQUEST_FAILURE, error })
  }
}

export async function fetchCollections() {
  try {
    const response = await apiFetchCollections()

    if (!response) return { error: 'No data found' }

    const derivedCollections = await deriveCollectionItems(response)
    const collectionItemsById = arrayToObject(derivedCollections, 'slug')

    return collectionItemsById
  } catch (error) {
    console.log('items.state.fetchCollections', error)
  }
}
