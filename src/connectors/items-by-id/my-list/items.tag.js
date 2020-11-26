import { put, call, take, race, select } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'
import { getSuggestedTags } from 'common/api/tags'

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
import { ITEMS_TAG_SUGGEST_FAILURE } from 'actions'

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

export const getItemTags = (state, id) => state.myListItemsById[id]?.tags
export const getPremiumStatus = (state) => state.user.premium_status === '1'

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsTag({ items }) {
  // If there is only one item being operated on display current tags
  const itemId = items.length === 1 ? items[0].id : false
  const tagObject = itemId ? yield select(getItemTags, itemId) : {}
  const currentTags = tagObject ? Object.keys(tagObject) : [] // Tags

  // Set the stage for editing tags
  yield put({ type: ITEMS_TAG_EDIT, items, tags: currentTags })

  // Get suggestions if we are premium
  const isPremium = yield select(getPremiumStatus)
  if (isPremium) yield put({ type: ITEMS_TAG_SUGGEST_REQUEST, itemId })

  // Wait for the user to confirm or cancel
  const { confirm, cancel } = yield race({
    confirm: take(ITEMS_TAG_CONFIRM),
    cancel: take(ITEMS_TAG_CANCEL)
  })

  if (cancel) return

  // This trigger optimistic reconciliation of the list
  const { tags } = confirm
  yield put({ type: ITEMS_TAG_SEND, items, tags })

  const apiAction = itemId ? API_ACTION_REPLACE_TAGS : API_ACTION_ADD_TAGS
  const actions = buildActions(items, tags, apiAction)
  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_TAG_SUCCESS, data, actions })

  return yield put({ type: ITEMS_TAG_FAILURE, items })
}

function buildActions(items, tags, action) {
  const time = Date.now()
  return items.map((item) => ({ action, item_id: item.id, tags, time }))
}

function* itemsSuggest(action) {
  const { itemId } = action
  const response = yield getSuggestedTags(itemId)

  const { suggested_tags: suggestions } = response
  const suggestedTags = suggestions ? suggestions.map((item) => item.tag) : []

  return yield put({ type: ITEMS_TAG_SUGGEST_SUCCESS, suggestedTags })
}
