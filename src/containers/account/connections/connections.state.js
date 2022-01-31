import { put, takeLatest, call } from 'redux-saga/effects'

import {
  getConnectedServices,
  revokeConnectedServices
} from 'common/api/_legacy/connected-services'

import { ACCOUNT_GET_CONNECTIONS_REQUEST } from 'actions'
import { ACCOUNT_GET_CONNECTIONS_SUCCESS } from 'actions'
import { ACCOUNT_GET_CONNECTIONS_FAILURE } from 'actions'

import { ACCOUNT_CONNECTION_REVOKE_REQUEST } from 'actions'
import { ACCOUNT_CONNECTION_REVOKE_SUCCESS } from 'actions'
import { ACCOUNT_CONNECTION_REVOKE_FAILURE } from 'actions'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const getConnections = () => ({ type: ACCOUNT_GET_CONNECTIONS_REQUEST })
export const revokeConnection = (id, serviceType) => ({ type: ACCOUNT_CONNECTION_REVOKE_REQUEST, id, serviceType }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
export const userConnectedServicesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_GET_CONNECTIONS_SUCCESS: {
      const { data } = action
      return { ...state, ...data }
    }

    case ACCOUNT_CONNECTION_REVOKE_SUCCESS: {
      const { id, serviceType } = action
      const draftServices = state[serviceType].filter((service) => service !== id)

      const draftServicesById = state.servicesById
      delete draftServicesById[id]

      return { ...state, [serviceType]: draftServices, servicesById: draftServicesById }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userConnectedServicesSagas = [
  takeLatest(ACCOUNT_GET_CONNECTIONS_REQUEST, getConnectionData),
  takeLatest(ACCOUNT_CONNECTION_REVOKE_REQUEST, requestRevokeConnection)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getConnectionData() {
  const response = yield call(getConnectedServices)
  const { status, error, ...data } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_GET_CONNECTIONS_SUCCESS, data })
  }

  yield put({ type: ACCOUNT_GET_CONNECTIONS_FAILURE, err: error })
}

function* requestRevokeConnection(action) {
  const { id, serviceType } = action

  const data = buildRevokeData(id, serviceType)
  const response = yield call(revokeConnectedServices, data)
  const { status, error } = response

  if (status === 1) {
    return yield put({ type: ACCOUNT_CONNECTION_REVOKE_SUCCESS, id, serviceType })
  }

  yield put({ type: ACCOUNT_CONNECTION_REVOKE_FAILURE, err: error })
}

const buildRevokeData = (id, serviceType) => {
  if (serviceType === 'googleServices') return { remove_google: id }
  if (serviceType === 'socialServices') return { remove_social_service: id }
  return { remove: id }
}
