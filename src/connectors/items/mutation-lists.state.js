import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { createShareableList } from 'common/api/mutations/createShareableList'
import { createShareableListItem } from 'common/api/mutations/createShareableListItem'

import { ITEMS_CREATE_LIST_REQUEST } from 'actions'
import { ITEMS_CREATE_LIST_CONFIRM } from 'actions'
import { ITEMS_CREATE_LIST_CANCEL } from 'actions'
import { ITEMS_CREATE_LIST_FAILURE } from 'actions'
import { ITEMS_CREATE_LIST_SUCCESS } from 'actions'

import { LIST_ADD_ITEM_REQUEST } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_ADD_ITEM_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListAction = () => ({ type: ITEMS_CREATE_LIST_REQUEST })
export const mutateListConfirm = ({ title, description }) => ({ type: ITEMS_CREATE_LIST_CONFIRM, title, description })
export const mutateListCancel = () => ({ type: ITEMS_CREATE_LIST_CANCEL })
export const mutateListAddItem = ({ id, listExternalId }) => ({ type: LIST_ADD_ITEM_REQUEST, id, listExternalId })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const mutationListsReducers = (state = initialState, action) => {
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
export const mutationListsSagas = [
  takeLatest(ITEMS_CREATE_LIST_REQUEST, itemsCreateList),
  takeLatest(LIST_ADD_ITEM_REQUEST, listAddItem)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getItem = (state, id) => state.itemsDisplay[id]

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
    return yield put({ type: ITEMS_CREATE_LIST_SUCCESS, newList })
  } catch {
    return yield put({ type: ITEMS_CREATE_LIST_FAILURE })
  }
}

function* listAddItem({ id, listExternalId }) {
  // Add modal functionality here

  try {
    const { givenUrl, excerpt, thumbnail, title, publisher } = yield select(getItem, id)

    const data = {
      url: givenUrl,
      excerpt,
      imageUrl: thumbnail,
      title,
      publisher,
      listExternalId
    }

    const newListItem = yield call(createShareableListItem, data)
    return yield put({ type: LIST_ADD_ITEM_SUCCESS })

  } catch {
    return yield put({ type: LIST_ADD_ITEM_FAILURE })
  }
}
