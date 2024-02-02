import { put, takeLatest, take, race, call, select, all } from 'redux-saga/effects'
import { createShareableList } from 'common/api/mutations/createShareableList'
import { createAndAddToShareableList } from 'common/api/mutations/createAndAddToShareableList'
import { bulkCreateShareableListItems } from 'common/api/mutations/addToShareableList'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'
import { chunk } from 'common/utilities/object-array/object-array'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { LIST_CREATE_REQUEST } from 'actions'
import { LIST_CREATE_CONFIRM } from 'actions'
import { LIST_CREATE_CANCEL } from 'actions'
import { LIST_CREATE_FAILURE } from 'actions'
import { LIST_CREATE_SUCCESS } from 'actions'

import { LIST_BULK_CREATE_REQUEST } from 'actions'

import { MUTATION_BULK_BATCH_BEGIN } from 'actions'
import { MUTATION_BULK_BATCH_FAILURE } from 'actions'
import { MUTATION_BULK_BATCH_SUCCESS } from 'actions'
import { MUTATION_BULK_BATCH_COMPLETE } from 'actions'

import { BATCH_SIZE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListCreate = (id) => ({ type: LIST_CREATE_REQUEST, id })
export const mutateBulkListCreate = (ids) => ({ type: LIST_BULK_CREATE_REQUEST, ids })
export const mutateListConfirm = ({ title, description }) => ({
  type: LIST_CREATE_CONFIRM,
  title,
  description
})
export const mutateListCancel = () => ({ type: LIST_CREATE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  open: false,
  id: null,
  ids: null
}

export const mutationListCreateReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_CREATE_REQUEST: {
      const { id } = action
      return { open: true, id }
    }

    case LIST_BULK_CREATE_REQUEST: {
      const { ids } = action
      return { open: true, ids }
    }

    case LIST_CREATE_SUCCESS:
    case LIST_CREATE_FAILURE:
    case LIST_CREATE_CANCEL: {
      return { open: false, id: null, ids: null }
    }

    case MUTATION_BULK_BATCH_BEGIN: {
      return { ...state, open: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListCreateSagas = [
  takeLatest(LIST_CREATE_REQUEST, itemsCreateList),
  takeLatest(LIST_BULK_CREATE_REQUEST, itemsBulkCreateList)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getItem = (state, id) => state.itemsDisplay[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsCreateList({ id }) {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(LIST_CREATE_CONFIRM),
    cancel: take(LIST_CREATE_CANCEL)
  })

  if (cancel) return

  try {
    const { title, description } = confirm
    const listData = getObjectWithValidKeysOnly({
      title: title.trim(),
      description: description.trim()
    })

    let listItemData = null

    const item = yield select(getItem, id)
    // If item is null, that means an id was never passed in, so listItemData will
    // remain null, which means it'll create a list without the item.
    if (item) {
      const { givenUrl, excerpt, thumbnail, title, publisher, itemId } = item
      listItemData = {
        url: givenUrl,
        excerpt,
        imageUrl: thumbnail || null,
        title,
        publisher,
        itemId,
        sortOrder: 1
      }
    }

    const { itemsById, externalIds } = yield call(createShareableList, { listData, listItemData })
    const externalId = externalIds[0]

    yield put({ type: LIST_ITEMS_SUCCESS, itemsById })
    return yield put({ type: LIST_CREATE_SUCCESS, externalId, listTitle: title })
  } catch {
    return yield put({ type: LIST_CREATE_FAILURE })
  }
}

function* itemsBulkCreateList({ ids }) {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(LIST_CREATE_CONFIRM),
    cancel: take(LIST_CREATE_CANCEL)
  })

  if (cancel) return

  try {
    const { title, description } = confirm
    const listData = getObjectWithValidKeysOnly({
      title: title.trim(),
      description: description.trim()
    })

    const items = yield all(ids.map((id) => select(getItem, id)))

    const data = items.map((item) => {
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

    // We only want to submit 30 items at a time, so we split off the first chunk
    // here and we'll check if there's items left a few lines down
    const itemData = data.splice(0, 3)

    const { externalIds } = yield call(createAndAddToShareableList, listData, itemData)
    const externalId = externalIds[0]

    // check if there's data left, and if there is, batch it up and send it
    if (data.length > 0) {
      const batches = yield chunk(data, BATCH_SIZE)
      let batchCount = batches.length

      yield put({ type: MUTATION_BULK_BATCH_BEGIN, batchCount, batchTotal: batchCount })

      for (const batch of batches) {
        batchCount -= 1
        yield call(bulkCreateShareableListItems, batch, externalId)
        yield put({ type: MUTATION_BULK_BATCH_SUCCESS, batchCount })
      }
    }

    yield put({ type: LIST_CREATE_SUCCESS, externalId, listTitle: title })
    yield put({ type: MUTATION_BULK_BATCH_COMPLETE })
  } catch {
    yield put({ type: LIST_CREATE_FAILURE })
    yield put({ type: MUTATION_BULK_BATCH_FAILURE, batchCount: 0 })
  }
}
