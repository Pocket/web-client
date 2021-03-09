import { takeLatest, takeEvery, put } from 'redux-saga/effects'
import {
  PUBLISHER_RECS_REQUEST,
  PUBLISHER_RECS_SUCCESS,
  PUBLISHER_RECS_FAILURE,
  POCKET_RECS_REQUEST,
  POCKET_RECS_SUCCESS,
  POCKET_RECS_FAILURE,
  READER_RECS_REQUEST,
  READER_RECS_SUCCESS,
  READER_RECS_FAILURE,
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

import { getPublisherRecs } from 'common/api/recit'
import { getPocketRecs } from 'common/api/recit'
import { getRecommendations } from 'common/api/recit'

import { saveItem as saveItemAPI } from 'common/api/saveItem'
import { removeItem as removeItemAPI } from 'common/api/removeItem'

import { arrayToObject } from 'common/utilities'
import { deriveReaderRecitItems } from './recit.derive'

/** ACTIONS
 --------------------------------------------------------------- */
export const publisherRecsRequest = (itemId) => ({ type: PUBLISHER_RECS_REQUEST, itemId }) //prettier-ignore
export const pocketRecsRequest = (itemId) => ({ type: POCKET_RECS_REQUEST, itemId }) //prettier-ignore
export const readerRecsRequest = (itemId) =>  ({ type: READER_RECS_REQUEST, itemId }) //prettier-ignore
export const recentRecsRequest = (itemId) => ({type: RECENT_RECS_REQUEST, itemId}) //prettier-ignore
export const saveItem = (id, url, analytics) => ({type: RECENT_REC_SAVE_REQUEST, id, url, analytics}) //prettier-ignore
export const unSaveItem = id => ({ type: RECENT_REC_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  publisherRecs: [],
  publisherRecId: null,
  publisherRecModel: null,
  pocketRecs: [],
  pocketRecId: null,
  pocketRecModel: null,
  readerRecs: {},
  recentRecId: null,
  recentRecs: {}
}

export const recitReducers = (state = initialState, action) => {
  switch (action.type) {
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
        response: {
          recommendations: pocketRecs,
          rec_id: pocketRecId,
          model: pocketRecModel
        }
      } = action
      return {
        ...state,
        pocketRecs,
        pocketRecId,
        pocketRecModel
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
        recentRecs: {}
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const recitSagas = [
  takeLatest(PUBLISHER_RECS_REQUEST, fetchPublisherRecs),
  takeLatest(POCKET_RECS_REQUEST, fetchPocketRecs),
  takeLatest(READER_RECS_REQUEST, fetchReaderRecs),
  takeLatest(RECENT_RECS_REQUEST, fetchRecentRecs),
  takeEvery(RECENT_REC_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(RECENT_REC_UNSAVE_REQUEST, itemsUnSaveRequest)
]

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
    yield put({ type: POCKET_RECS_SUCCESS, response })
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
    const response = yield getRecommendations(recentRecId, 4)

    const derivedItems = yield deriveReaderRecitItems(response.recommendations)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    yield put({ type: RECENT_RECS_SUCCESS, recentRecs: itemsById, recentRecId })
  } catch (error) {
    yield put({ type: RECENT_RECS_FAILURE, error })
  }
}
