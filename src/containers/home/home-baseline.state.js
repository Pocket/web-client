import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { saveItem } from 'common/api/_legacy/saveItem'
import { arrayToObject } from 'common/utilities'
import { deriveListItem } from 'common/api/derivers/item'

import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'

import { HOME_CONTENT_SAVE_REQUEST } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (id) => ({ type: HOME_CONTENT_REQUEST, id })
export const saveHomeItem = (id, url) => ({ type: HOME_CONTENT_SAVE_REQUEST, id, url })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  recentSaves: [],
  slates: [],
  itemsById: {}
}

export const homeUnifiedReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_SUCCESS: {
      const { itemsById, slatesById, slateArray } = action
      return { ...state, itemsById, slatesById, slates: slateArray }
    }

    case HOME_SAVE_SUCCESS: {
      const { corpusId } = action
      const item = state.itemsById[corpusId] || {}
      return {
        ...state,
        itemsById: { ...state.itemsById, [corpusId]: { ...item, saveStatus: 'saved' } }
      }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeUnifiedSagas = [
  takeEvery(HOME_CONTENT_REQUEST, homeContentRequest),
  takeEvery(HOME_CONTENT_SAVE_REQUEST, homeContentSaveRequest)
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

function* homeContentSaveRequest({ url, id }) {
  try {
    const response = yield saveItem(url, { id })
    if (response?.status !== 1) throw new Error('Unable to save')

    // Manually adding `status: "0"` will derive the readUrl
    const derivedItems = yield Object.values(response.action_results).map((item) =>
      deriveListItem({ ...item, status: '0' }, true)
    )

    const items = derivedItems.map((item) => item.resolvedId)
    const itemsById = arrayToObject(derivedItems, 'resolvedId')
    const saveId = items[0]

    yield put({ type: HOME_SAVE_SUCCESS, corpusId: id, id: saveId, items, itemsById })
  } catch (error) {
    console.warn(error)
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */
