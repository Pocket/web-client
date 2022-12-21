import { put, takeEvery } from 'redux-saga/effects'
import { getTopicLineup } from 'common/api/queries/get-topic-lineup'

import { TOPIC_HYDRATE } from 'actions'
import { TOPIC_SAVE_REQUEST } from 'actions'
import { TOPIC_UNSAVE_REQUEST } from 'actions'
import { DISCOVER_ITEMS_SAVE_REQUEST } from 'actions'
import { DISCOVER_ITEMS_UNSAVE_REQUEST } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateTopic = (hydrated) => ({ type: TOPIC_HYDRATE, hydrated })
export const saveTopicItem = (id, url, position) => ({type: TOPIC_SAVE_REQUEST, id, url, position}) /*prettier-ignore */
export const unSaveTopicItem = (id) => ({ type: TOPIC_UNSAVE_REQUEST, id })

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

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const topicSagas = [
  takeEvery(TOPIC_SAVE_REQUEST, topicsSaveRequest),
  takeEvery(TOPIC_UNSAVE_REQUEST, topicsUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* topicsSaveRequest(action) {
  const { url, id, position } = action
  const page = global?.location?.pathname
  const topic = page.match(/\/explore\/(.*)(\?.*)?/)
  const analytics = {
    view: 'web',
    section: 'topics',
    page,
    cxt_item_position: position,
    extra_content: topic ? topic[1] : false
  }

  yield put({ type: DISCOVER_ITEMS_SAVE_REQUEST, id, url, analytics })
}

function* topicsUnSaveRequest(action) {
  const { id } = action
  yield put({ type: DISCOVER_ITEMS_UNSAVE_REQUEST, id })
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
