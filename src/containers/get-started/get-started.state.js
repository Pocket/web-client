import { put, takeEvery, call, select } from 'redux-saga/effects'
import { getTopicSelectors } from 'common/api'
import { getTopicMix } from 'common/api'
import { getSlate } from 'common/api' // this will be swaped for the ML slate
import { deriveRecommendation } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities'
import { itemUpsert } from 'common/api'
import { getRecsById } from 'common/api/derivers/lineups'

import { GET_STARTED_TOPIC_SELECTORS_REQUEST } from 'actions'
import { GET_STARTED_TOPIC_SELECTORS_SUCCESS } from 'actions'
import { GET_STARTED_TOPIC_SELECTORS_HYDRATE } from 'actions'
import { GET_STARTED_SELECT_TOPIC } from 'actions'
import { GET_STARTED_DESELECT_TOPIC } from 'actions'
import { GET_STARTED_FINALIZE_TOPICS } from 'actions'
import { GET_STARTED_RESELECT_TOPICS } from 'actions'
import { GET_STARTED_ARTICLES_SUCCESS } from 'actions'
import { GET_STARTED_ARTICLES_FAILURE } from 'actions'
import { GET_STARTED_SAVE_REQUEST } from 'actions'
import { GET_STARTED_SAVE_SUCCESS } from 'actions'
import { GET_STARTED_SAVE_FAILURE } from 'actions'
import { GET_STARTED_CLEAR_SAVED_ARTICLE } from 'actions'
import { GET_STARTED_HOME_BLOCK } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateTopicSelectors = (topicsSelectors) => ({ type: GET_STARTED_TOPIC_SELECTORS_HYDRATE, topicsSelectors }) //prettier-ignore
export const selectTopic = (topic) => ({ type: GET_STARTED_SELECT_TOPIC, topic })
export const deSelectTopic = (topic) => ({ type: GET_STARTED_DESELECT_TOPIC, topic })
export const finalizeTopics = () => ({ type: GET_STARTED_FINALIZE_TOPICS })
export const reSelectTopics = () => ({ type: GET_STARTED_RESELECT_TOPICS })
export const clearSavedArticle = () => ({ type: GET_STARTED_CLEAR_SAVED_ARTICLE })
export const saveArticle = (url) => ({ type: GET_STARTED_SAVE_REQUEST, url })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  topicsSelectors: {},
  userTopics: [],
  articlesById: {},
  articles: [],
  positionInFlow: 0,
  savedArticleId: false
}

export const getStartedReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTED_TOPIC_SELECTORS_HYDRATE: {
      const { topicsSelectors } = action
      return { ...state, topicsSelectors }
    }

    case GET_STARTED_RESELECT_TOPICS: {
      return { ...state, positionInFlow: 0, savedArticleId: false }
    }

    case GET_STARTED_SELECT_TOPIC: {
      const { topic } = action
      const updatedTopics = new Set([...state.userTopics, topic])
      const userTopics = Array.from(updatedTopics)
      return { ...state, userTopics }
    }
    case GET_STARTED_DESELECT_TOPIC: {
      const { topic } = action
      const userTopics = state.userTopics.filter((current) => current !== topic)
      return { ...state, userTopics }
    }

    case GET_STARTED_FINALIZE_TOPICS: {
      return { ...state, positionInFlow: 1 }
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
      return { ...state, savedArticleId: false, positionInFlow: 1 }
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
  takeEvery(GET_STARTED_FINALIZE_TOPICS, getArticlesForSelection),
  takeEvery(GET_STARTED_ARTICLES_SUCCESS, getTopicsForHome),
  takeEvery(GET_STARTED_SAVE_REQUEST, getStartedSaveRequest)
]

/** SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getSelectedTopics = (state) => {
  const userTopics = state.getStarted.userTopics
  const topicsSelectors = state.getStarted.topicsSelectors
  return topicsSelectors.filter((topic) => userTopics.includes(topic.name))
}

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getArticlesForSelection() {
  try {
    const articleSlate = '2f2a3568-901f-4655-8735-daf67e8ecc5d' //in case you missed it
    const { recommendations } = yield call(getSlate, articleSlate, 3)
    const derivedRecommendations = recommendations.map((rec) => deriveRecommendation(rec))
    const itemsById = arrayToObject(derivedRecommendations, 'itemId')
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

function* getTopicsForHome() {
  const topics = yield select(getSelectedTopics)
  const topicRecs = yield call(getTopicMix, topics)
  const itemsById = getRecsById(Object.values(topicRecs))
  const recsByTopic = Object.keys(itemsById)
  yield put({ type: GET_STARTED_HOME_BLOCK, itemsById, recsByTopic })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchTopicSelections
 */
export async function fetchTopicSelectorList() {
  try {
    const response = await getTopicSelectors()
    if (!response?.getTopicSelectors?.data) return { error: 'No Items Returned' }

    // Leaving this form factor since we will need to destructure a graph response
    const topicsSelectors = response?.getTopicSelectors?.data.filter((topic) => topic.inSelection)
    return { topicsSelectors }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}
