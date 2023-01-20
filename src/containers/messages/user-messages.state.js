import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getShares } from 'common/api/_legacy/messages'
import { resendConfirmation } from 'common/api/_legacy/messages'
import { sendItemActions } from 'common/api/_legacy/item-actions'

import { API_ACTION_SHARE_ADDED } from 'common/constants'
import { API_ACTION_SHARE_IGNORED } from 'common/constants'

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
import { RESEND_CONFIRMATION_SUCCESS } from 'actions'
import { RESEND_CONFIRMATION_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMessages = () => ({ type: GET_SHARES_REQUEST })
export const addMessageItem = (payload) => ({ type: ADD_SHARE_REQUEST, ...payload })
export const ignoreMessage = (payload) => ({ type: IGNORE_SHARE_REQUEST, ...payload })
export const requestConfirmation = () => ({ type: RESEND_CONFIRMATION_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  hydrated: false,
  itemsById: {},
  notifications: [],
  unconfirmed_shares: null,
  confirmationStatus: null
}

export const userMessageReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHARES_SUCCESS: {
      const { notifications, unconfirmed_shares, itemsById } = action
      return {
        ...state,
        notifications,
        unconfirmed_shares,
        itemsById,
        hydrated: true
      }
    }

    case GET_SHARES_FAILURE: {
      return {
        ...state,
        fetched: true
      }
    }

    case IGNORE_SHARE_SUCCESS:
    case ADD_SHARE_SUCCESS: {
      const { notifications } = action
      return { ...state, notifications }
    }

    case RESEND_CONFIRMATION_SUCCESS:
    case RESEND_CONFIRMATION_FAILURE: {
      const { confirmationStatus } = action
      return { ...state, confirmationStatus }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const userMessageSagas = [
  takeEvery(GET_SHARES_REQUEST, sharesRequest),
  takeEvery(ADD_SHARE_REQUEST, addRequest),
  takeEvery(IGNORE_SHARE_REQUEST, ignoreRequest),
  takeEvery(RESEND_CONFIRMATION_REQUEST, confirmationRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getUserEmail = (state) => state.user.email
const getNotifications = (state) => state.userMessages.notifications

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* sharesRequest() {
  try {
    const response = yield getShares()
    if (response?.status !== 1) throw new Error('Cannot get shares')

    const { notifications, unconfirmed_shares, itemsById} = response

    yield put({ type: GET_SHARES_SUCCESS, notifications, unconfirmed_shares, itemsById })
  } catch (error) {
    yield put({ type: GET_SHARES_FAILURE, error })
  }
}

function* addRequest({ share_id, item_id, item }) {
  try {
    const actions = [
      {
        action: API_ACTION_SHARE_ADDED,
        share_id: parseInt(share_id, 10),
        item_id,
        item
      }
    ]

    const response = yield call(sendItemActions, actions)
    if (response?.status !== 1) throw new Error('Cannot add message')

    const oldNotifications = yield select(getNotifications)
    const notifications = oldNotifications.filter((item) => item.share_id !== share_id)

    yield put({ type: ADD_SHARE_SUCCESS, notifications })
  } catch (error) {
    yield put({ type: ADD_SHARE_FAILURE })
  }
}

function* ignoreRequest({ share_id, item_id, item }) {
  try {
    const actions = [
      {
        action: API_ACTION_SHARE_IGNORED,
        share_id: parseInt(share_id, 10),
        item_id,
        item
      }
    ]

    const response = yield call(sendItemActions, actions)
    if (response?.status !== 1) throw new Error('Cannot ignore message')

    const oldNotifications = yield select(getNotifications)
    const notifications = oldNotifications.filter((item) => item.share_id !== share_id)

    yield put({ type: IGNORE_SHARE_SUCCESS, notifications })
  } catch (error) {
    yield put({ type: IGNORE_SHARE_FAILURE })
  }
}

function* confirmationRequest() {
  try {
    const email = yield select(getUserEmail)
    const response = yield call(resendConfirmation, email)
    const confirmationStatus = response?.status !== 1 ? 'failed' : 'success'

    yield put({ type: RESEND_CONFIRMATION_SUCCESS, confirmationStatus })
  } catch (error) {
    const confirmationStatus = 'failed'
    yield put({ type: RESEND_CONFIRMATION_FAILURE, confirmationStatus })
  }
}
