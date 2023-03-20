import { put, takeEvery, call, select, race, take } from 'redux-saga/effects'

import { LIST_DELETE_REQUEST } from 'actions'
import { LIST_DELETE_CONFIRM } from 'actions'
import { LIST_DELETE_CANCEL } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'
import { LIST_DELETE_FAILURE } from 'actions'

import { LIST_DELETE_ITEM_REQUEST } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_FAILURE } from 'actions'

import { deleteShareableList } from 'common/api/mutations/deleteShareableList'
import { deleteShareableListItem } from 'common/api/mutations/deleteShareableListItem'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListDelete = (id) => ({ type: LIST_DELETE_REQUEST, id })
export const mutateListDeleteCancel = () => ({ type: LIST_DELETE_CANCEL })
export const mutateListDeleteConfirm = () => ({ type: LIST_DELETE_CONFIRM })
export const mutateListItemDelete = ({ id, listId }) => ({ type: LIST_DELETE_ITEM_REQUEST, id, listId })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  open: false
}

export const mutationListDeleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_DELETE_REQUEST: {
      return { ...state, open: true }
    }

    case LIST_DELETE_SUCCESS:
    case LIST_DELETE_FAILURE:
    case LIST_DELETE_CANCEL: {
      return { ...state, open: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListDeleteSagas = [
  takeEvery(LIST_DELETE_REQUEST, deleteList),
  takeEvery(LIST_DELETE_ITEM_REQUEST, deleteListItem)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getIndividualListIds = (state, id) => state.pageIndividualListIds[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* deleteList({ id }) {
  const { cancel } = yield race({
    confirm: take(LIST_DELETE_CONFIRM),
    cancel: take(LIST_DELETE_CANCEL)
  })

  if (cancel) return

  try {
    const { externalId: deletedId } = yield call(deleteShareableList, { id })
    yield put({ type: LIST_DELETE_SUCCESS, deletedId })
  } catch (error) {
    yield put({ type: LIST_DELETE_FAILURE, error })
  }
}

function* deleteListItem({ id, listId }) {
  try {
    const { externalId: deletedId } = yield call(deleteShareableListItem, { id })
    const previousIds = yield select(getIndividualListIds, listId)
    const externalIdList = previousIds.filter((e) => e !== deletedId)

    yield put({
      type: LIST_DELETE_ITEM_SUCCESS,
      externalId: listId,
      externalIdList
    })
  } catch (error) {
    yield put({ type: LIST_DELETE_ITEM_FAILURE, error })
  }
}
