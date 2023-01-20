import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (locale) => ({ type: HOME_CONTENT_REQUEST, locale })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  slates: [],
  itemsById: {}
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_SUCCESS: {
      const { itemsById, slatesById, slateArray } = action
      return { ...state, itemsById, slatesById, slates: slateArray }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeSagas = [
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

    yield put({ type: HOME_CONTENT_SUCCESS, itemsById, slatesById, slateArray })
  } catch (error) {
    console.warn(error)
  }
}
