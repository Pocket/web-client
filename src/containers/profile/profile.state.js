import { put, call, takeEvery } from 'redux-saga/effects'
import { getUserProfile } from 'common/api/_legacy/profile'
import { sendItemActions } from 'common/api/_legacy/item-actions'

import { API_ACTION_FOLLOW_USER } from 'common/constants'
import { API_ACTION_UNFOLLOW_USER } from 'common/constants'

import { GET_PROFILE_REQUEST } from 'actions'
import { GET_PROFILE_SUCCESS } from 'actions'
import { GET_PROFILE_FAILURE } from 'actions'

import { FOLLOW_PROFILE_REQUEST } from 'actions'
import { FOLLOW_PROFILE_SUCCESS } from 'actions'
import { FOLLOW_PROFILE_FAILURE } from 'actions'

import { UNFOLLOW_PROFILE_REQUEST } from 'actions'
import { UNFOLLOW_PROFILE_SUCCESS } from 'actions'
import { UNFOLLOW_PROFILE_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getProfile = (id) => ({ type: GET_PROFILE_REQUEST, id })
export const followUser = (id) => ({ type: FOLLOW_PROFILE_REQUEST, id })
export const unFollowUser = (id) => ({ type: UNFOLLOW_PROFILE_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      const { profile } = action
      return { ...state, ...profile }

    case FOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        is_following: 1
      }

    case UNFOLLOW_PROFILE_SUCCESS:
      return {
        ...state,
        is_following: 0
      }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const profileSagas = [
  takeEvery(GET_PROFILE_REQUEST, getProfileRequest),
  takeEvery(FOLLOW_PROFILE_REQUEST, followProfileRequest),
  takeEvery(UNFOLLOW_PROFILE_REQUEST, unFollowProfileRequest)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* getProfileRequest({ id }) {
  try {
    const { profile, error } = yield getUserProfile(id)
    if (error) throw new Error('Cannot get profile')

    yield put({ type: GET_PROFILE_SUCCESS, profile })
  } catch (error) {
    yield put({ type: GET_PROFILE_FAILURE, error })
  }
}

function* followProfileRequest({ id }) {
  try {
    const actions = [{ action: API_ACTION_FOLLOW_USER, user_list: [id] }]
    const data = yield call(sendItemActions, actions)

    if (data?.status !== 1) throw new Error('Unable to Follow User')

    yield put({ type: FOLLOW_PROFILE_SUCCESS })
  } catch (error) {
    yield put({ type: FOLLOW_PROFILE_FAILURE, error })
  }
}

function* unFollowProfileRequest({ id }) {
  try {
    const actions = [{ action: API_ACTION_UNFOLLOW_USER, user_list: [id] }]
    const data = yield call(sendItemActions, actions)

    if (data?.status !== 1) throw new Error('Unable to UnFollow User')

    yield put({ type: UNFOLLOW_PROFILE_SUCCESS })
  } catch (error) {
    yield put({ type: UNFOLLOW_PROFILE_FAILURE, error })
  }
}
