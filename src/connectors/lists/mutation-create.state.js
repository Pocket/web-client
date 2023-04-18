import { put, takeLatest, take, race, call, select } from 'redux-saga/effects'
import { createShareableList } from 'common/api/mutations/createShareableList'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'

import { LIST_ITEMS_SUCCESS } from 'actions'

import { LIST_CREATE_REQUEST } from 'actions'
import { LIST_CREATE_CONFIRM } from 'actions'
import { LIST_CREATE_CANCEL } from 'actions'
import { LIST_CREATE_FAILURE } from 'actions'
import { LIST_CREATE_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListCreate = (id) => ({ type: LIST_CREATE_REQUEST, id })
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
  id: null
}

export const mutationListCreateReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_CREATE_REQUEST: {
      const { id } = action
      return { open: true, id }
    }

    case LIST_CREATE_SUCCESS:
    case LIST_CREATE_FAILURE:
    case LIST_CREATE_CANCEL: {
      return { open: false, id: null }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListCreateSagas = [takeLatest(LIST_CREATE_REQUEST, itemsCreateList)]

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
