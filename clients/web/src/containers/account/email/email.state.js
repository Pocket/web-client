import { put, takeLatest, call } from 'redux-saga/effects'

import { putAccountChange, addEmailAlias, removeEmailAlias } from 'common/api/_legacy/account'
import { resendConfirmation } from 'common/api/_legacy/account'

import { USER_SUCCESS } from 'actions'
import { ACCOUNT_EMAIL_UPDATE_REQUEST } from 'actions'
import { ACCOUNT_EMAIL_UPDATE_CONFIRM } from 'actions'
import { ACCOUNT_EMAIL_UPDATE_CANCEL } from 'actions'
import { ACCOUNT_EMAIL_UPDATE_SUCCESS } from 'actions'
import { ACCOUNT_EMAIL_UPDATE_FAILURE } from 'actions'
import { ACCOUNT_EMAIL_RESEND_CONFIRMATION } from 'actions'

import { ACCOUNT_EMAIL_ALIAS_ADD_REQUEST } from 'actions'
import { ACCOUNT_EMAIL_ALIAS_ADD_SUCCESS } from 'actions'
import { ACCOUNT_EMAIL_ALIAS_ADD_FAILURE } from 'actions'
import { ACCOUNT_EMAIL_ALIAS_REMOVE_REQUEST } from 'actions'
import { ACCOUNT_EMAIL_ALIAS_REMOVE_SUCCESS } from 'actions'
import { ACCOUNT_EMAIL_ALIAS_REMOVE_FAILURE } from 'actions'

const initialState = {
  updating: false
}

/** ACTIONS
 --------------------------------------------------------------- */
export const updatePrimaryEmail = () => ({ type: ACCOUNT_EMAIL_UPDATE_REQUEST })
export const confirmPrimaryEmailUpdate = (email, password) => ({type: ACCOUNT_EMAIL_UPDATE_CONFIRM, email, password}) //prettier-ignore
export const cancelPrimaryEmailUpdate = () => ({ type: ACCOUNT_EMAIL_UPDATE_CANCEL })
export const addEmailAliasRequest = (email) => ({ type: ACCOUNT_EMAIL_ALIAS_ADD_REQUEST, email })
export const removeEmailAliasRequest = (email) => ({  type: ACCOUNT_EMAIL_ALIAS_REMOVE_REQUEST,  email }) //prettier-ignore
export const resendEmailConfirmation = (email) => ({ type: ACCOUNT_EMAIL_RESEND_CONFIRMATION, email }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
export const userEmailReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS: {
      const { email, aliases } = action
      return { ...state, email, aliases }
    }

    case ACCOUNT_EMAIL_UPDATE_REQUEST: {
      return { ...state, updating: true }
    }

    case ACCOUNT_EMAIL_UPDATE_CANCEL: {
      return { ...state, updating: false }
    }

    case ACCOUNT_EMAIL_UPDATE_SUCCESS: {
      return { ...state, updating: false }
    }

    case ACCOUNT_EMAIL_UPDATE_FAILURE: {
      const { err } = action
      return { ...state, updateEmailError: err }
    }

    case ACCOUNT_EMAIL_ALIAS_ADD_SUCCESS: {
      const { email } = action
      const aliasObject = { [email]: { email, confirmed: '0' } }
      return { ...state, aliasError: false, aliases: { ...state.aliases, ...aliasObject } }
    }

    case ACCOUNT_EMAIL_ALIAS_ADD_FAILURE: {
      const { err } = action
      return { ...state, aliasError: err }
    }

    case ACCOUNT_EMAIL_ALIAS_REMOVE_SUCCESS: {
      const { email } = action
      const aliasesDraft = JSON.parse(JSON.stringify(state.aliases))
      delete aliasesDraft[email]
      return { ...state, aliases: aliasesDraft }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userEmailSagas = [
  takeLatest(ACCOUNT_EMAIL_UPDATE_CONFIRM, accountEmailUpdate),
  takeLatest(ACCOUNT_EMAIL_ALIAS_ADD_REQUEST, accountAliasAdd),
  takeLatest(ACCOUNT_EMAIL_ALIAS_REMOVE_REQUEST, accountAliasRemove),
  takeLatest(ACCOUNT_EMAIL_RESEND_CONFIRMATION, accountConfirmResend)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
// const getUserDetails = (state) => state.user

function* accountEmailUpdate(action) {
  const { email: newemail, password } = action

  const { status, error } = yield call(putAccountChange, {
    password,
    newemail
  })

  if (status === 1) {
    return yield put({ type: ACCOUNT_EMAIL_UPDATE_SUCCESS })
  }

  yield put({ type: ACCOUNT_EMAIL_UPDATE_FAILURE, err: error })
}

function* accountAliasAdd(action) {
  const { email } = action

  const { status, error } = yield call(addEmailAlias, { email })

  if (status === 1) {
    return yield put({ type: ACCOUNT_EMAIL_ALIAS_ADD_SUCCESS, email })
  }

  yield put({ type: ACCOUNT_EMAIL_ALIAS_ADD_FAILURE, err: error })
}

function* accountAliasRemove(action) {
  const { email } = action

  const { status, error } = yield call(removeEmailAlias, { email })

  if (status === 1) {
    return yield put({ type: ACCOUNT_EMAIL_ALIAS_REMOVE_SUCCESS, email })
  }

  yield put({ type: ACCOUNT_EMAIL_ALIAS_REMOVE_FAILURE, err: error })
}

function* accountConfirmResend(action) {
  const { email } = action

  yield call(resendConfirmation, { email })
}
