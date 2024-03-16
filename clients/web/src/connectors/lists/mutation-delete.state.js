import { put, takeEvery, call, select, race, take } from 'redux-saga/effects'

import { LIST_DELETE_REQUEST } from 'actions'
import { LIST_DELETE_CONFIRM } from 'actions'
import { LIST_DELETE_CANCEL } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'
import { LIST_DELETE_FAILURE } from 'actions'

import { LIST_DELETE_ITEM_REQUEST } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_FAILURE } from 'actions'

import { LIST_ITEM_NOTE_DELETE_REQUEST } from 'actions'
import { LIST_ITEM_NOTE_DELETE_CONFIRM } from 'actions'
import { LIST_ITEM_NOTE_DELETE_CANCEL } from 'actions'
import { LIST_ITEM_NOTE_DELETE_SUCCESS } from 'actions'
import { LIST_ITEM_NOTE_DELETE_FAILURE } from 'actions'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { deleteShareableList } from 'common/api/mutations/deleteShareableList'
import { deleteShareableListItem } from 'common/api/mutations/deleteShareableListItem'
import { updateShareableListItem } from 'common/api/mutations/updateShareableListItem'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListDelete = (id) => ({ type: LIST_DELETE_REQUEST, id })
export const mutateListDeleteCancel = () => ({ type: LIST_DELETE_CANCEL })
export const mutateListDeleteConfirm = () => ({ type: LIST_DELETE_CONFIRM })
export const mutateListItemDelete = ({ id, listId }) => ({ type: LIST_DELETE_ITEM_REQUEST, id, listId }) //prettier-ignore

export const mutateListItemNoteDelete = (id) => ({ type: LIST_ITEM_NOTE_DELETE_REQUEST, id })
export const mutateListItemNoteDeleteCancel = () => ({ type: LIST_ITEM_NOTE_DELETE_CANCEL })
export const mutateListItemNoteDeleteConfirm = () => ({ type: LIST_ITEM_NOTE_DELETE_CONFIRM })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  open: false,
  noteOpen: false
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

    case LIST_ITEM_NOTE_DELETE_REQUEST: {
      return { ...state, noteOpen: true }
    }

    case LIST_ITEM_NOTE_DELETE_SUCCESS:
    case LIST_ITEM_NOTE_DELETE_FAILURE:
    case LIST_ITEM_NOTE_DELETE_CANCEL: {
      return { ...state, noteOpen: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListDeleteSagas = [
  takeEvery(LIST_DELETE_REQUEST, deleteList),
  takeEvery(LIST_DELETE_ITEM_REQUEST, deleteListItem),
  takeEvery(LIST_ITEM_NOTE_DELETE_REQUEST, deleteListItemNote)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getIndividualListIds = (state, id) => state.listsDisplay[id].listItemIds

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
    const listItemIds = previousIds.filter((e) => e !== deletedId)

    const itemsById = { [listId]: { listItemIds } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    yield put({ type: LIST_DELETE_ITEM_SUCCESS })
  } catch (error) {
    yield put({ type: LIST_DELETE_ITEM_FAILURE, error })
  }
}

function* deleteListItemNote({ id }) {
  const { cancel } = yield race({
    confirm: take(LIST_ITEM_NOTE_DELETE_CONFIRM),
    cancel: take(LIST_ITEM_NOTE_DELETE_CANCEL)
  })

  if (cancel) return

  try {
    const data = {
      externalId: id,
      note: ''
    }
    const response = yield call(updateShareableListItem, data)

    const itemsById = { [id]: { ...response } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    yield put({ type: LIST_ITEM_NOTE_DELETE_SUCCESS })
  } catch (error) {
    yield put({ type: LIST_ITEM_NOTE_DELETE_FAILURE, error })
  }
}
