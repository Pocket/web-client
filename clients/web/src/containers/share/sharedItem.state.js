import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getSharedItemByItemId } from 'common/api/queries/get-shared-item-by-id'
import { deriveSharedItem } from 'common/api/derivers/item'

import { SHARED_ITEM_REQUEST } from 'actions'
import { SHARED_ITEM_FAILURE } from 'actions'
import { SHARED_ITEM_SUCCESS } from 'actions'
import { SHARED_ITEM_DISMISS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestSharedItem = (slug) => ({ type: SHARED_ITEM_REQUEST, slug })
export const dismissShare = () => ({ type: SHARED_ITEM_DISMISS })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const sharedItemReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARED_ITEM_SUCCESS: {
      const { shareItem } = action
      const context = shareItem?.context
      const displayItemId = shareItem?.preview?.item?.itemId
      return { displayItemId, context }
    }

    case SHARED_ITEM_FAILURE:
    case SHARED_ITEM_DISMISS: {
      return false
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
    const response = yield getSharedItemByItemId(slug)

    console.log(response)
    // If things don't go right
    if (response.error) throw new Error(response.error)

    // It things went slightly right
    const { shareSlug, message } = response?.data || {}

    if (message) throw new Error(response.message)

    // Did we open a share link? If we did, let's populate
    // the state and send them on to `home`
    if (shareSlug) {
      const derivedShare = deriveSharedItem(shareSlug)
      yield put({
        type: SHARED_ITEM_SUCCESS,
        shareItem: shareSlug,
        itemsById: { [derivedShare.itemId]: derivedShare }
      })
      return
    }

    // Somehow all is wrong
    yield put({ type: SHARED_ITEM_FAILURE, error: 'Nothing returned' })
  } catch (error) {
    yield put({ type: SHARED_ITEM_FAILURE, error })
  }
}
