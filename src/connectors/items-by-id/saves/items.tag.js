import { put, call, take, race, select } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { getSuggestedTags } from 'common/api/_legacy/tags'
import { buildActions } from 'connectors/items-by-id/saves/build-actions'
import { batchSendActions } from 'connectors/items-by-id/saves/build-actions'

import { ITEMS_TAG_REQUEST } from 'actions'
import { ITEMS_TAG_CONFIRM } from 'actions'
import { ITEMS_TAG_ADD_TAG } from 'actions'
import { ITEMS_TAG_REMOVE_TAG } from 'actions'
import { ITEMS_TAG_SEND } from 'actions'
import { ITEMS_TAG_CANCEL } from 'actions'
import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'
import { ITEMS_TAG_EDIT } from 'actions'
import { ITEMS_TAG_SUGGEST_REQUEST } from 'actions'
import { ITEMS_TAG_SUGGEST_SUCCESS } from 'actions'

import { API_ACTION_ADD_TAGS, API_ACTION_REPLACE_TAGS } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsTagAction = (items) => ({ type: ITEMS_TAG_REQUEST, items }) //prettier-ignore
export const itemsTagConfirm = (tags) => ({ type: ITEMS_TAG_CONFIRM, tags })
export const itemsTagCancel = () => ({ type: ITEMS_TAG_CANCEL })
export const itemsTagAdd = (tag) => ({ type: ITEMS_TAG_ADD_TAG, tag })
export const itemsTagRemove = (tags) => ({ type: ITEMS_TAG_REMOVE_TAG, tags })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = { itemList: [], tags: [] }

export const itemTagReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_TAG_EDIT: {
      const { items, tags } = action
      return { itemList: items, tags }
    }

    case ITEMS_TAG_SUGGEST_SUCCESS: {
      const { suggestedTags } = action
      return { ...state, suggestedTags }
    }

    case ITEMS_TAG_ADD_TAG: {
      const { tag } = action
      if (tag === '') return state

      const set = new Set([...state.tags, tag])
      return { ...state, tags: Array.from(set) }
    }

    case ITEMS_TAG_REMOVE_TAG: {
      const { tags } = action
      const tagDraft = state.tags.filter((tag) => !tags.includes(tag))
      return { ...state, tags: tagDraft }
    }

    case ITEMS_TAG_FAILURE:
    case ITEMS_TAG_SEND:
    case ITEMS_TAG_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemTagSagas = [
  takeEvery(ITEMS_TAG_REQUEST, itemsTag),
  takeLatest(ITEMS_TAG_SUGGEST_REQUEST, itemsSuggest)
]

export const getItemTags = (state, id) => state.savesItemsById[id]?.tags
export const getPremiumStatus = (state) => state.user.premium_status === '1'

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsTag({ items }) {
  // If there is only one item being operated on display current tags
  const itemId = items.length === 1 ? items[0].id : false
  const storedTags = itemId ? yield select(getItemTags, itemId) : []
  const currentTags = storedTags.map((tag) => tag.name)

  // Set the stage for editing tags
  yield put({ type: ITEMS_TAG_EDIT, items, tags: currentTags })

  // Get suggestions if we are premium AND there is only one item
  const isPremium = yield select(getPremiumStatus)
  if (isPremium && itemId) {
    yield put({ type: ITEMS_TAG_SUGGEST_REQUEST, itemId })
  }

  // Wait for the user to confirm or cancel
  const { confirm, cancel } = yield race({
    confirm: take(ITEMS_TAG_CONFIRM),
    cancel: take(ITEMS_TAG_CANCEL)
  })

  if (cancel) return

  // This trigger optimistic reconciliation of the list
  const { tags } = confirm
  yield put({ type: ITEMS_TAG_SEND, items, tags })

  // If we only have one item
  if (itemId) {
    const actions = buildActions(items, API_ACTION_REPLACE_TAGS, tags)
    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ITEMS_TAG_SUCCESS, data, actions })

    return yield put({ type: ITEMS_TAG_FAILURE, items })
  }

  // Build and send batched actions
  const batchActions = yield batchSendActions(items, API_ACTION_ADD_TAGS, tags)

  // If batch is successful
  if (batchActions.length) {
    return yield put({ type: ITEMS_TAG_SUCCESS, actions: batchActions })
  }

  // If there is a failure
  return yield put({ type: ITEMS_TAG_FAILURE, items })
}

function* itemsSuggest(action) {
  const { itemId } = action
  const response = yield getSuggestedTags(itemId)

  const { suggested_tags: suggestions } = response
  const suggestedTags = suggestions ? suggestions.map((item) => item.tag) : []

  return yield put({ type: ITEMS_TAG_SUGGEST_SUCCESS, suggestedTags })
}
