import { put, takeLatest, call } from 'redux-saga/effects'

import { getAccountNotifications, setAccountNotifications } from 'common/api/_legacy/account'

import { ACCOUNT_GET_NOTIFICATIONS_REQUEST } from 'actions'
import { ACCOUNT_GET_NOTIFICATIONS_SUCCESS } from 'actions'
import { ACCOUNT_GET_NOTIFICATIONS_FAILURE } from 'actions'

import { ACCOUNT_SET_HITS_FREQUENCY_REQUEST } from 'actions'
import { ACCOUNT_SET_HITS_FREQUENCY_SUCCESS } from 'actions'
import { ACCOUNT_SET_HITS_FREQUENCY_FAILURE } from 'actions'

import { ACCOUNT_SET_MARKETING_NOTIFICATION_REQUEST } from 'actions'
import { ACCOUNT_SET_MARKETING_NOTIFICATION_SUCCESS } from 'actions'
import { ACCOUNT_SET_MARKETING_NOTIFICATION_FAILURE } from 'actions'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const getNotifications = () => ({ type: ACCOUNT_GET_NOTIFICATIONS_REQUEST })
export const setFrequency = (frequency) => ({ type: ACCOUNT_SET_HITS_FREQUENCY_REQUEST, frequency })
export const setMarketing = (value) => ({ type: ACCOUNT_SET_MARKETING_NOTIFICATION_REQUEST, value })

/** REDUCERS
 --------------------------------------------------------------- */
export const userNotificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_GET_NOTIFICATIONS_SUCCESS: {
      const { checkMarketing, hitsFrequency } = action
      return { ...state, checkMarketing, hitsFrequency }
    }

    case ACCOUNT_SET_HITS_FREQUENCY_REQUEST: {
      const { frequency } = action
      return { ...state, hitsFrequency: frequency }
    }

    case ACCOUNT_SET_MARKETING_NOTIFICATION_REQUEST:
    case ACCOUNT_SET_MARKETING_NOTIFICATION_FAILURE: {
      const { value } = action
      return { ...state, checkMarketing: value }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userNotificationSagas = [
  takeLatest(ACCOUNT_GET_NOTIFICATIONS_REQUEST, getNotificationsData),
  takeLatest(ACCOUNT_SET_HITS_FREQUENCY_REQUEST, setHitsFrequency),
  takeLatest(ACCOUNT_SET_MARKETING_NOTIFICATION_REQUEST, setMarketingEmails)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getNotificationsData() {
  const response = yield call(getAccountNotifications)
  const { status, error, checkMarketing, hitsFrequency } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_GET_NOTIFICATIONS_SUCCESS, checkMarketing, hitsFrequency })
  }

  yield put({ type: ACCOUNT_GET_NOTIFICATIONS_FAILURE, err: error })
}

function* setHitsFrequency(action) {
  const { frequency } = action

  const response = yield call(setAccountNotifications, { hitsFrequency: frequency })
  const { status, error } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_SET_HITS_FREQUENCY_SUCCESS })
  }

  yield put({ type: ACCOUNT_SET_HITS_FREQUENCY_FAILURE, err: error })
}

function* setMarketingEmails(action) {
  const { value } = action

  const response = yield call(setAccountNotifications, { checkMarketing: value })
  const { status, error } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_SET_MARKETING_NOTIFICATION_SUCCESS })
  }

  yield put({ type: ACCOUNT_SET_MARKETING_NOTIFICATION_FAILURE, value: !value, err: error })
}
