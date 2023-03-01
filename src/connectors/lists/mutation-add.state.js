import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { createShareableListItem } from 'common/api/mutations/createShareableListItem'

import { LIST_ADD_ITEM_REQUEST } from 'actions'
import { LIST_ADD_ITEM_CONFIRM } from 'actions'
import { LIST_ADD_ITEM_CANCEL } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_ADD_ITEM_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListAddItem = ({ id }) => ({ type: LIST_ADD_ITEM_REQUEST, id })
export const mutateListAddCancel = () => ({ type: LIST_ADD_ITEM_CANCEL })
export const mutateListAddConfirm = ({ externalId }) => ({ type: LIST_ADD_ITEM_CONFIRM, externalId })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const mutationListAddReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADD_ITEM_REQUEST: {
      return true
    }

    case LIST_ADD_ITEM_SUCCESS:
    case LIST_ADD_ITEM_FAILURE:
    case LIST_ADD_ITEM_CANCEL: {
      return false
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListAddSagas = [
  takeLatest(LIST_ADD_ITEM_REQUEST, listAddItem)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getItem = (state, id) => state.itemsDisplay[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* listAddItem({ id }) {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(LIST_ADD_ITEM_CONFIRM),
    cancel: take(LIST_ADD_ITEM_CANCEL)
  })

  if (cancel) return

  try {
    const { externalId } = confirm
    const { givenUrl, excerpt, thumbnail, title, publisher } = yield select(getItem, id)

    const data = {
      url: givenUrl,
      excerpt,
      imageUrl: thumbnail,
      title,
      publisher,
      listExternalId: externalId
    }

    const newListItem = yield call(createShareableListItem, data)
    return yield put({ type: LIST_ADD_ITEM_SUCCESS })

  } catch {
    return yield put({ type: LIST_ADD_ITEM_FAILURE })
  }
}
