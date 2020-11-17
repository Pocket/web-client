import { takeLatest, put } from 'redux-saga/effects'
import {
  PUBLISHER_RECS_REQUESTED,
  PUBLISHER_RECS_SUCCESS,
  PUBLISHER_RECS_FAILURE,
  POCKET_RECS_REQUESTED,
  POCKET_RECS_SUCCESS,
  POCKET_RECS_FAILURE,
  GENERIC_RECS_REQUESTED,
  GENERIC_RECS_SUCCESS,
  GENERIC_RECS_FAILURE
} from 'actions'
import { getPublisherRecs, getPocketRecs, getRecommendations } from 'common/api/recit'
import { saveItem } from 'common/api/saveItem'
import { removeItem } from 'common/api/removeItem'

/** ACTIONS
 --------------------------------------------------------------- */
export const publisherRecsRequested = (itemId) => ({
  type: PUBLISHER_RECS_REQUESTED,
  itemId
})
export const pocketRecsRequested = (itemId) => ({
  type: POCKET_RECS_REQUESTED,
  itemId
})
export const genericRecsRequested = (itemId) =>  ({
  type: GENERIC_RECS_REQUESTED,
  itemId
})

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  publisherRecs: [],
  publisherRecId: null,
  publisherRecModel: null,
  pocketRecs: [],
  pocketRecId: null,
  pocketRecModel: null,
  genericRecs: []
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

    case GENERIC_RECS_SUCCESS: {
      const {
        response
      } = action
      return {
        ...state,
        // genericRecs: []
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const recitSagas = [
  takeLatest(PUBLISHER_RECS_REQUESTED, fetchPublisherRecs),
  takeLatest(POCKET_RECS_REQUESTED, fetchPocketRecs),
  takeLatest(GENERIC_RECS_REQUESTED, fetchGenericRecs)
]

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

function* fetchGenericRecs({ itemId }) {
  try {
    const response = yield getRecommendations(itemId)
    // console.log('Recit Response', { ...response })
    yield put({ type: GENERIC_RECS_SUCCESS, response })
  } catch (error) {
    yield put({ type: GENERIC_RECS_FAILURE, error })
  }
}
