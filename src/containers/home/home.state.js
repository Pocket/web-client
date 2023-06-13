import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { HOME_REC_PROMOTE } from 'actions'
import { HOME_REC_DEMOTE } from 'actions'
import { HOME_REC_REQUEST_PROMOTE } from 'actions'
import { HOME_REC_REQUEST_DEMOTE } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (locale) => ({ type: HOME_CONTENT_REQUEST, locale })
export const promoteHomeRec = (slateId, recId) => ({ type: HOME_REC_REQUEST_PROMOTE, slateId, recId }) //prettier-ignore
export const demoteHomeRec = (slateId, recId) => ({ type: HOME_REC_REQUEST_DEMOTE, slateId, recId }) //prettier-ignore
export const completeDemotion = (slateId, recId) => ({ type: HOME_REC_DEMOTE, slateId, recId }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  slates: [],
  promotedIds: [],
  demotedIds: [],
  slatesById: {}
}

export const pageHomeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_REQUEST: {
      return initialState
    }

    case HOME_CONTENT_SUCCESS: {
      const { slatesById, slateArray } = action
      return { ...state, slatesById, slates: slateArray }
    }

    case HOME_REC_REQUEST_PROMOTE: {
      const { recId } = action
      const set = new Set([...state.promotedIds, recId])
      return { ...state, promotedIds: Array.from(set) }
    }

    case HOME_REC_REQUEST_DEMOTE: {
      const { recId } = action
      const set = new Set([...state.demotedIds, recId])
      return { ...state, demotedIds: Array.from(set) }
    }

    case HOME_REC_DEMOTE: {
      const { slateId, recId } = action
      const { slatesById } = state
      const slateToOperateOn = slatesById[slateId]
      const recommendations = slateToOperateOn.recommendations.filter((id) => id !== recId)
      return {
        ...state,
        slatesById: { ...slatesById, [slateId]: { ...slateToOperateOn, recommendations } }
      }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageHomeSaga = [
  takeEvery(HOME_CONTENT_REQUEST, homeContentRequest),
  takeEvery(SET_TOPIC_SUCCESS, homeContentRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homeContentRequest({ locale }) {
  try {
    const { itemsById, slatesById, slateArray } = yield call(getUnifiedHome, locale)

    yield put({ type: ITEMS_SUCCESS, itemsById })
    yield put({ type: HOME_CONTENT_SUCCESS, slatesById, slateArray })
  } catch (error) {
    console.warn(error)
  }
}
