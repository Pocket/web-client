import { put, takeEvery, call } from 'redux-saga/effects'

import { SHARE_REQUEST } from 'actions'
import { SHARE_RECOMMEND } from 'actions'
import { SHARE_RECOMMEND_SUCCESS } from 'actions'
import { SHARE_RECOMMEND_FAILURE } from 'actions'
import { SHARE_CANCEL } from 'actions'

import { API_ACTION_RECOMMEND } from 'common/constants'
import { sendItemActions } from 'common/api/_legacy/item-actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareAction = ({ item, quote, position }) => ({ type: SHARE_REQUEST, item, quote, position }) //prettier-ignore
export const shareRecommend = ({ itemId, quote, comment }) => ({ type: SHARE_RECOMMEND, itemId, quote, comment }) //prettier-ignore
export const shareCancel = () => ({ type: SHARE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  item: false,
  position: null,
  quote: null
}

export const mutationShareReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARE_REQUEST: {
      const { item, quote, position } = action
      return { ...state, item, quote, position }
    }

    case SHARE_RECOMMEND_SUCCESS:
    case SHARE_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationShareSagas = [takeEvery(SHARE_RECOMMEND, itemRecommend)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemRecommend({ itemId, quote, comment }) {
  try {
    const actions = [
      {
        action: API_ACTION_RECOMMEND,
        channels: ['public_profile'],
        item_id: itemId,
        quote,
        comment
      }
    ]

    const response = yield call(sendItemActions, actions)
    if (response?.status !== 1) throw new Error('Cannot recommend item')

    return yield put({ type: SHARE_RECOMMEND_SUCCESS })
  } catch (error) {
    yield put({ type: SHARE_RECOMMEND_FAILURE, error })
  }
}
