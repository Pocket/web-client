import { put, call, takeLatest } from 'redux-saga/effects'
import { getFeedByUser } from 'common/api/_legacy/profile'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { arrayToObject } from 'common/utilities'
import { saveItem as saveItemAPI } from 'common/api/_legacy/saveItem'
import { deriveProfile } from 'common/api/derivers/item'

import { API_ACTION_DELETE_RECOMMEND } from 'common/constants'

import { GET_PROFILE_FEED_REQUEST } from 'actions'
import { GET_PROFILE_FEED_SUCCESS } from 'actions'
import { GET_PROFILE_FEED_FAILURE } from 'actions'

import { PROFILE_ITEM_SAVE_REQUEST } from 'actions'
import { PROFILE_ITEM_SAVE_SUCCESS } from 'actions'
import { PROFILE_ITEM_SAVE_FAILURE } from 'actions'

import { PROFILE_ITEM_DELETE_REQUEST } from 'actions'
import { PROFILE_ITEM_DELETE_SUCCESS } from 'actions'
import { PROFILE_ITEM_DELETE_FAILURE } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getProfileItems = (id) => ({ type: GET_PROFILE_FEED_REQUEST, id })
export const saveRecommendedItem = (id, url) => ({ type: PROFILE_ITEM_SAVE_REQUEST, id, url })
export const deleteRecommendedItem = (postId, itemId) => ({ type: PROFILE_ITEM_DELETE_REQUEST, postId, itemId }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  items: []
}

export const profileItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_FEED_SUCCESS: {
      const { items, itemsById } = action
      return { ...state, items, itemsById }
    }
    case PROFILE_ITEM_SAVE_SUCCESS: {
      const { id, openExternal } = action
      return {
        ...state,
        itemsById: updateSaveStatus(state.itemsById, id, 'saved', openExternal)
      }
    }

    case PROFILE_ITEM_DELETE_SUCCESS: {
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
export const profileItemsSagas = [
  takeLatest(GET_PROFILE_FEED_REQUEST, getProfileFeedRequest),
  takeLatest(PROFILE_ITEM_SAVE_REQUEST, saveRecommendedItemRequest),
  takeLatest(PROFILE_ITEM_DELETE_REQUEST, deleteRecommendedItemRequest)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* getProfileFeedRequest({ id }) {
  try {
    const { feed, error } = yield getFeedByUser(id)
    if (error) throw new Error('Cannot get profile feed')

    const derivedItems = feed.map((feed) => deriveProfile(feed, true))
    const items = derivedItems.map((node) => node.itemId)
    const itemsById = arrayToObject(derivedItems, 'itemId')

    yield put({ type: GET_PROFILE_FEED_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: GET_PROFILE_FEED_FAILURE, error })
  }
}

function* saveRecommendedItemRequest({ url, id }) {
  try {
    const response = yield saveItemAPI(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: PROFILE_ITEM_SAVE_SUCCESS, id, openExternal: true })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    yield put({ type: PROFILE_ITEM_SAVE_FAILURE, error, id })
  }
}

function* deleteRecommendedItemRequest({ postId, itemId }) {
  try {
    const actions = [{ action: API_ACTION_DELETE_RECOMMEND, post_id: postId }]
    const response = yield call(sendItemActions, actions)
    if (response?.status !== 1) throw new Error('Unable to delete post')

    yield put({ type: PROFILE_ITEM_DELETE_SUCCESS, itemId })
  } catch (error) {
    yield put({ type: PROFILE_ITEM_DELETE_FAILURE, error, postId })
  }
}
