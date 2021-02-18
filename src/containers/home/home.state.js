import { takeLatest, put, takeEvery, select } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { getDiscoverFeed } from 'common/api/discover'
import { getTopicFeed } from 'common/api/topics'
import { saveItem } from 'common/api/saveItem'
import { removeItem } from 'common/api/removeItem'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'

import { HOME_DATA_LATEST_REQUEST } from 'actions'
import { HOME_DATA_LATEST_SUCCESS } from 'actions'
import { HOME_DATA_LATEST_FAILURE } from 'actions'

import { HOME_DATA_DISCOVER_REQUEST } from 'actions'
import { HOME_DATA_DISCOVER_SUCCESS } from 'actions'
import { HOME_DATA_DISCOVER_FAILURE } from 'actions'

import { HOME_HYDRATE } from 'actions'
import { HOME_SAVE_REQUEST } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'
import { HOME_SAVE_FAILURE } from 'actions'
import { HOME_UNSAVE_REQUEST } from 'actions'
import { HOME_UNSAVE_SUCCESS } from 'actions'
import { HOME_UNSAVE_FAILURE } from 'actions'

import { HOME_TOPIC_SECTION_SET } from 'actions'
import { HOME_TOPIC_SECTION_UNSET } from 'actions'
import { HOME_TOPIC_SECTION_REQUEST } from 'actions'
import { HOME_TOPIC_SECTION_SUCCESS } from 'actions'
import { HOME_TOPIC_SECTION_FAILURE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeLatestData = () => ({ type: HOME_DATA_LATEST_REQUEST }) //prettier-ignore
export const getDiscoverData = () => ({ type: HOME_DATA_DISCOVER_REQUEST}) //prettier-ignore
export const hydrateHome = (hydrated) => ({ type: HOME_HYDRATE, hydrated }) //prettier-ignore
export const saveHomeItem = (id, topic, url, position) => ({type: HOME_SAVE_REQUEST, id, topic, url, position}) //prettier-ignore
export const unSaveHomeItem = (id, topic) => ({ type: HOME_UNSAVE_REQUEST, id, topic }) //prettier-ignore

export const setTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_SET, topic}) //prettier-ignore
export const unsetTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_UNSET, topic}) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  // State for active list items
  latest: [],
  discover: [],
  topicSections: [],
  topics: {}
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_TOPIC_SECTION_SET: {
      const { topic } = action
      const set = new Set([topic, ...state.topicSections])
      return { ...state, topicSections: Array.from(set) }
    }

    case HOME_TOPIC_SECTION_UNSET: {
      const { topic } = action
      const filteredTopicSections = state.topicSections.filter(
        (section) => section !== topic
      )
      return { ...state, topicSections: filteredTopicSections }
    }

    case HOME_TOPIC_SECTION_SUCCESS: {
      const { topic, data } = action
      const topics = {
        ...state.topics,
        [topic]: data
      }
      return { ...state, topics }
    }

    case HOME_SAVE_REQUEST: {
      const { id, topic } = action
      return updateSaveStatus(state, id, topic, 'saving')
    }
    case HOME_SAVE_SUCCESS: {
      const { id, topic } = action
      return updateSaveStatus(state, id, topic, 'saved')
    }
    case HOME_SAVE_FAILURE: {
      const { id, topic } = action
      return updateSaveStatus(state, id, topic, 'unsaved')
    }

    case HOME_UNSAVE_SUCCESS: {
      const { id, topic } = action
      return updateSaveStatus(state, id, topic, 'unsaved')
    }
    case HOME_UNSAVE_FAILURE: {
      const { id, topic } = action
      return updateSaveStatus(state, id, topic, 'saved')
    }

    case HOME_DATA_LATEST_SUCCESS: {
      const { items } = action
      return { ...state, latest: items }
    }
    case HOME_DATA_DISCOVER_SUCCESS: {
      const { items } = action
      return { ...state, discover: items }
    }

    case HOME_DATA_LATEST_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case HOME_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { mylist } = action.payload
      return { ...state, ...mylist }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} topic Topic item belongs to
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, topic, save_status) {
  const { items, itemsById } = state.topics[topic]
  const topics = {
    ...state.topics,
    [topic]: {
      items,
      itemsById: {
        ...itemsById,
        [id]: {
          ...itemsById[id],
          save_status
        }
      }
    }
  }

  return { ...state, topics }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeSagas = [
  takeLatest(HOME_DATA_LATEST_REQUEST, latestDataRequest),
  takeLatest(HOME_DATA_DISCOVER_REQUEST, discoverDataRequest),
  takeLatest(HOME_TOPIC_SECTION_SET, topicDataRequest),
  takeEvery(HOME_SAVE_REQUEST, homeSaveRequest),
  takeEvery(HOME_UNSAVE_REQUEST, homeUnSaveRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTopicData = (state) => state.home.topics

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* latestDataRequest(action) {
  try {
    const { items, itemsById, error } = yield fetchMyListData({
      count: 5,
      offset: 0,
      state: 'unread',
      sort: 'newest'
    })
    if (error) yield put({ type: HOME_DATA_LATEST_FAILURE, error })

    // Deriving data from the response
    yield put({ type: HOME_DATA_LATEST_SUCCESS, items, itemsById })
  } catch (error) {
    console.log(error)
    yield put({ type: HOME_DATA_LATEST_FAILURE, error })
  }
}

function* discoverDataRequest(action) {
  try {
    const { items, itemsById, error } = yield fetchDiscoverData()

    if (error) return yield put({ type: HOME_DATA_DISCOVER_FAILURE, error })

    // Deriving data from the response
    yield put({ type: HOME_DATA_DISCOVER_SUCCESS, items, itemsById })
  } catch (error) {
    yield put({ type: HOME_DATA_DISCOVER_FAILURE, error })
  }
}

function* topicDataRequest({ topic }) {
  try {
    // check if topic data exists in state
    const topicData = yield select(getTopicData)
    if (topicData[topic.topic]) return

    // fetch topic data
    const { items, itemsById, error } = yield fetchTopicData(topic)
    if (error) return yield put({ type: HOME_TOPIC_SECTION_FAILURE, error })

    const data = { items, itemsById }
    yield put({ type: HOME_TOPIC_SECTION_SUCCESS, topic: topic.topic, data })
  } catch (error) {
    console.log('catch', error)
    yield put({ type: HOME_TOPIC_SECTION_FAILURE, error })
  }
}

function* homeSaveRequest({ url, id, topic, position }) {
  try {
    const analytics = {
      view: 'web',
      section: 'home',
      page: '/home/',
      cxt_item_position: position
    }

    const response = yield saveItem(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: HOME_SAVE_SUCCESS, id, topic })
  } catch (error) {
    yield put({ type: HOME_SAVE_FAILURE, error })
  }
}

function* homeUnSaveRequest({ id, topic }) {
  try {
    const response = yield removeItem(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: HOME_UNSAVE_SUCCESS, id, topic })
  } catch (error) {
    yield put({ type: HOME_UNSAVE_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchMyListData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    if (!response.list) return { error: 'No Items Returned' }

    const total = response.total

    const derivedItems = await deriveMyListItems(Object.values(response.list))

    const items = derivedItems
      .sort((a, b) => a.sort_id - b.sort_id)
      .map((item) => item.item_id)

    const itemsById = arrayToObject(derivedItems, 'item_id')

    return { items, itemsById, total }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('home.state.mylist', error)
  }
}

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchDiscoverData() {
  try {
    const response = await getDiscoverFeed()
    if (!response.feed) return { error: 'no discover items' }

    const derivedItems = await deriveDiscoverItems(response.feed)

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}

// Async helper for cleaner code
const mapIds = (item) => item.resolved_id

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchTopicData({ topic }) {
  try {
    const response = await getTopicFeed(topic, 3, 0, false)

    if (!response.curated) return { error: 'No Items Returned' }

    // Derive curated item data and create items by id
    const { curated = [] } = response
    const derivedCuratedItems = await deriveDiscoverItems(curated)
    const curatedIds = derivedCuratedItems.map(mapIds)
    const items = [...new Set(curatedIds)] // Unique entries only
    const itemsById = arrayToObject(derivedCuratedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('home.state.topics', error)
  }
}
