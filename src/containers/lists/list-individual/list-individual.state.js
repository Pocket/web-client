import { put, takeEvery, call } from 'redux-saga/effects'
import { arrayToObject } from 'common/utilities/object-array/object-array'

import { getShareableList } from 'common/api/queries/get-shareable-list'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { LIST_INDIVIDUAL_REQUEST } from 'actions'
import { LIST_INDIVIDUAL_SUCCESS } from 'actions'
import { LIST_INDIVIDUAL_FAILURE } from 'actions'

import { LIST_DELETE_ITEM_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getIndividualListAction = (id) => ({ type: LIST_INDIVIDUAL_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageIndividualListIdsReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_DELETE_ITEM_SUCCESS:
    case LIST_INDIVIDUAL_SUCCESS: {
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
  takeEvery(LIST_INDIVIDUAL_REQUEST, getIndividualList),
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

    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    yield put({ type: LIST_INDIVIDUAL_SUCCESS, externalId, externalIdList })
  } catch (error) {
    yield put({ type: LIST_INDIVIDUAL_FAILURE, error })
  }
}
