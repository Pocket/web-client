import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (locale) => ({ type: HOME_CONTENT_REQUEST, locale })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  slates: [],
  slatesById: {}
}

export const pageHomeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_SUCCESS: {
      const { slatesById, slateArray } = action
      return { ...state, slatesById, slates: slateArray }
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
