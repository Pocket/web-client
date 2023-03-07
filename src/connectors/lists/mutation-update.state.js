import { put, takeLatest, take, race } from 'redux-saga/effects'
// import { updateShareableList } from 'common/api/mutations/updateShareableList'

import { LIST_UPDATE_REQUEST } from 'actions'
import { LIST_UPDATE_CONFIRM } from 'actions'
import { LIST_UPDATE_CANCEL } from 'actions'
import { LIST_UPDATE_SUCCESS } from 'actions'
import { LIST_UPDATE_FAILURE } from 'actions'

import { LIST_ITEMS_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListUpdateAction = (id) => ({ type: LIST_UPDATE_REQUEST, id })
export const mutateListUpdateCancel = () => ({ type: LIST_UPDATE_CANCEL })
export const mutateListUpdateConfirm = ({ title, description }) => ({ type: LIST_UPDATE_CONFIRM, title, description }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  open: false,
  lastUsedList: ''
}

export const mutationListUpdateReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_UPDATE_REQUEST: {
      return { ...state, open: true }
    }

    case LIST_UPDATE_SUCCESS: {
      return { ...state, open: false }
    }

    case LIST_UPDATE_FAILURE:
    case LIST_UPDATE_CANCEL: {
      return { ...state, open: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListUpdateSagas = [takeLatest(LIST_UPDATE_REQUEST, listUpdate)]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
// const getItem = (state, id) => state.itemsDisplay[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* listUpdate({ id }) {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(LIST_UPDATE_CONFIRM),
    cancel: take(LIST_UPDATE_CANCEL)
  })

  if (cancel) return

  try {
    const { title, description } = confirm

    const data = {
      description,
      externalId: id,
      status: 'PRIVATE',
      title
    }

    const response = yield call(updateShareableList, data)
    yield put({ type: LIST_UPDATE_SUCCESS })

    const itemsById = { [id]: { ...response } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_UPDATE_FAILURE, error })
  }
}
