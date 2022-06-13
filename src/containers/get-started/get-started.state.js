import { put, takeEvery, call, select } from 'redux-saga/effects'
import { getTopicSelectors as getTopicSelectorsApi } from 'common/api'
import { getSetupSlate } from 'common/api'
import { setTopicPreferences } from 'common/api'
import { deriveCorpusItem } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities'
import { itemUpsert } from 'common/api'
import { setCookie } from 'nookies'

import { GET_STARTED_HYDRATE } from 'actions'
import { GET_STARTED_SELECT_TOPIC } from 'actions'
import { GET_STARTED_DESELECT_TOPIC } from 'actions'
import { GET_STARTED_UPDATE_TOPICS } from 'actions'
import { GET_STARTED_FINALIZE_TOPICS } from 'actions'
import { GET_STARTED_RESELECT_TOPICS } from 'actions'
import { GET_STARTED_ARTICLES_REQUEST } from 'actions'
import { GET_STARTED_ARTICLES_SUCCESS } from 'actions'
import { GET_STARTED_ARTICLES_FAILURE } from 'actions'
import { GET_STARTED_SAVE_REQUEST } from 'actions'
import { GET_STARTED_SAVE_SUCCESS } from 'actions'
import { GET_STARTED_SAVE_FAILURE } from 'actions'
import { GET_STARTED_CLEAR_SAVED_ARTICLE } from 'actions'
import { GET_STARTED_GET_TOPIC_SELECTORS } from 'actions'
import { SET_TOPIC_REQUEST } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'
import { SET_TOPIC_FAILURE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateGetStarted = (getStartedState) => ({ type: GET_STARTED_HYDRATE, getStartedState }) //prettier-ignore
export const getTopicSelectors = () => ({ type: GET_STARTED_GET_TOPIC_SELECTORS })
export const getArticleSelectors = () => ({ type: GET_STARTED_ARTICLES_REQUEST })
export const selectTopic = (topic) => ({ type: GET_STARTED_SELECT_TOPIC, topic })
export const deSelectTopic = (topic) => ({ type: GET_STARTED_DESELECT_TOPIC, topic })
export const finalizeTopics = () => ({ type: GET_STARTED_FINALIZE_TOPICS })
export const reSelectTopics = () => ({ type: GET_STARTED_RESELECT_TOPICS })
export const clearSavedArticle = () => ({ type: GET_STARTED_CLEAR_SAVED_ARTICLE })
export const saveArticle = (url) => ({ type: GET_STARTED_SAVE_REQUEST, url })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  topicsSelectors: [],
  userTopics: [],
  articlesById: {},
  articles: [],
  savedArticleId: false,
  finalizingTopics: false
}

export const getStartedReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTED_HYDRATE: {
      const { getStartedState } = action
      return { ...state, ...getStartedState }
    }

    case GET_STARTED_RESELECT_TOPICS: {
      return { ...state, savedArticleId: false }
    }

    case GET_STARTED_UPDATE_TOPICS: {
      const { userTopics } = action
      return { ...state, userTopics }
    }

    case GET_STARTED_FINALIZE_TOPICS: {
      return { ...state, finalizingTopics: true }
    }

    case SET_TOPIC_SUCCESS:
    case SET_TOPIC_FAILURE: {
      // We are moving forward regardless of topic profile success at this point
      return { ...state, finalizingTopics: false }
    }

    case GET_STARTED_ARTICLES_SUCCESS: {
      const { itemsById, items } = action
      return { ...state, articlesById: itemsById, articles: items }
    }

    case GET_STARTED_SAVE_SUCCESS: {
      const { id } = action
      const article = state.articlesById[id]
      return {
        ...state,
        articlesById: { ...state.articlesById, [id]: { ...article, saveStatus: 'saved' } },
        savedArticleId: id
      }
    }

    case GET_STARTED_CLEAR_SAVED_ARTICLE: {
      return { ...state, savedArticleId: false }
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
export const getStartedSagas = [
  takeEvery(GET_STARTED_GET_TOPIC_SELECTORS, requestTopicSelectors),
  takeEvery(GET_STARTED_SELECT_TOPIC, selectTopics),
  takeEvery(GET_STARTED_DESELECT_TOPIC, deSelectTopics),
  takeEvery(GET_STARTED_FINALIZE_TOPICS, finalizeTopicSelection),
  takeEvery(GET_STARTED_ARTICLES_REQUEST, getTopicArticles),
  takeEvery(GET_STARTED_SAVE_REQUEST, getStartedSaveRequest)
]

/** SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getUserTopics = (state) => state.getStarted.userTopics
const getAllTopicsSelectors = (state) => state.getStarted.topicsSelectors

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* requestTopicSelectors() {
  const topicsSelectors = yield call(fetchTopicSelectorList)
  yield put({ type: GET_STARTED_HYDRATE, getStartedState: { topicsSelectors } })
}

function* selectTopics(action) {
  const { topic } = action
  const currentTopics = yield select(getUserTopics)
  const updatedTopics = new Set([...currentTopics, topic])
  const userTopics = Array.from(updatedTopics)
  storeUserTopics(userTopics)
  yield put({ type: GET_STARTED_UPDATE_TOPICS, userTopics })
}

function* deSelectTopics(action) {
  const { topic } = action
  const currentTopics = yield select(getUserTopics)
  const userTopics = currentTopics.filter((current) => current !== topic)
  storeUserTopics(userTopics)
  yield put({ type: GET_STARTED_UPDATE_TOPICS, userTopics })
}

function* finalizeTopicSelection() {
  try {
    const topicSelectors = yield select(getAllTopicsSelectors) || []
    const currentTopics = yield select(getUserTopics) || []

    const preferredTopics = topicSelectors
      .filter((topic) => currentTopics.includes(topic.name))
      .map((topic) => ({ id: topic.id }))

    const { errors } = yield call(setTopicPreferences, preferredTopics)
    if (errors) throw new Error(errors[0].message)

    yield put({ type: SET_TOPIC_SUCCESS })
  } catch (error) {
    yield put({ type: SET_TOPIC_FAILURE })
  }
}

function* getTopicArticles() {
  try {
    // Get articles for selection
    const { recommendations } = yield call(getSetupSlate)
    const derivedRecommendations = recommendations.map((rec) => deriveCorpusItem(rec))
    const itemsById = arrayToObject(derivedRecommendations, 'id')
    const items = Object.keys(itemsById)

    yield put({ type: GET_STARTED_ARTICLES_SUCCESS, itemsById, items })
  } catch (error) {
    yield put({ type: GET_STARTED_ARTICLES_FAILURE })
  }
}

function* getStartedSaveRequest(action) {
  try {
    const { url } = action

    const upsertResponse = yield call(itemUpsert, url)
    const { id } = upsertResponse
    yield put({ type: GET_STARTED_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: GET_STARTED_SAVE_FAILURE })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchTopicSelections
 */
export async function fetchTopicSelectorList() {
  try {
    const topicsSelectors = await getTopicSelectorsApi()
    return topicsSelectors
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}

function storeUserTopics(userTopics) {
  const yearInMs = 60 * 60 * 24 * 365
  // Set topic selection in local-storage so we can maintain state on refresh
  setCookie(null, 'getStartedUserTopics', JSON.stringify(userTopics), {
    sameSite: 'lax',
    path: '/',
    maxAge: yearInMs
  })
}
