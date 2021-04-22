import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import {
  SET_REC_IMPRESSION,
  PUBLISHER_RECS_REQUEST,
  PUBLISHER_RECS_SUCCESS,
  PUBLISHER_RECS_FAILURE,
  RECENT_RECS_REQUEST,
  RECENT_RECS_SUCCESS,
  RECENT_RECS_FAILURE,
  RECENT_REC_SAVE_REQUEST,
  RECENT_REC_SAVE_SUCCESS,
  RECENT_REC_SAVE_FAILURE,
  RECENT_REC_UNSAVE_REQUEST,
  RECENT_REC_UNSAVE_SUCCESS,
  RECENT_REC_UNSAVE_FAILURE
} from 'actions'

import {
  POCKET_RECS_REQUEST,
  POCKET_RECS_SUCCESS,
  POCKET_RECS_FAILURE,
  POCKET_RECS_SAVE_REQUEST,
  POCKET_RECS_SAVE_FAILURE,
  POCKET_RECS_SAVE_SUCCESS
} from 'actions'

import {
  READER_RECS_REQUEST,
  READER_RECS_SUCCESS,
  READER_RECS_FAILURE,
  READER_REC_SAVE_REQUEST,
  READER_REC_SAVE_SUCCESS,
  READER_REC_SAVE_FAILURE,
  READER_REC_UNSAVE_REQUEST,
  READER_REC_UNSAVE_SUCCESS,
  READER_REC_UNSAVE_FAILURE
} from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { getPublisherRecs } from 'common/api/recit'
import { getPocketRecs } from 'common/api/recit'
import { getRecommendations } from 'common/api/recit'
import { getHomeRecommendations } from 'common/api/recit'
import { saveItem as saveItemAPI } from 'common/api/saveItem'
import { removeItem as removeItemAPI } from 'common/api/removeItem'

import { arrayToObject } from 'common/utilities'
import { deriveReaderRecitItems, checkExternal } from './recit.derive'
import { deriveSyndicatedRecitItems } from './recit.derive'

/** ACTIONS
 --------------------------------------------------------------- */
export const publisherRecsRequest = (itemId) => ({ type: PUBLISHER_RECS_REQUEST, itemId }) //prettier-ignore
export const pocketRecsRequest = (itemId) => ({ type: POCKET_RECS_REQUEST, itemId }) //prettier-ignore
export const pocketRecSaveItem = (id, url) => ({ type: POCKET_RECS_SAVE_REQUEST, id, url }) //prettier-ignore

export const setRecImpression = (id) => ({ type: SET_REC_IMPRESSION, id }) //prettier-ignore

export const readerRecsRequest = (itemId) =>  ({ type: READER_RECS_REQUEST, itemId }) //prettier-ignore
export const readerRecSaveItem = (id, url, analytics) => ({ type: READER_REC_SAVE_REQUEST, id, url, analytics }) //prettier-ignore
export const readerRecUnSaveItem = (id) => ({ type: READER_REC_UNSAVE_REQUEST, id }) //prettier-ignore

export const recentRecsRequest = (itemId) => ({type: RECENT_RECS_REQUEST, itemId}) //prettier-ignore
export const saveItem = (id, url, analytics) => ({type: RECENT_REC_SAVE_REQUEST, id, url, analytics}) //prettier-ignore
export const unSaveItem = id => ({ type: RECENT_REC_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  impressions: {},
  publisherRecs: [],
  publisherRecId: null,
  publisherRecModel: null,
  pocketRecs: {},
  pocketRecId: null,
  pocketRecModel: null,
  readerRecs: {},
  recentRecId: null,
  recentRecs: {},
  recentRecsError: null
}

export const recitReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_REC_IMPRESSION: {
      const { id } = action
      const impressions = { ...state.impressions, [id]: true }
      return { ...state, impressions }
    }

    case PUBLISHER_RECS_SUCCESS: {
      const {
        response: {
          recommendations: publisherRecs,
          rec_id: publisherRecId,
          model: publisherRecModel
        }
      } = action
      return {
        ...state,
        publisherRecs,
        publisherRecId,
        publisherRecModel
      }
    }

    case POCKET_RECS_SUCCESS: {
      const {
        data: {
          pocketRecs,
          pocketRecId,
          pocketRecModel
        }
      } = action
      return {
        ...state,
        pocketRecs,
        pocketRecId,
        pocketRecModel
      }
    }

    case POCKET_RECS_SAVE_REQUEST: {
      const { id } = action
      return {
        ...state,
        pocketRecs: updateSaveStatus(state.pocketRecs, id, 'saving')
      }
    }

    case POCKET_RECS_SAVE_SUCCESS: {
      const { id } = action
      return {
        ...state,
        pocketRecs: updateSaveStatus(state.pocketRecs, id, 'saved')
      }
    }

    case POCKET_RECS_SAVE_FAILURE: {
      const { id } = action
      return {
        ...state,
        pocketRecs: updateSaveStatus(state.pocketRecs, id, 'unsaved')
      }
    }

    case READER_RECS_SUCCESS: {
      const { readerRecs } = action
      return {
        ...state,
        readerRecs
      }
    }

    // Refreshes recommendations on each load
    case READER_RECS_REQUEST: {
      return {
        ...state,
        readerRecs: {}
      }
    }

    case READER_REC_SAVE_REQUEST: {
      const { id } = action
      return {
        ...state,
        readerRecs: updateSaveStatus(state.readerRecs, id, 'saving')
      }
    }

    case READER_REC_SAVE_FAILURE: {
      const { id } = action
      return {
        ...state,
        readerRecs: updateSaveStatus(state.readerRecs, id, 'unsaved')
      }
    }

    case READER_REC_SAVE_SUCCESS: {
      const { id, openExternal } = action
      return {
        ...state,
        readerRecs: updateSaveStatus(state.readerRecs, id, 'saved', openExternal)
      }
    }

    case RECENT_RECS_SUCCESS: {
      const { recentRecs, recentRecId } = action
      return {
        ...state,
        recentRecId,
        recentRecs
      }
    }

    // Refreshes recommendations on each load
    case RECENT_RECS_REQUEST: {
      return {
        ...state,
        recentRecId: null,
        recentRecs: {},
        recentRecsError: null
      }
    }

    case RECENT_RECS_FAILURE: {
      const { error } = action
      return {
        ...state,
        recentRecsError: error?.message
      }
    }

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
export function updateSaveStatus(state, id, save_status, openExternal = true) {
  const updatedItem = { ...state[id], save_status, openExternal }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const recitSagas = [
  takeLatest(PUBLISHER_RECS_REQUEST, fetchPublisherRecs),
  takeLatest(POCKET_RECS_REQUEST, fetchPocketRecs),
  takeLatest(POCKET_RECS_SAVE_REQUEST, pocketRecSaveRequest),
  takeLatest(READER_RECS_REQUEST, fetchReaderRecs),
  takeLatest(READER_REC_SAVE_REQUEST, readerItemSaveRequest),
  takeLatest(READER_REC_UNSAVE_REQUEST, readerItemUnSaveRequest),
  takeLatest(RECENT_RECS_REQUEST, fetchRecentRecs),
  takeEvery(RECENT_REC_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(RECENT_REC_UNSAVE_REQUEST, itemsUnSaveRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getReaderRecById = (state, id) => state.recit.readerRecs[id]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* itemsSaveRequest(action) {
  try {
    const { url, id, analytics } = action

    const response = yield saveItemAPI(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: RECENT_REC_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: RECENT_REC_SAVE_FAILURE, error })
  }
}

function* itemsUnSaveRequest(action) {
  try {
    const { id } = action

    const response = yield removeItemAPI(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: RECENT_REC_UNSAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: RECENT_REC_UNSAVE_FAILURE, error })
  }
}

function* pocketRecSaveRequest({ id, url }) {
  try {
    const response = yield saveItemAPI(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: POCKET_RECS_SAVE_SUCCESS, id })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    const { id } = action
    yield put({ type: POCKET_RECS_SAVE_FAILURE, error, id })
  }
}

function* fetchPublisherRecs({ itemId }) {
  try {
    const response = yield getPublisherRecs(itemId)
    yield put({ type: PUBLISHER_RECS_SUCCESS, response })
  } catch (error) {
    yield put({ type: PUBLISHER_RECS_FAILURE, error })
  }
}

function* fetchPocketRecs({ itemId }) {
  try {
    const response = yield getPocketRecs(itemId)
    const { recommendations, rec_id, model } = response

    const derivedItems = yield deriveSyndicatedRecitItems(recommendations)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')
    const data = {
      pocketRecs: itemsById,
      pocketRecId: rec_id,
      pocketRecModel: model
    }

    yield put({ type: POCKET_RECS_SUCCESS, data })
  } catch (error) {
    yield put({ type: POCKET_RECS_FAILURE, error })
  }
}

function* fetchReaderRecs({ itemId }) {
  try {
    if (!itemId) return
    const response = yield getRecommendations(itemId)

    const derivedItems = yield deriveReaderRecitItems(response.recommendations)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    yield put({ type: READER_RECS_SUCCESS, readerRecs: itemsById })
  } catch (error) {
    yield put({ type: READER_RECS_FAILURE, error })
  }
}

function* fetchRecentRecs({ itemId: recentRecId }) {
  try {
    if (!recentRecId) return
    const response = yield getHomeRecommendations(recentRecId, 4)
    if (!response?.status) throw new Error('No items found')

    const derivedItems = yield deriveReaderRecitItems(response.recommendations)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    yield put({ type: RECENT_RECS_SUCCESS, recentRecs: itemsById, recentRecId })
  } catch (error) {
    yield put({ type: RECENT_RECS_FAILURE, error })
  }
}

function* readerItemSaveRequest(action) {
  try {
    const { url, id, analytics } = action

    const response = yield saveItemAPI(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    const recommendation = yield select(getReaderRecById, id)
    const openExternal = checkExternal(recommendation)

    yield put({ type: READER_REC_SAVE_SUCCESS, id, openExternal })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    const { id } = action
    yield put({ type: READER_REC_SAVE_FAILURE, error, id })
  }
}

function* readerItemUnSaveRequest(action) {
  try {
    const { id } = action

    const response = yield removeItemAPI(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: READER_REC_UNSAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: READER_REC_UNSAVE_FAILURE, error })
  }
}
