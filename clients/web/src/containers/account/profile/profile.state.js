import { put, takeLatest, select, delay, call } from 'redux-saga/effects'
import { putAccountChange, setAvatar } from 'common/api/_legacy/account'
import { LOGIN_URL } from 'common/constants'
import { USER_SUCCESS } from 'actions'

import { ACCOUNT_FIRST_NAME_UPDATE } from 'actions'
import { ACCOUNT_LAST_NAME_UPDATE } from 'actions'
import { ACCOUNT_BIO_UPDATE } from 'actions'

import { ACCOUNT_DETAIL_UPDATE_SUCCESS } from 'actions'
import { ACCOUNT_DETAIL_UPDATE_FAILURE } from 'actions'

import { ACCOUNT_AVATAR_UPDATE_REQUEST } from 'actions'
import { ACCOUNT_AVATAR_UPDATE_CANCEL } from 'actions'
import { ACCOUNT_AVATAR_UPDATE_CONFIRM } from 'actions'
import { ACCOUNT_AVATAR_UPDATE_SUCCESS } from 'actions'
import { ACCOUNT_AVATAR_UPDATE_FAILURE } from 'actions'

import { ACCOUNT_USERNAME_UPDATE_REQUEST } from 'actions'
import { ACCOUNT_USERNAME_UPDATE_CONFIRM } from 'actions'
import { ACCOUNT_USERNAME_UPDATE_CANCEL } from 'actions'
import { ACCOUNT_USERNAME_UPDATE_SUCCESS } from 'actions'
import { ACCOUNT_USERNAME_UPDATE_FAILURE } from 'actions'

import { ACCOUNT_PASSWORD_UPDATE_REQUEST } from 'actions'
import { ACCOUNT_PASSWORD_UPDATE_CONFIRM } from 'actions'
import { ACCOUNT_PASSWORD_UPDATE_CANCEL } from 'actions'
import { ACCOUNT_PASSWORD_UPDATE_SUCCESS } from 'actions'
import { ACCOUNT_PASSWORD_UPDATE_FAILURE } from 'actions'

const initialState = {
  updatingDetailsError: false,
  updatingAvatar: false,
  updatingAvatarError: false,
  updatingPassword: false,
  updatingPasswordError: false,
  updatingUsername: false,
  updatingUsernameError: false
}

/** ACTIONS
 --------------------------------------------------------------- */
export const updateFirstName = (value) => ({ type: ACCOUNT_FIRST_NAME_UPDATE, value}) //prettier-ignore
export const updateLastName = (value) => ({ type: ACCOUNT_LAST_NAME_UPDATE, value })
export const updateBio = (value) => ({ type: ACCOUNT_BIO_UPDATE, value })

export const updateAvatar = () => ({ type: ACCOUNT_AVATAR_UPDATE_REQUEST })
export const updateAvatarError = (err) => ({ type: ACCOUNT_AVATAR_UPDATE_FAILURE, err })
export const confirmAvatarUpdate = (data) => ({ type: ACCOUNT_AVATAR_UPDATE_CONFIRM, data })
export const cancelAvatarUpdate = () => ({ type: ACCOUNT_AVATAR_UPDATE_CANCEL })

export const updatePassword = () => ({ type: ACCOUNT_PASSWORD_UPDATE_REQUEST })
export const confirmPasswordUpdate = (newpassword, oldpassword) => ({ type: ACCOUNT_PASSWORD_UPDATE_CONFIRM, newpassword, oldpassword}) //prettier-ignore
export const cancelPasswordUpdate = () => ({ type: ACCOUNT_PASSWORD_UPDATE_CANCEL })
export const setPasswordError = (err) => ({ type: ACCOUNT_PASSWORD_UPDATE_FAILURE, err })

export const updateUsername = () => ({ type: ACCOUNT_USERNAME_UPDATE_REQUEST })
export const confirmUsernameUpdate = (username, password) => ({ type: ACCOUNT_USERNAME_UPDATE_CONFIRM, username, password }) //prettier-ignore
export const cancelUsernameUpdate = () => ({ type: ACCOUNT_USERNAME_UPDATE_CANCEL })
export const setUsernameError = (err) => ({ type: ACCOUNT_USERNAME_UPDATE_FAILURE, err })

/** REDUCERS
 --------------------------------------------------------------- */
export const userProfileReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS: {
      const { profile } = action
      return { ...state, ...profile }
    }

    case ACCOUNT_FIRST_NAME_UPDATE: {
      const { value } = action
      return { ...state, first_name: value }
    }

    case ACCOUNT_LAST_NAME_UPDATE: {
      const { value } = action
      return { ...state, last_name: value }
    }

    case ACCOUNT_BIO_UPDATE: {
      const { value } = action
      return { ...state, description: value }
    }

    case ACCOUNT_DETAIL_UPDATE_SUCCESS: {
      return { ...state, updatingDetailsError: false }
    }

    case ACCOUNT_DETAIL_UPDATE_FAILURE: {
      const { err } = action
      return { ...state, updatingDetailsError: err }
    }

    case ACCOUNT_AVATAR_UPDATE_REQUEST: {
      return { ...state, updatingAvatar: true }
    }

    case ACCOUNT_AVATAR_UPDATE_CANCEL: {
      return { ...state, updatingAvatar: false }
    }

    case ACCOUNT_AVATAR_UPDATE_SUCCESS: {
      const { url } = action
      return { ...state, updatingAvatar: false, avatar_url: url }
    }

    case ACCOUNT_AVATAR_UPDATE_FAILURE: {
      const { err } = action
      return { ...state, updatingAvatarError: err }
    }

    case ACCOUNT_PASSWORD_UPDATE_REQUEST: {
      return { ...state, updatingPassword: true }
    }

    case ACCOUNT_PASSWORD_UPDATE_CANCEL: {
      return { ...state, updatingPassword: false }
    }

    case ACCOUNT_PASSWORD_UPDATE_FAILURE: {
      const { err } = action
      return { ...state, updatingPasswordError: err }
    }

    case ACCOUNT_PASSWORD_UPDATE_SUCCESS: {
      return { ...state, updatingPasswordError: false, updatingPassword: false }
    }

    case ACCOUNT_USERNAME_UPDATE_REQUEST: {
      return { ...state, updatingUsername: true }
    }

    case ACCOUNT_USERNAME_UPDATE_SUCCESS: {
      return { ...state, updatingUsernameError: false, updatingUsername: false }
    }

    case ACCOUNT_USERNAME_UPDATE_FAILURE: {
      const { err } = action
      return { ...state, updatingUsernameError: err }
    }

    case ACCOUNT_USERNAME_UPDATE_CANCEL: {
      return { ...state, updatingUsername: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userProfileSagas = [
  takeLatest(ACCOUNT_FIRST_NAME_UPDATE, accountDetailsUpdate),
  takeLatest(ACCOUNT_LAST_NAME_UPDATE, accountDetailsUpdate),
  takeLatest(ACCOUNT_BIO_UPDATE, accountDetailsUpdate),
  takeLatest(ACCOUNT_AVATAR_UPDATE_CONFIRM, accountAvatarUpdate),
  takeLatest(ACCOUNT_USERNAME_UPDATE_CONFIRM, accountUsernameUpdate),
  takeLatest(ACCOUNT_PASSWORD_UPDATE_CONFIRM, accountPasswordUpdate)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getUserDetails = (state) => state.userProfile

function* accountDetailsUpdate() {
  yield delay(1000)

  const userDetails = yield select(getUserDetails)
  const { first_name, last_name, description } = userDetails
  const { status, error } = yield call(putAccountChange, {
    newfirst_name: first_name,
    newlast_name: last_name,
    newbio: description
  })

  if (status === 1) return yield put({ type: ACCOUNT_DETAIL_UPDATE_SUCCESS })

  yield put({ type: ACCOUNT_DETAIL_UPDATE_FAILURE, err: error })
}

function* accountAvatarUpdate(action) {
  const { data } = action
  const response = yield call(setAvatar, data)
  if (response?.status === 1 && response?.url) {
    return yield put({ type: ACCOUNT_AVATAR_UPDATE_SUCCESS, url: response.url })
  }

  yield put({ type: ACCOUNT_AVATAR_UPDATE_FAILURE, err: response.xErrorCode })
}

function* accountUsernameUpdate(action) {
  const { username, password } = action
  const { status, error } = yield call(putAccountChange, {
    newusername: username,
    password
  })

  if (status === 1) {
    yield put({ type: ACCOUNT_USERNAME_UPDATE_SUCCESS })
    document.location.href = `${LOGIN_URL}?src=web-username-updated&utm_source=${global.location.href}`
    return
  }
  yield put({ type: ACCOUNT_USERNAME_UPDATE_FAILURE, err: error })
}

function* accountPasswordUpdate(action) {
  const { newpassword, oldpassword } = action

  const { status, error } = yield call(putAccountChange, {
    password: oldpassword,
    newpassword
  })

  if (status === 1) {
    yield put({ type: ACCOUNT_PASSWORD_UPDATE_SUCCESS })
    document.location.href = `${LOGIN_URL}?src=web-password-updated&utm_source=${global.location.href}`
    return
  }

  yield put({ type: ACCOUNT_PASSWORD_UPDATE_FAILURE, err: error })
}
