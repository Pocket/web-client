import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { createShareableList } from 'common/api/mutations/createShareableList'

import { ITEMS_CREATE_LIST_REQUEST } from 'actions'
import { ITEMS_CREATE_LIST_CONFIRM } from 'actions'
import { ITEMS_CREATE_LIST_CANCEL } from 'actions'
import { ITEMS_CREATE_LIST_FAILURE } from 'actions'
import { ITEMS_CREATE_LIST_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListAction = () => ({ type: ITEMS_CREATE_LIST_REQUEST })
export const mutateListConfirm = ({ title, description }) => ({
  type: ITEMS_CREATE_LIST_CONFIRM,
  title,
  description
})
export const mutateListCancel = () => ({ type: ITEMS_CREATE_LIST_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const mutationListCreateReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_CREATE_LIST_REQUEST: {
      return true
    }

    case ITEMS_CREATE_LIST_SUCCESS:
    case ITEMS_CREATE_LIST_FAILURE:
    case ITEMS_CREATE_LIST_CANCEL: {
      return false
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListCreateSagas = [takeLatest(ITEMS_CREATE_LIST_REQUEST, itemsCreateList)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsCreateList() {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(ITEMS_CREATE_LIST_CONFIRM),
    cancel: take(ITEMS_CREATE_LIST_CANCEL)
  })

  if (cancel) return

  try {
    const { title, description } = confirm
    const newList = yield call(createShareableList, { title, description })
    const externalId = newList.externalId
    return yield put({ type: ITEMS_CREATE_LIST_SUCCESS, newList, externalId })
  } catch {
    return yield put({ type: ITEMS_CREATE_LIST_FAILURE })
  }
}
