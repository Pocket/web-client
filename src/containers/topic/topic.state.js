import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getTopicFeed } from 'common/api/topics'
import { getSearchFeed } from 'common/api/search'
import { getItemSaveAnalytics } from './topic.analytics'
import { deriveItemData } from 'connectors/items/items.state'
import { arrayToObject } from 'common/utilities'
import {
  TOPIC_DATA_REQUEST,
  TOPIC_DATA_SUCCESS,
  TOPIC_DATA_FAILURE,
  TOPIC_HYDRATE,
  TOPIC_SAVE_REQUEST,
  TOPIC_UNSAVE_REQUEST,
  ITEMS_SAVE_REQUEST,
  ITEMS_UNSAVE_REQUEST
} from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getTopicsData = () => ({ type: TOPIC_DATA_REQUEST })
export const hydrateTopic = (hydrated) => ({ type: TOPIC_HYDRATE, hydrated })
export const saveTopicItem = (id, url, position) => ({type: TOPIC_SAVE_REQUEST, id, url, position}) /*prettier-ignore */
export const unSaveTopicItem = (id) => ({ type: TOPIC_UNSAVE_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  searchItems: [],
  curatedItems: [],
  algorithmicItems: []
}

export const topicReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOPIC_DATA_SUCCESS: {
      const { items, itemsById } = action
      return { ...state, items, itemsById }
    }

    case TOPIC_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case TOPIC_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { topic } = action.payload
      return { ...state, ...topic }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const topicSagas = [
  takeLatest(TOPIC_DATA_REQUEST, topicsDataRequest),
  takeEvery(TOPIC_SAVE_REQUEST, topicsSaveRequest),
  takeEvery(TOPIC_UNSAVE_REQUEST, topicsUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* topicsDataRequest() {
  try {
    const { items, itemsById } = yield fetchTopicData()

    // Deriving data from the response
    yield put({ type: TOPIC_DATA_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: TOPIC_DATA_FAILURE, error })
  }
}

function* topicsSaveRequest(action) {
  const { url, id, position } = action
  const analytics = getItemSaveAnalytics(position)
  yield put({ type: ITEMS_SAVE_REQUEST, id, url, analytics })
}

function* topicsUnSaveRequest(action) {
  const { id } = action
  yield put({ type: ITEMS_UNSAVE_REQUEST, id })
}

/** ASYNC Functions
 --------------------------------------------------------------- */

// Async helper for cleaner code
const mapIds = (item) => item.resolved_id

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchTopicData(topic, isCollection) {
  try {
    // Overloading the topic fetch since there is not a clear delineation
    // between collections and topic pages in the url.  Collections are
    // 100% currated, so we need to ask for more `currated` and omit the
    // algorithmic results
    const response = isCollection
      ? await getTopicFeed(topic, 30, 0)
      : await getTopicFeed(topic, 5, 25)

    // Derive curated item data and create items by id
    const { curated = [] } = response
    const derivedCurratedItems = await deriveItemData(curated)
    const curratedIds = derivedCurratedItems.map(mapIds)
    const curatedItems = [...new Set(curratedIds)] // Unique entries only
    const curatedItemsById = arrayToObject(derivedCurratedItems, 'resolved_id')

    // Derive algorithmic item data and create items by id
    const { algorithmic = [] } = response
    const derivedAlgorithmicItems = await deriveItemData(algorithmic)
    const algorithmicIds = derivedAlgorithmicItems.map(mapIds)
    const algorithmicItems = [...new Set(algorithmicIds)] // Unique entries only
    const algorithmicItemsById = arrayToObject(
      derivedAlgorithmicItems,
      'resolved_id'
    )

    return {
      curatedItems,
      curatedItemsById,
      algorithmicItems,
      algorithmicItemsById
    }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('topic-pages.topic-data.state', error)
    return false
  }
}

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchSearchData(query) {
  try {
    const response = await getSearchFeed(query)

    // Derive curated item data and create items by id
    const { results = [] } = response
    const derivedSearchItems = await deriveItemData(results)
    const searchIds = derivedSearchItems.map(mapIds)
    const searchItems = [...new Set(searchIds)] // Unique entries only
    const searchItemsById = arrayToObject(derivedSearchItems, 'resolved_id')

    return {
      searchItems,
      searchItemsById
    }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('topic-pages.topic-data.state', error)
    return false
  }
}
