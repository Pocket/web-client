import { put, takeLatest, call } from 'redux-saga/effects'
import { setRssProtection } from 'common/api/_legacy/account'
import { clearAccount } from 'common/api/_legacy/account'
import { deleteAccount } from 'common/api/_legacy/account'
import { LOGIN_URL } from 'common/constants'

import { ACCOUNT_FEED_PROTECTION_REQUEST } from 'actions'
import { ACCOUNT_FEED_PROTECTION_SUCCESS } from 'actions'
import { ACCOUNT_FEED_PROTECTION_FAILURE } from 'actions'

import { ACCOUNT_CLEAR_REQUEST } from 'actions'
import { ACCOUNT_CLEAR_CONFIRM } from 'actions'
import { ACCOUNT_CLEAR_CANCEL } from 'actions'
import { ACCOUNT_CLEAR_SUCCESS } from 'actions'
import { ACCOUNT_CLEAR_FAILURE } from 'actions'

import { ACCOUNT_DELETE_REQUEST } from 'actions'
import { ACCOUNT_DELETE_CONFIRM } from 'actions'
import { ACCOUNT_DELETE_CANCEL } from 'actions'
import { ACCOUNT_DELETE_SUCCESS } from 'actions'
import { ACCOUNT_DELETE_FAILURE } from 'actions'
import { USER_SUCCESS } from 'actions'

const initialState = {
  deleteRequest: false,
  deleteRequestError: false,
  clearRequest: false,
  clearRequestError: false,
  clearRequestSuccess: true,
  rssProtected: true
}

/** ACTIONS
 --------------------------------------------------------------- */
export const rssProtect = (isOn) => ({ type: ACCOUNT_FEED_PROTECTION_REQUEST, isOn })

export const accountDelete = () => ({ type: ACCOUNT_DELETE_REQUEST })
export const accountDeleteError = (err) => ({ type: ACCOUNT_DELETE_FAILURE, err })
export const accountDeleteConfirm = () => ({ type: ACCOUNT_DELETE_CONFIRM })
export const accountDeleteCancel = () => ({ type: ACCOUNT_DELETE_CANCEL })

export const accountClear = () => ({ type: ACCOUNT_CLEAR_REQUEST })
export const accountClearError = (err) => ({ type: ACCOUNT_CLEAR_FAILURE, err })
export const accountClearConfirm = () => ({ type: ACCOUNT_CLEAR_CONFIRM })
export const accountClearCancel = () => ({ type: ACCOUNT_CLEAR_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
export const userPrivacyReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS: {
      const { user } = action
      const rssProtected = user?.feed_protected === '1'
      return { ...state, rssProtected }
    }

    case ACCOUNT_CLEAR_REQUEST: {
      return { ...state, clearRequest: true, clearRequestSuccess: false }
    }

    case ACCOUNT_CLEAR_CANCEL: {
      return { ...state, clearRequest: false, clearRequestSuccess: false }
    }

    case ACCOUNT_CLEAR_SUCCESS: {
      return { ...state, clearRequest: true, clearRequestSuccess: true }
    }

    case ACCOUNT_CLEAR_FAILURE: {
      const { err } = action
      return { ...state, clearRequestError: err }
    }

    case ACCOUNT_DELETE_REQUEST: {
      return { ...state, deleteRequest: true }
    }

    case ACCOUNT_DELETE_CANCEL: {
      return { ...state, deleteRequest: false }
    }

    case ACCOUNT_DELETE_FAILURE: {
      const { err } = action
      return { ...state, deleteRequestError: err }
    }

    case ACCOUNT_FEED_PROTECTION_REQUEST: {
      const { isOn } = action
      return { ...state, rssProtected: isOn }
    }

    case ACCOUNT_FEED_PROTECTION_FAILURE: {
      return { ...state, rssProtected: !state.rssProtected }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userPrivacySagas = [
  takeLatest(ACCOUNT_DELETE_CONFIRM, accountDeleteProcess),
  takeLatest(ACCOUNT_CLEAR_CONFIRM, accountClearProcess),
  takeLatest(ACCOUNT_FEED_PROTECTION_REQUEST, accountRSSProtectProcess)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* accountDeleteProcess() {
  const response = yield call(deleteAccount)
  const { status, error } = response

  if (status === 1) {
    document.location.href = `${LOGIN_URL}?src=web-delete-success&utm_source=${global.location.href}`
    return yield put({ type: ACCOUNT_DELETE_SUCCESS })
  }

  yield put({ type: ACCOUNT_DELETE_FAILURE, err: error })
}

function* accountClearProcess() {
  const response = yield call(clearAccount)
  const { status, error } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_CLEAR_SUCCESS })
  }

  yield put({ type: ACCOUNT_CLEAR_FAILURE, err: error })
}

function* accountRSSProtectProcess(action) {
  const { isOn } = action
  const response = yield call(setRssProtection, isOn)
  const { status, error } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_FEED_PROTECTION_SUCCESS })
  }

  yield put({ type: ACCOUNT_FEED_PROTECTION_FAILURE, err: error })
}
