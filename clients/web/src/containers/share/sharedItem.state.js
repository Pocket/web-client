import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getSharedItemByItemId } from 'common/api/queries/get-shared-item-by-id'
import { deriveSharedItem } from 'common/api/derivers/item'

import { SHARED_ITEM_REQUEST } from 'actions'
import { SHARED_ITEM_FAILURE } from 'actions'
import { SHARED_ITEM_SUCCESS } from 'actions'
import { SHARED_ITEM_DISMISS } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestSharedItem = (slug) => ({ type: SHARED_ITEM_REQUEST, slug })
export const dismissShare = () => ({ type: SHARED_ITEM_DISMISS })
export const hydrateSharedItem = (shareItem) => ({ type: SHARED_ITEM_SUCCESS, ...shareItem }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const sharedItemReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARED_ITEM_SUCCESS: {
      const { shareItem } = action
      const { context, shareUrl } = shareItem
      const displayItemId = shareItem?.preview?.item?.itemId
      return { displayItemId, shareUrl, context }
    }

    case SHARED_ITEM_FAILURE:
    case SHARED_ITEM_DISMISS: {
      return false
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { sharedItem } = action.payload
      return sharedItem
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const sharedItemSagas = [takeEvery(SHARED_ITEM_REQUEST, sharedItemRequest)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* sharedItemRequest({ slug }) {
  try {
    const data = yield getSharedItem(slug)
    yield put({
      type: SHARED_ITEM_SUCCESS,
      ...data
    })
    return
  } catch (error) {
    yield put({ type: SHARED_ITEM_FAILURE, error })
  }
}

/**
 * ASYNC CALLS
 --------------------------------------------------------------- */
export async function getSharedItem(slug) {
  try {
    const response = await getSharedItemByItemId(slug)

    // If things don't go right
    if (response.error) throw new Error(response.error)

    // Things went slightly right
    const { shareSlug, shareUrl, message } = response?.data || {}

    if (message) throw new Error(response.message)

    // Did we open a share link? If we did, let's populate
    // the state and send them on to `home`
    if (shareSlug) {
      const derivedShare = deriveSharedItem(shareSlug)
      return {
        shareItem: shareSlug,
        shareUrl,
        itemsById: { [derivedShare.itemId]: derivedShare }
      }
    }

    // Somehow all is wrong
    return { error: 'No share found' }
  } catch (error) {
    return { error }
  }
}
