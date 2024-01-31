import { put, takeLatest, take, race, call, select, all } from 'redux-saga/effects'
import { createShareableListItem } from 'common/api/mutations/createShareableListItem'
import { bulkCreateShareableListItems } from 'common/api/mutations/addToShareableList'
import { chunk } from 'common/utilities/object-array/object-array'
import { BATCH_SIZE } from 'common/constants'

import { LIST_ADD_ITEM_REQUEST } from 'actions'
import { LIST_ADD_ITEM_CONFIRM } from 'actions'
import { LIST_ADD_ITEM_CANCEL } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_ADD_ITEM_FAILURE } from 'actions'

import { LIST_BULK_ADD_ITEM_REQUEST } from 'actions'

import { LIST_CREATE_REQUEST } from 'actions'
import { LIST_CREATE_SUCCESS } from 'actions'

import { MUTATION_BULK_BATCH_COMPLETE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListAddItem = (id) => ({ type: LIST_ADD_ITEM_REQUEST, id })
export const mutateListAddCancel = () => ({ type: LIST_ADD_ITEM_CANCEL })
export const mutateListAddConfirm = ({ externalId, listTitle }) => ({ type: LIST_ADD_ITEM_CONFIRM, externalId, listTitle }) //prettier-ignore

export const mutateListBulkAddItems = (ids) => ({ type: LIST_BULK_ADD_ITEM_REQUEST, ids })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  open: false,
  lastUsedList: '',
  id: null,
  ids: null
}

export const mutationListAddReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADD_ITEM_REQUEST: {
      const { id } = action
      return { ...state, open: true, id }
    }

    case LIST_BULK_ADD_ITEM_REQUEST: {
      const { ids } = action
      return { ...state, open: true, ids }
    }

    case LIST_CREATE_SUCCESS:
    case LIST_ADD_ITEM_SUCCESS: {
      const { listTitle } = action
      return { ...state, open: false, lastUsedList: listTitle, id: null, ids: null }
    }

    case LIST_CREATE_REQUEST:
    case LIST_ADD_ITEM_FAILURE:
    case LIST_ADD_ITEM_CANCEL: {
      return { ...state, open: false, id: null, ids: null }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListAddSagas = [
  takeLatest(LIST_ADD_ITEM_REQUEST, listAddItem),
  takeLatest(LIST_BULK_ADD_ITEM_REQUEST, bulkListAddItem)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getItem = (state, id) => state.itemsDisplay[id]
const getListLength = (state, id) => state.listsDisplay[id]?.listItemIds?.length

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
    const { externalId, listTitle } = confirm
    const { givenUrl, excerpt, thumbnail, title, publisher, itemId } = yield select(getItem, id)
    const listLength = yield select(getListLength, externalId)

    const data = {
      url: givenUrl,
      excerpt,
      imageUrl: thumbnail || null,
      title,
      publisher,
      itemId,
      listExternalId: externalId,
      sortOrder: listLength + 1
    }

    yield call(createShareableListItem, data)
    yield put({ type: LIST_ADD_ITEM_SUCCESS, listTitle })
  } catch (error) {
    yield put({ type: LIST_ADD_ITEM_FAILURE, error })
  }
}

function* bulkListAddItem({ ids }) {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(LIST_ADD_ITEM_CONFIRM),
    cancel: take(LIST_ADD_ITEM_CANCEL)
  })

  if (cancel) return

  try {
    const { externalId, listTitle } = confirm
    const itemData = yield all(ids.map((id) => select(getItem, id)))

    const data = itemData.map((item) => {
      const { givenUrl, excerpt, thumbnail, title, publisher, itemId } = item
      return {
        url: givenUrl,
        excerpt,
        imageUrl: thumbnail || null,
        title,
        publisher,
        itemId
      }
    })

    // Batch and send api calls for the ids
    const batches = yield chunk(data, BATCH_SIZE)
    let totalResponses = {}

    for (const batch of batches) {
      const response = yield call(bulkCreateShareableListItems, batch, externalId)
      totalResponses = { ...totalResponses, ...response }
    }

    // TODO: uh oh, too many toasts
    yield put({ type: LIST_ADD_ITEM_SUCCESS, listTitle })
    yield put({ type: MUTATION_BULK_BATCH_COMPLETE })
  } catch (error) {
    yield put({ type: LIST_ADD_ITEM_FAILURE, error })
  }
}
