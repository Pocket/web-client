import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { saveItem } from 'common/api/_legacy/saveItem'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { deriveListItem } from 'common/api/derivers/item'
import { removeItemByUrl } from 'common/api/_legacy/removeItem'

import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (id) => ({ type: HOME_CONTENT_REQUEST, id })


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
function* homeContentRequest() {
  try {
    const { itemsById, slatesById, slateArray } = yield call(getUnifiedHome)

    yield put({ type: HOME_CONTENT_SUCCESS, itemsById, slatesById, slateArray })
  } catch (error) {
    console.warn(error)
  }
}
