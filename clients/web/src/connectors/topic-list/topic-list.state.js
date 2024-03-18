import { TOPICS_BY_NAME } from 'common/constants'
import { TOPICLIST_SET_ACTIVE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const setActiveTopic = (activeTopic) => ({ type: TOPICLIST_SET_ACTIVE, activeTopic })

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {
  activeTopic: '',
  topicsByName: TOPICS_BY_NAME
}

export const topicListReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPICLIST_SET_ACTIVE: {
      const { activeTopic } = action
      return { ...state, activeTopic }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { topicList } = action.payload
      return { ...state, ...topicList }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

/** ASYNC Functions
 --------------------------------------------------------------- */
