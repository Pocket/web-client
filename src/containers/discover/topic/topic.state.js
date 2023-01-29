import { getTopicLineup } from 'common/api/queries/get-topic-lineup'
import { TOPIC_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateTopic = ({ topic, itemIds }) => ({ type: TOPIC_HYDRATE, topic, itemIds })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const pageTopicReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPIC_HYDRATE: {
      const { topic, itemIds } = action
      return { ...state, [topic]: itemIds }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageTopic } = action.payload
      return pageTopic
    }

    default:
      return state
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchTopicData(topic) {
  try {
    const { itemsById, itemIds } = await getTopicLineup(topic, 30)
    return { topic, itemsById, itemIds }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('topic-pages.topic-data.state', error)
    return false
  }
}
