import { put, call, takeEvery, take, race } from 'redux-saga/effects'

import { sendItemActions } from 'common/api/_legacy/item-actions'

import { ITEMS_SHARE_REQUEST } from 'actions'
import { ITEMS_SHARE_CANCEL } from 'actions'
import { ITEMS_SHARE_SUCCESS } from 'actions'
import { ITEMS_SHARE_FAILURE } from 'actions'
import { ITEMS_RECOMMEND_CONFIRM } from 'actions'
import { ITEMS_SEND_TO_FRIEND_CONFIRM } from 'actions'
import { ITEMS_SEND_TO_FRIEND_ADD } from 'actions'
import { ITEMS_SEND_TO_FRIEND_REMOVE } from 'actions'

import { API_ACTION_SHARE } from 'common/constants'
import { API_ACTION_RECOMMEND } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsShareAction = (item) => ({ type: ITEMS_SHARE_REQUEST, item }) //prettier-ignore
export const itemsShareCancel = () => ({ type: ITEMS_SHARE_CANCEL })
export const itemsRecommendConfirm = (comment) => ({ type: ITEMS_RECOMMEND_CONFIRM, comment }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  id: false,
  position: null,
  shareType: null,
  friendList: [],
  quote: null
}

export const itemShareReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SHARE_REQUEST: {
      const { item } = action
      return { ...state, ...item }
    }

    case ITEMS_SHARE_CANCEL:
    case ITEMS_SHARE_SUCCESS:
    case ITEMS_SHARE_FAILURE: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemShareSagas = [takeEvery(ITEMS_SHARE_REQUEST, itemShare)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemShare({ item }) {
  // Wait for the user to confirm or cancel
  const { cancel, recommend } = yield race({
    recommend: take(ITEMS_RECOMMEND_CONFIRM),
    cancel: take(ITEMS_SHARE_CANCEL)
  })

  if (cancel) return
  if (recommend) return yield itemRecommend({ item, response: recommend })
}

function* itemRecommend({ item, response }) {
  const { id, quote } = item
  const { comment } = response

  // Update the server
  const actions = [
    {
      action: API_ACTION_RECOMMEND,
      channels: ['public_profile'],
      item_id: id,
      quote,
      comment
    }
  ]

  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_SHARE_SUCCESS, data })
}
