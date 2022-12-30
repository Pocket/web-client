import { getTopicLineup } from 'common/api/queries/get-topic-lineup'
import { TOPIC_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateTopic = (hydrated) => ({ type: TOPIC_HYDRATE, hydrated })


/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const topicReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPIC_HYDRATE: {
      const { hydrated } = action
      const { topic, data } = hydrated
      return { ...state, [topic]: { ...data } }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { discoverTopic } = action.payload
      return { ...state, ...discoverTopic }
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
    // Overloading the topic fetch since there is not a clear delineation
    // between collections and topic pages in the url.  Collections are
    // 100% curated, so we need to ask for more `curated` and omit the
    // algorithmic results

    const { itemsById, curatedItems, algorithmicItems } = await getTopicLineup(topic, 30)

    return {
      topic,
      itemsById,
      curatedItems,
      algorithmicItems
    }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('topic-pages.topic-data.state', error)
    return false
  }
}
