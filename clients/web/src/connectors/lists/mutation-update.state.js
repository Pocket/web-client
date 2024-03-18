import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { updateShareableList } from 'common/api/mutations/updateShareableList'
import { updateShareableListItem } from 'common/api/mutations/updateShareableListItem'
import { updateShareableListItems } from 'common/api/mutations/updateShareableListItems'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { chunk } from 'common/utilities/object-array/object-array'
import { BATCH_SIZE } from 'common/constants'

import { LIST_UPDATE_REQUEST } from 'actions'
import { LIST_UPDATE_CONFIRM } from 'actions'
import { LIST_UPDATE_CANCEL } from 'actions'
import { LIST_UPDATE_SUCCESS } from 'actions'
import { LIST_UPDATE_FAILURE } from 'actions'

import { LIST_UPDATE_STATUS_REQUEST } from 'actions'
import { LIST_UPDATE_STATUS_SUCCESS } from 'actions'
import { LIST_UPDATE_STATUS_FAILURE } from 'actions'

import { LIST_ITEM_ADD_NOTE_REQUEST } from 'actions'
import { LIST_ITEM_ADD_NOTE_CONFIRM } from 'actions'
import { LIST_ITEM_ADD_NOTE_CANCEL } from 'actions'
import { LIST_ITEM_ADD_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_ADD_NOTE_FAILURE } from 'actions'

import { LIST_ITEM_EDIT_NOTE_REQUEST } from 'actions'
import { LIST_ITEM_EDIT_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_EDIT_NOTE_FAILURE } from 'actions'

import { LIST_ITEMS_REORDER_REQUEST } from 'actions'
import { LIST_ITEMS_REORDER_SUCCESS } from 'actions'
import { LIST_ITEMS_REORDER_FAILURE } from 'actions'

import { LIST_ITEMS_SUCCESS } from 'actions'
import { LIST_ITEMS_UPDATE } from 'actions'

import { MUTATION_BULK_BATCH_BEGIN } from 'actions'
import { MUTATION_BULK_BATCH_FAILURE } from 'actions'
import { MUTATION_BULK_BATCH_SUCCESS } from 'actions'
import { MUTATION_BULK_BATCH_COMPLETE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListUpdateAction = (id) => ({ type: LIST_UPDATE_REQUEST, id })
export const mutateListUpdateCancel = () => ({ type: LIST_UPDATE_CANCEL })
export const mutateListUpdateConfirm = ({ title, description }) => ({ type: LIST_UPDATE_CONFIRM, title, description }) //prettier-ignore
export const mutateListStatusAction = ({ id, status, listItemNoteVisibility }) => ({ type: LIST_UPDATE_STATUS_REQUEST, id, status, listItemNoteVisibility }) //prettier-ignore

export const mutateListItemNote = ({ id, position }) => ({ type: LIST_ITEM_ADD_NOTE_REQUEST, id, position }) //prettier-ignore
export const mutateListItemNoteCancel = () => ({ type: LIST_ITEM_ADD_NOTE_CANCEL })
export const mutateListItemNoteConfirm = (note) => ({ type: LIST_ITEM_ADD_NOTE_CONFIRM, note })
export const mutateListItemNoteEdit = ({ id, position }) => ({ type: LIST_ITEM_EDIT_NOTE_REQUEST, id, position, edit: true }) //prettier-ignore

export const mutateReorderListItems = ({ id, items }) => ({ type: LIST_ITEMS_REORDER_REQUEST, id, items }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  listSettingsOpen: false,
  listItemNoteOpen: false,
  listItemNoteEditOpen: false,
  listItemId: null,
  listItemPosition: null,
  lastUsedList: ''
}

export const mutationListUpdateReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_UPDATE_REQUEST: {
      return { ...state, listSettingsOpen: true }
    }

    case LIST_UPDATE_SUCCESS:
    case LIST_UPDATE_FAILURE:
    case LIST_UPDATE_CANCEL: {
      return { ...state, listSettingsOpen: false }
    }

    case LIST_ITEM_ADD_NOTE_REQUEST: {
      const { id, position } = action
      return { ...state, listItemNoteOpen: true, listItemId: id, listItemPosition: position }
    }

    case LIST_ITEM_EDIT_NOTE_REQUEST: {
      const { id, position } = action
      return { ...state, listItemNoteEditOpen: true, listItemId: id, listItemPosition: position }
    }

    case LIST_ITEM_ADD_NOTE_SUCCESS:
    case LIST_ITEM_ADD_NOTE_FAILURE:
    case LIST_ITEM_EDIT_NOTE_SUCCESS:
    case LIST_ITEM_EDIT_NOTE_FAILURE:
    case LIST_ITEM_ADD_NOTE_CANCEL: {
      return {
        ...state,
        listItemNoteOpen: false,
        listItemNoteEditOpen: false,
        listItemId: null,
        listItemPosition: null
      }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListUpdateSagas = [
  takeLatest(LIST_UPDATE_REQUEST, listUpdate),
  takeLatest(LIST_UPDATE_STATUS_REQUEST, listUpdateStatus),
  takeLatest(LIST_ITEM_ADD_NOTE_REQUEST, listItemAddNote),
  takeLatest(LIST_ITEM_EDIT_NOTE_REQUEST, listItemAddNote),
  takeLatest(LIST_ITEMS_REORDER_REQUEST, listItemsReorder)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getListItem = (state, id) => state.listsDisplay[id]
const getListItemIds = (state, id) => state.listsDisplay[id]?.listItemIds

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

    const data = getObjectWithValidKeysOnly({
      externalId: id,
      description: description.trim(),
      title: title.trim()
    })

    const response = yield call(updateShareableList, data)
    yield put({ type: LIST_UPDATE_SUCCESS, title, externalId: id })

    const itemsById = { [id]: { ...response, ...data } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_UPDATE_FAILURE, error })
  }
}

function* listUpdateStatus({ id, status, listItemNoteVisibility }) {
  try {
    const data = {
      externalId: id,
      status,
      listItemNoteVisibility
    }

    const response = yield call(updateShareableList, data)
    yield put({ type: LIST_UPDATE_STATUS_SUCCESS })

    const { title, description } = yield select(getListItem, id)
    const itemsById = { [id]: { ...response, title, description } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_UPDATE_STATUS_FAILURE, error })
  }
}

function* listItemAddNote({ id, edit }) {
  const { cancel, confirm } = yield race({
    confirm: take(LIST_ITEM_ADD_NOTE_CONFIRM),
    cancel: take(LIST_ITEM_ADD_NOTE_CANCEL)
  })

  if (cancel) return

  try {
    const { note } = confirm
    const data = {
      externalId: id,
      note
    }

    const response = yield call(updateShareableListItem, data)
    const action = edit ? LIST_ITEM_EDIT_NOTE_SUCCESS : LIST_ITEM_ADD_NOTE_SUCCESS
    yield put({ type: action })

    const itemsById = { [id]: { ...response, note } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    const action = edit ? LIST_ITEM_EDIT_NOTE_FAILURE : LIST_ITEM_ADD_NOTE_FAILURE
    yield put({ type: action, error })
  }
}

function* listItemsReorder({ id, items }) {
  // keeping track of this in case there's an error and we need to
  // revert the id list to the original order
  const oldIdOrder = yield select(getListItemIds, id)

  try {
    // this optimistic update prevents a flash of unordered content
    const tempUpdate = { [id]: { listItemIds: items } }
    yield put({ type: LIST_ITEMS_UPDATE, itemsById: tempUpdate })

    // builds the data object, results in an array: [{ externalId, sortOrder }]
    const data = items.map((externalId, index) => ({ externalId, sortOrder: index + 1 }))
    const batches = yield chunk(data, BATCH_SIZE)
    let batchCount = batches.length
    let totalResponses = {}

    yield put({ type: MUTATION_BULK_BATCH_BEGIN, batchCount, batchTotal: batchCount })

    // submits the reordered list
    for (const batch of batches) {
      batchCount -= 1
      const response = yield call(updateShareableListItems, batch)
      totalResponses = { ...totalResponses, ...response }
      yield put({ type: MUTATION_BULK_BATCH_SUCCESS, batchCount })
    }

    yield put({ type: LIST_ITEMS_REORDER_SUCCESS })
    yield put({ type: MUTATION_BULK_BATCH_COMPLETE })

    // stores the updated sortOrder value
    const itemsById = arrayToObject(totalResponses, 'externalId')
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    // reverts to old order
    const itemsById = { [id]: { listItemIds: oldIdOrder } }
    yield put({ type: LIST_ITEMS_UPDATE, itemsById })
    yield put({ type: LIST_ITEMS_REORDER_FAILURE, error })

    yield put({ type: MUTATION_BULK_BATCH_FAILURE, batchCount: 0 })
  }
}
