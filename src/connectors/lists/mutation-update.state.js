import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { updateShareableList } from 'common/api/mutations/updateShareableList'
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

import { LIST_ITEMS_REORDER_REQUEST } from 'actions'
import { LIST_ITEMS_REORDER_SUCCESS } from 'actions'
import { LIST_ITEMS_REORDER_FAILURE } from 'actions'

import { LIST_ITEMS_SUCCESS } from 'actions'
import { LIST_ITEMS_UPDATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListUpdateAction = (id) => ({ type: LIST_UPDATE_REQUEST, id })
export const mutateListUpdateCancel = () => ({ type: LIST_UPDATE_CANCEL })
export const mutateListUpdateConfirm = ({ title, description }) => ({ type: LIST_UPDATE_CONFIRM, title, description })
export const mutateListStatusAction = ({ id, status, listItemNoteVisibility }) => ({ type: LIST_UPDATE_STATUS_REQUEST, id, status, listItemNoteVisibility })

export const mutateReorderListItems = ({ id, items }) => ({ type: LIST_ITEMS_REORDER_REQUEST, id, items })

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
export const mutationListUpdateSagas = [
  takeLatest(LIST_UPDATE_REQUEST, listUpdate),
  takeLatest(LIST_UPDATE_STATUS_REQUEST, listUpdateStatus),
  takeLatest(LIST_ITEMS_REORDER_REQUEST, listItemsReorder)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
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
    yield put({ type: LIST_UPDATE_SUCCESS })

    const itemsById = { [id]: { ...response } }
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

    const itemsById = { [id]: { ...response } }
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    yield put({ type: LIST_UPDATE_STATUS_FAILURE, error })
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
    let totalResponses = {}

    // submits the reordered list
    for (let batch of batches) {
      let response = yield call(updateShareableListItems, batch)
      totalResponses = { ...totalResponses, ...response }
    }
xw
    yield put({ type: LIST_ITEMS_REORDER_SUCCESS })

    // stores the updated sortOrder value
    const itemsById = arrayToObject(totalResponses, 'externalId')
    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
  } catch (error) {
    // reverts to old order
    const itemsById = { [id]: { listItemIds: oldIdOrder } }
    yield put({ type: LIST_ITEMS_UPDATE, itemsById })
    yield put({ type: LIST_ITEMS_REORDER_FAILURE, error })
  }
}
