import { put, takeEvery } from 'redux-saga/effects'
import { saveItem } from 'common/api/_legacy/saveItem'
import { arrayToObject } from 'common/utilities'
import { deriveListItem } from 'common/api/derivers/item'

import { SIMILAR_REC_REQUEST } from 'actions'
import { SIMILAR_REC_SAVE_REQUEST } from 'actions'
import { SIMILAR_REC_SAVE_SUCCESS } from 'actions'
import { SIMILAR_REC_SAVE_FAILURE } from 'actions'
import { SIMILAR_RECS_CLEAR } from 'actions'

import { RECENT_RECS_SUCCESS } from 'actions'
import { RECENT_RECS_FAILURE } from 'actions'

import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'
import { COLLECTION_STORIES_SAVE_SUCCESS } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getSimilarRecs = (id) => ({ type: SIMILAR_REC_REQUEST, id })
export const saveSimilarRec = (id, url, position) => ({type: SIMILAR_REC_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const clearSimilarRecs = () => ({ type: SIMILAR_RECS_CLEAR })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  similarRecId: false,
  similarRecsResolved: false
}

export const similarReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIMILAR_REC_REQUEST:
    case HOME_SAVE_SUCCESS:
    case DISCOVER_ITEMS_SAVE_SUCCESS:
    case ARTICLE_SAVE_SUCCESS:
    case COLLECTION_STORIES_SAVE_SUCCESS:
    case SIMILAR_REC_SAVE_SUCCESS: {
      const { id } = action
      return { ...state, similarRecId: id, similarRecsResolved: false }
    }

    case RECENT_RECS_SUCCESS:
    case RECENT_RECS_FAILURE: {
      return { ...state, similarRecsResolved: true }
    }

    case SIMILAR_RECS_CLEAR:
    case SNOWPLOW_TRACK_PAGE_VIEW: {
      return { ...state, similarRecId: false, similarRecsResolved: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const similarSagas = [
  takeEvery(SIMILAR_REC_SAVE_REQUEST, similarRecSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* similarRecSaveRequest({ url, id, position }) {
  try {
    const analytics = {
      view: 'web',
      section: 'similar',
      page: global?.location?.pathname,
      cxt_item_position: position
    }

    const response = yield saveItem(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    const derivedItems = Object.values(response.action_results).map((item) =>
      deriveListItem(item, true)
    )

    const items = derivedItems.map((item) => item.resolvedId)
    const itemsById = arrayToObject(derivedItems, 'resolvedId')

    yield put({ type: SIMILAR_REC_SAVE_SUCCESS, id, items, itemsById })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    yield put({ type: SIMILAR_REC_SAVE_FAILURE, error })
  }
}
