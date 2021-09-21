import { arrayToObject } from 'common/utilities'
import { getTopicList as apiTopicList } from 'common/api/topics'
import { TOPICLIST_HYDRATE } from 'actions'
import { TOPICLIST_SET_ACTIVE } from 'actions'
import { TOPICLIST_REQUEST } from 'actions'
import { TOPICLIST_SUCCESS } from 'actions'
import { TOPICLIST_FAILURE } from 'actions'
import { HYDRATE } from 'actions'
import { takeLatest, put, takeEvery } from 'redux-saga/effects'

/** ACTIONS
 --------------------------------------------------------------- */
export const getTopicList = () => ({ type: TOPICLIST_REQUEST })
export const hydrateTopicList = (hydrated) => ({ type: TOPICLIST_HYDRATE, hydrated }) /*prettier-ignore */
export const setActiveTopic = (topic) => ({ type: TOPICLIST_SET_ACTIVE, topic })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {
  activeTopic: '',
  topicsByName: {}
}

export const topicListReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPICLIST_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case TOPICLIST_SUCCESS: {
      const { topicsByName } = action
      return { ...state, topicsByName }
    }

    case TOPICLIST_SET_ACTIVE: {
      const { topic } = action
      return { ...state, activeTopic: topic }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { topicList } = action.payload
      return { ...state, ...topicList }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const topicListSagas = [takeLatest(TOPICLIST_REQUEST, topicListRequest)]

/** ASYNC Functions
 --------------------------------------------------------------- */
function* topicListRequest(action) {
  try {
    const topicsByName = yield fetchTopicList()
    yield put({ type: TOPICLIST_SUCCESS, topicsByName })
  } catch (error) {
    console.warn(error)
    yield put({ type: TOPICLIST_FAILURE, error })
  }
}
/**
 * fetchTopicList
 * Make and async request for a Pocket v3 feed and return best data
 * @return topics {array} An array of derived items
 */
export async function fetchTopicList(ssr) {
  try {
    const response = await apiTopicList(ssr)

    if (!response || response.status !== 1) return {}

    const { topics } = response
    const topicsByName = arrayToObject(topics, 'topic_slug')

    return topicsByName
  } catch (error) {
    console.warn('topic-pages.topic-list.state', error)
  }
}
