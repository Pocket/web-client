import { arrayToObject } from 'common/utilities'
import { TOPICLIST_HYDRATE } from 'actions'
import { TOPICLIST_SET_ACTIVE } from 'actions'
import { getTopicList } from 'common/api/topics'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
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
export const topicListSagas = []

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchTopicList
 * Make and async request for a Pocket v3 feed and return best data
 * @return topics {array} An array of derived items
 */
export async function fetchTopicList() {
  try {
    const response = await getTopicList()
    const { topics } = response
    const topicsByName = arrayToObject(topics, 'topic_slug')
    return topicsByName
  } catch (error) {
    console.log('topic-pages.topic-list.state', error)
  }
}
