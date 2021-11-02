import { TOPICS } from 'common/constants'
import { TOPICLIST_SET_ACTIVE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const setActiveTopic = (topic) => ({ type: TOPICLIST_SET_ACTIVE, topic })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {
  activeTopic: '',
  topicsByName: TOPICS
}

export const topicListReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPICLIST_SET_ACTIVE: {
      const { topic } = action
      return { ...state, ...topic }
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

/** ASYNC Functions
 --------------------------------------------------------------- */
