import { put, takeEvery, call } from 'redux-saga/effects'
import { arrayToObject } from 'common/utilities/object-array/object-array'

import { getShareableList } from 'common/api/queries/get-shareable-list'

import { ITEMS_SUCCESS } from 'actions'

import { ITEMS_SHAREABLE_LIST_REQUEST } from 'actions'
import { ITEMS_SHAREABLE_LIST_SUCCESS } from 'actions'
import { ITEMS_SHAREABLE_LIST_FAILURE } from 'actions'

import { LIST_DELETE_ITEM_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getIndividualListAction = (id) => ({ type: ITEMS_SHAREABLE_LIST_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageIndividualListIdsReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_DELETE_ITEM_SUCCESS:
    case ITEMS_SHAREABLE_LIST_SUCCESS: {
      const { externalId, externalIdList } = action
      return {
        ...state,
        [externalId]: externalIdList
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

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getIndividualList({ id }) {
  try {
    const individualList = yield call(getShareableList, id)
    const externalId = individualList?.externalId
    const listItems = arrayToObject(individualList?.listItems, 'externalId')
    const externalIdList = Object.keys(listItems)
    const itemsById = {
      ...listItems,
      [externalId]: individualList
    }

    yield put({ type: ITEMS_SUCCESS, itemsById })
    yield put({ type: ITEMS_SHAREABLE_LIST_SUCCESS, externalId, externalIdList })
  } catch (error) {
    yield put({ type: ITEMS_SHAREABLE_LIST_FAILURE, error })
  }
}
