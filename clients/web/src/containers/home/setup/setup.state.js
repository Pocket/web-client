import { put, takeEvery, call, select } from 'redux-saga/effects'
import { getTopicSelectors as getTopicSelectorsApi } from 'common/api/queries/get-topic-selectors'
import { setTopicPreferences } from 'common/api/mutations/setTopicPreferences'
import { destroyCookie, setCookie } from 'nookies'

import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { SETTINGS_UPDATE } from 'actions'

import { HOME_SET_STORED_USER_TOPICS } from 'actions'

import { HOME_SETUP_SET_STATUS } from 'actions'

import { HOME_TOPIC_SELECTORS_REQUEST } from 'actions'
import { HOME_TOPIC_SELECTORS_SUCCESS } from 'actions'

import { HOME_SETUP_SELECT_TOPIC } from 'actions'
import { HOME_SETUP_DESELECT_TOPIC } from 'actions'
import { HOME_SETUP_CANCEL_SELECTION } from 'actions'
import { HOME_SETUP_FINALIZE_TOPICS } from 'actions'
import { HOME_SETUP_RESELECT_TOPICS } from 'actions'
import { HOME_SETUP_UPDATE_TOPICS } from 'actions'

import { HOME_SETUP_RESET } from 'actions'
import { HOME_COOKIE_RESET } from 'actions'

import { SET_TOPIC_SUCCESS } from 'actions'
import { SET_TOPIC_FAILURE } from 'actions'

import { HOME_SAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getTopicSelectors = () => ({ type: HOME_TOPIC_SELECTORS_REQUEST })
export const setStoredUserTopics = (userTopics) => ({ type: HOME_SET_STORED_USER_TOPICS, userTopics }) //prettier-ignore
export const setSetupStatus = (setupStatus) => ({ type: HOME_SETUP_SET_STATUS, setupStatus })
export const selectTopic = (topic) => ({ type: HOME_SETUP_SELECT_TOPIC, topic })
export const deSelectTopic = (topic) => ({ type: HOME_SETUP_DESELECT_TOPIC, topic })
export const cancelTopicSelection = () => ({ type: HOME_SETUP_CANCEL_SELECTION })
export const finalizeTopics = (locale) => ({ type: HOME_SETUP_FINALIZE_TOPICS, locale })
export const reSelectTopics = () => ({ type: HOME_SETUP_RESELECT_TOPICS })
export const resetSetupMoment = () => ({ type: HOME_SETUP_RESET })
export const resetTopicsCookie = () => ({ type: HOME_COOKIE_RESET })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  setupStatus: false,
  topicsSelectors: [],
  userTopics: [],
  storedTopicsReady: false,
  finalizedTopics: false,
  prevStatus: null,
  prevTopics: null
}

export const homeSetupReducers = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_FETCH_SUCCESS: {
      const { settings } = action
      const { setupStatus = false, userTopics = [] } = settings
      return { ...state, userTopics, setupStatus, storedTopicsReady: true, finalizedTopics: true }
    }

    case HOME_SET_STORED_USER_TOPICS: {
      const { userTopics } = action
      return { ...state, userTopics, storedTopicsReady: true, finalizedTopics: true }
    }

    case HOME_SETUP_FINALIZE_TOPICS: {
      return { ...state, finalizedTopics: true, setupStatus: 'complete' }
    }

    case HOME_SETUP_SET_STATUS: {
      const { setupStatus } = action
      return { ...state, setupStatus }
    }

    case HOME_SETUP_SELECT_TOPIC:
    case HOME_SETUP_DESELECT_TOPIC: {
      return { ...state, finalizedTopics: false }
    }

    case HOME_SETUP_CANCEL_SELECTION: {
      return {
        ...state,
        finalizedTopics: true,
        setupStatus: state.prevStatus,
        userTopics: state.prevTopics,
        prevStatus: null,
        prevTopics: null
      }
    }

    case HOME_SETUP_RESELECT_TOPICS: {
      return {
        ...state,
        finalizedTopics: false,
        setupStatus: 'reselect',
        prevStatus: state.setupStatus,
        prevTopics: state.userTopics
      }
    }

    case HOME_SETUP_UPDATE_TOPICS: {
      const { userTopics } = action
      return { ...state, userTopics }
    }

    case HOME_TOPIC_SELECTORS_SUCCESS: {
      const { topicsSelectors } = action
      return { ...state, topicsSelectors }
    }

    case HOME_SAVE_REQUEST: {
      const setupStatus = state.setupStatus || 'skipped'
      return { ...state, setupStatus }
    }

    case HOME_SETUP_RESET:
    case HOME_COOKIE_RESET: {
      return { ...state, setupStatus: false, userTopics: [] }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { getStarted } = action.payload
      return { ...state, ...getStarted }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeSetupSagas = [
  takeEvery(HOME_TOPIC_SELECTORS_REQUEST, requestTopicSelectors),
  takeEvery(HOME_SETUP_SELECT_TOPIC, selectTopics),
  takeEvery(HOME_SETUP_DESELECT_TOPIC, deSelectTopics),
  takeEvery(HOME_SETUP_FINALIZE_TOPICS, finalizeTopicSelection),
  takeEvery(HOME_SET_STORED_USER_TOPICS, clearUserTopicsCookie),
  takeEvery(
    [
      HOME_SETUP_SET_STATUS,
      HOME_SETUP_RESET,
      HOME_COOKIE_RESET,
      HOME_SET_STORED_USER_TOPICS,
      SET_TOPIC_SUCCESS
    ],
    saveSettings
  ),
  takeEvery(HOME_COOKIE_RESET, storeUserTopics)
]

/** SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getUserTopics = (state) => state.homeSetup.userTopics
const getAllTopicsSelectors = (state) => state.homeSetup.topicsSelectors

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* requestTopicSelectors() {
  try {
    const topicsSelectors = yield call(fetchTopicSelectorList)
    yield put({ type: HOME_TOPIC_SELECTORS_SUCCESS, topicsSelectors })
  } catch (error) {
    console.warn(error)
  }
}

function* selectTopics(action) {
  const { topic } = action
  const currentTopics = yield select(getUserTopics)
  const updatedTopics = new Set([...currentTopics, topic])
  const userTopics = Array.from(updatedTopics)
  yield put({ type: HOME_SETUP_UPDATE_TOPICS, userTopics })
}

function* deSelectTopics(action) {
  const { topic } = action
  const currentTopics = yield select(getUserTopics)
  const userTopics = currentTopics.filter((current) => current !== topic)
  yield put({ type: HOME_SETUP_UPDATE_TOPICS, userTopics })
}

function* finalizeTopicSelection({ locale }) {
  try {
    const topicSelectors = yield select(getAllTopicsSelectors) || []
    const currentTopics = yield select(getUserTopics) || []

    // This is in place so we can store plain names in the cookies (as opposed to topic ids)
    // This means the topic ids that drive the data are free to change and experiment with
    const preferredTopics = topicSelectors
      .filter((topic) => currentTopics.includes(topic.name))
      .map((topic) => ({ id: topic.id }))

    const { errors } = yield call(setTopicPreferences, preferredTopics)
    if (errors) throw new Error(errors[0].message)

    yield put({ type: SET_TOPIC_SUCCESS, locale })
  } catch {
    yield put({ type: SET_TOPIC_FAILURE })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

export async function fetchTopicSelectorList() {
  try {
    const topicsSelectors = await getTopicSelectorsApi()
    return topicsSelectors
  } catch (error) {
    console.warn('home.setup', error)
  }
}

// Clear topic selection from local-storage so we can maintain in settings
function clearUserTopicsCookie() {
  destroyCookie(null, 'getStartedUserTopics')
}

function storeUserTopics() {
  const userTopics = ['Entertainment', 'Food', 'Politics']
  const yearInMs = 60 * 60 * 24 * 365
  // Set topic selection in local-storage so we can maintain state on refresh
  setCookie(null, 'getStartedUserTopics', JSON.stringify(userTopics), {
    sameSite: 'lax',
    path: '/',
    maxAge: yearInMs
  })
}

function* saveSettings() {
  yield put({ type: SETTINGS_UPDATE })
}
