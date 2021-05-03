import { put, select, call, takeLatest } from 'redux-saga/effects'
import { getFeedByUser } from 'common/api/recommended'
import { sendItemActions } from 'common/api/item-actions'
import { arrayToObject } from 'common/utilities'
import { saveItem as saveItemAPI } from 'common/api/saveItem'
import { deriveItems, checkExternal } from 'connectors/items-by-id/recommended/items.derive'

import { API_ACTION_DELETE_RECOMMEND } from 'common/constants'

import { GET_PROFILE_FEED_REQUEST } from 'actions'
import { GET_PROFILE_FEED_SUCCESS } from 'actions'
import { GET_PROFILE_FEED_FAILURE } from 'actions'

import { RECOMMENDED_ITEM_SAVE_REQUEST } from 'actions'
import { RECOMMENDED_ITEM_SAVE_SUCCESS } from 'actions'
import { RECOMMENDED_ITEM_SAVE_FAILURE } from 'actions'

import { RECOMMENDED_ITEM_DELETE_REQUEST } from 'actions'
import { RECOMMENDED_ITEM_DELETE_SUCCESS } from 'actions'
import { RECOMMENDED_ITEM_DELETE_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getProfileItems = (id) => ({ type: GET_PROFILE_FEED_REQUEST, id })
export const saveRecommendedItem = (id, url) => ({ type: RECOMMENDED_ITEM_SAVE_REQUEST, id, url })
export const deleteRecommendedItem = (postId, itemId) => ({ type: RECOMMENDED_ITEM_DELETE_REQUEST, postId, itemId }) //prettier-ignore

 /** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  items: []
}

export const recommendedItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_FEED_SUCCESS:
      const { items, itemsById } = action
      return { ...state, items, itemsById }

    case RECOMMENDED_ITEM_SAVE_SUCCESS: {
      const { id, openExternal } = action
      return {
        ...state,
        itemsById: updateSaveStatus(state.itemsById, id, 'saved', openExternal)
      }
    }

    case RECOMMENDED_ITEM_DELETE_SUCCESS: {
      const { itemId } = action
      return {
        ...state,
        items: state.items.filter((item) => item !== itemId)
      }
    }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, save_status, openExternal = true) {
  const updatedItem = { ...state[id], save_status, openExternal }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recommendedItemsSagas = [
  takeLatest(GET_PROFILE_FEED_REQUEST, getProfileFeedRequest),
  takeLatest(RECOMMENDED_ITEM_SAVE_REQUEST, saveRecommendedItemRequest),
  takeLatest(RECOMMENDED_ITEM_DELETE_REQUEST, deleteRecommendedItemRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getAllRecommendedItems = (state) => state.recommendedItemsByIds.items
const getRecommendedItemById = (state, id) => state.recommendedItemsByIds.itemsById[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* getProfileFeedRequest({ id }) {
  try {
    const { feed, error } = yield getFeedByUser(id)
    if (error) throw new Error('Cannot get profile feed')

    const derivedItems = yield deriveItems(feed)
    const items = derivedItems.map((item) => item.item_id)
    const itemsById = arrayToObject(derivedItems, 'item_id')

    yield put({ type: GET_PROFILE_FEED_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: GET_PROFILE_FEED_FAILURE, error })
  }
}

function* saveRecommendedItemRequest({ url, id }) {
  try {
    const response = yield saveItemAPI(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    const item = yield select(getRecommendedItemById, id)
    const openExternal = checkExternal({item})

    yield put({ type: RECOMMENDED_ITEM_SAVE_SUCCESS, id, openExternal })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    yield put({ type: RECOMMENDED_ITEM_SAVE_FAILURE, error, id })
  }
}

function* deleteRecommendedItemRequest({ postId, itemId }) {
  try {
    const actions = [{ action: API_ACTION_DELETE_RECOMMEND, post_id: postId }]
    const response = yield call(sendItemActions, actions)
    if (response?.status !== 1) throw new Error('Unable to delete post')

    yield put({ type: RECOMMENDED_ITEM_DELETE_SUCCESS, itemId })
  } catch (error) {
    yield put({ type: RECOMMENDED_ITEM_DELETE_FAILURE, error, postId })
  }
}
