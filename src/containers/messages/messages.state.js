import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getShares } from 'common/api/messages'
import { addShare } from 'common/api/messages'
import { ignoreShare } from 'common/api/messages'
import { resendConfirmation } from 'common/api/messages'

import { GET_SHARES_REQUEST } from 'actions'
import { GET_SHARES_SUCCESS } from 'actions'
import { GET_SHARES_FAILURE } from 'actions'

import { ADD_SHARE_REQUEST } from 'actions'
import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { IGNORE_SHARE_REQUEST } from 'actions'
import { IGNORE_SHARE_SUCCESS } from 'actions'
import { IGNORE_SHARE_FAILURE } from 'actions'

import { RESEND_CONFIRMATION_REQUEST } from 'actions'
// import { RESEND_CONFIRMATION_SUCCESS } from 'actions'
// import { RESEND_CONFIRMATION_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMessages = () => ({ type: GET_SHARES_REQUEST })
export const addMessageItem = () => ({ type: ADD_SHARE_REQUEST })
export const ignoreMessage = (payload) => ({ type: IGNORE_SHARE_REQUEST, payload })
export const requestConfirmation = () => ({ type: RESEND_CONFIRMATION_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
 const initialState = {
  notifications: [],
  unconfirmed_shares: null
}

export const messagesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHARES_SUCCESS: {
      const { notifications, unconfirmed_shares } = action
      return {
        ...state,
        notifications,
        unconfirmed_shares
      }
    }

    case IGNORE_SHARE_SUCCESS:
    case ADD_SHARE_SUCCESS: {
      const { notifications } = action
      return { ...state, notifications }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const messagesSagas = [
  takeEvery(GET_SHARES_REQUEST, sharesRequest),
  takeEvery(ADD_SHARE_REQUEST, addRequest),
  takeEvery(IGNORE_SHARE_REQUEST, ignoreRequest),
  takeEvery(RESEND_CONFIRMATION_REQUEST, confirmationRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getUserEmail = (state) => state.user.email
const getNotifications = (state) => state.messages.notifications

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* sharesRequest() {
  try {
    const response = yield getShares()
    if (response?.status !== 1) throw new Error('Cannot get shares')

    const { notifications, unconfirmed_shares } = response

    yield put({ type: GET_SHARES_SUCCESS, notifications, unconfirmed_shares })
  } catch (error) {
    yield put({ type: GET_SHARES_FAILURE, error })
  }
}

function* addRequest() {
  try {
    const response = yield call(addShare, { share_id, item_id, item })
    if (response?.status !== 1) throw new Error('Cannot ignore message')

    const oldNotifications = yield select(getNotifications)
    const notifications = oldNotifications.filter(item => item.share_id !== share_id)

    yield put({ type: ADD_SHARE_SUCCESS, notifications })
  } catch (error) {
    yield put({ type: ADD_SHARE_FAILURE })
  }
}

function* ignoreRequest({ share_id, item_id, item }) {
  try {
    const response = yield call(ignoreShare, { share_id, item_id, item })
    if (response?.status !== 1) throw new Error('Cannot ignore message')

    const oldNotifications = yield select(getNotifications)
    const notifications = oldNotifications.filter(item => item.share_id !== share_id)

    yield put({ type: IGNORE_SHARE_SUCCESS, notifications })
  } catch (error) {
    yield put({ type: IGNORE_SHARE_FAILURE })
  }
}

function* confirmationRequest() {
  const email = yield select(getUserEmail)
  yield call(resendConfirmation, email)
}
