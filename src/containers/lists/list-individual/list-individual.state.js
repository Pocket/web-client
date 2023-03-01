import { put, select, takeEvery, call } from 'redux-saga/effects'

import { getShareableList } from 'common/api/queries/get-shareable-list'

import { ITEMS_SHAREABLE_LIST_REQUEST } from 'actions'
import { ITEMS_SHAREABLE_LIST_SUCCESS } from 'actions'
import { ITEMS_SHAREABLE_LIST_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getIndividualListAction = (id) => ({ type: ITEMS_SHAREABLE_LIST_REQUEST, id })

/** PAGINATION REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  loading: true,
  error: false,
  individualLists: {}
}

export const pageIndividualListsReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SHAREABLE_LIST_SUCCESS: {
      const { id, individualList } = action
      const individualLists = { ...state.individualLists, [id]: individualList }
      return {
        ...state,
        individualLists
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageIndividualListsSagas = [
  takeEvery(ITEMS_SHAREABLE_LIST_REQUEST, getIndividualList),
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */


/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getIndividualList({ id }) {
  try {
    const individualList = yield call(getShareableList, id)
    yield put({ type: ITEMS_SHAREABLE_LIST_SUCCESS, id, individualList })
  } catch (error) {
    yield put({ type: ITEMS_SHAREABLE_LIST_FAILURE, error })
  }
}
