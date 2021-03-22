import { put, takeEvery, select } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { getMyList } from 'common/api/my-list'
import { getTopicFeed } from 'common/api/topics'
import { getCollectionSet } from 'common/api/collections'
import { saveItem } from 'common/api/saveItem'
import { removeItem } from 'common/api/removeItem'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { arrayToObject } from 'common/utilities'

import { CACHE_KEY_HOME_STORED_TOPICS } from 'common/constants'
import { HOME_SET_PREFERENCES } from 'actions'
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

import { HOME_COLLECTION_REQUEST } from 'actions'
import { HOME_COLLECTION_SUCCESS } from 'actions'
import { HOME_COLLECTION_FAILURE } from 'actions'

import { HOME_RECENT_SAVES_REQUEST } from 'actions'
import { HOME_RECENT_SAVES_SUCCESS } from 'actions'
import { HOME_RECENT_SAVES_FAILURE } from 'actions'

import { HOME_SET_IMPRESSION } from 'actions'

import { ITEMS_DELETE_SEND } from 'actions'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const homeSetPreferences = () => ({ type: HOME_SET_PREFERENCES })

export const getCollections = () => ({ type: HOME_COLLECTION_REQUEST })
export const getRecentSaves = () => ({ type: HOME_RECENT_SAVES_REQUEST })
export const saveHomeItem = (id, url, position) => ({type: HOME_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveHomeItem = (id, topic) => ({ type: HOME_UNSAVE_REQUEST, id, topic }) //prettier-ignore

export const setTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_SET, topic}) //prettier-ignore
export const unsetTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_UNSET, topic}) //prettier-ignore

export const setHomeImpression = (id) => ({ type: HOME_SET_IMPRESSION, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  topicSections: [],
  collectionSet: [],
  recentSaves: [],
  impressions: {}
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_HYDRATE: {
      const { topicSections } = action
      return { ...state, topicSections }
    }

    case HOME_TOPIC_SECTION_SET: {
      const { topic } = action
      const set = new Set([topic, ...state.topicSections])
      return { ...state, topicSections: Array.from(set) }
    }

    case HOME_TOPIC_SECTION_UNSET: {
      const { topic } = action
      const filteredTopicSections = state.topicSections.filter(
        (section) => section.id !== topic.id
      )
      return { ...state, topicSections: filteredTopicSections }
    }

    case HOME_TOPIC_SECTION_SUCCESS: {
      const { topic, items } = action
      return { ...state, [`${topic}Topic`]: items }
    }

    case HOME_COLLECTION_SUCCESS: {
      const { data: collectionSet } = action
      return { ...state, collectionSet }
    }

    case HOME_SAVE_SUCCESS: {
      const { id } = action
      const recentSaves = new Set([id, ...state.recentSaves])
      return { ...state, recentSaves: Array.from(recentSaves) }
    }

    case HOME_RECENT_SAVES_SUCCESS: {
      const { items } = action
      const recentSaves = new Set([...items, ...state.recentSaves])
      return { ...state, recentSaves: Array.from(recentSaves) }
    }

    case HOME_SET_IMPRESSION: {
      const { id } = action
      const impressions = { ...state.impressions, [id]: true }
      return { ...state, impressions }
    }

    case SNOWPLOW_TRACK_PAGE_VIEW: {
      return { ...state, impressions: {} }
    }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, save_status) {
  const itemsById = state.itemsById
  const item = itemsById[id]
  return { ...itemsById, [id]: { ...item, save_status } }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeSagas = [
  takeEvery(HOME_SET_PREFERENCES, homePreferences),
  takeEvery(HOME_RECENT_SAVES_REQUEST, recentDataRequest),
  takeEvery(HOME_COLLECTION_REQUEST, collectionDataRequest),
  takeEvery(HOME_TOPIC_SECTION_REQUEST, topicDataRequest),
  takeEvery(HOME_TOPIC_SECTION_SET, topicDataRequest),
  takeEvery(HOME_SAVE_REQUEST, homeSaveRequest),
  takeEvery(HOME_UNSAVE_REQUEST, homeUnSaveRequest),
  takeEvery(HOME_TOPIC_SECTION_SET, storeTopicPreferences),
  takeEvery(HOME_TOPIC_SECTION_UNSET, storeTopicPreferences)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTopicData = (state, topic) => state.home[`${topic}Topic`]
const getTopicSections = (state) => state.home.topicSections

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homePreferences() {
  const storedSections = localStore.getItem(CACHE_KEY_HOME_STORED_TOPICS)
  const topicSections = storedSections ? JSON.parse(storedSections) : []

  for (var i = 0; i < topicSections.length; i++) {
    yield put({ type: HOME_TOPIC_SECTION_REQUEST, topic: topicSections[i] })
  }

  yield put({ type: HOME_HYDRATE, topicSections })
}

function* recentDataRequest() {
  try {
    const { items, itemsById, error } = yield fetchMyListData({
      count: 1,
      offset: 0,
      state: 'unread',
      sort: 'newest'
    })
    if (error) yield put({ type: HOME_RECENT_SAVES_FAILURE, error })

    // Remove default item for Home Experiment
    const itemsNoDefault = items.filter(
      (item) => item !== '2333373270' && item !== '3242033017'
    )

    yield put({ type: HOME_RECENT_SAVES_SUCCESS, items: itemsNoDefault, itemsById }) // prettier-ignore
  } catch (error) {
    console.log(error)
    yield put({ type: HOME_RECENT_SAVES_FAILURE, error })
  }
}

function* topicDataRequest({ topic }) {
  try {
    // check if topic data exists in state
    const topicData = yield select(getTopicData, topic.topic)
    if (topicData) return

    // fetch topic data
    const { items, itemsById, error } = yield fetchTopicData(topic)
    if (error) return yield put({ type: HOME_TOPIC_SECTION_FAILURE, error })

    yield put({
      type: HOME_TOPIC_SECTION_SUCCESS,
      topic: topic.topic,
      items,
      itemsById
    })
  } catch (error) {
    console.log('catch', error)
    yield put({ type: HOME_TOPIC_SECTION_FAILURE, error })
  }
}

function* collectionDataRequest() {
  try {
    // fetch topic data
    const { data, error } = yield fetchCollectionData({ count: 2 })

    if (error) return yield put({ type: HOME_TOPIC_SECTION_FAILURE, error })

    yield put({ type: HOME_COLLECTION_SUCCESS, data })
  } catch (error) {
    console.log('catch', error)
    yield put({ type: HOME_COLLECTION_FAILURE, error })
  }
}

function* homeSaveRequest({ url, id, position }) {
  try {
    const analytics = {
      view: 'web',
      section: 'home',
      page: '/home/',
      cxt_item_position: position
    }

    const response = yield saveItem(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    const derivedItems = yield deriveMyListItems(
      Object.values(response.action_results)
    )

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    yield put({ type: HOME_SAVE_SUCCESS, id, items, itemsById })
    yield put({ type: ITEMS_ADD_SUCCESS })
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

function* storeTopicPreferences() {
  const topicSections = yield select(getTopicSections)
  localStore.setItem(
    CACHE_KEY_HOME_STORED_TOPICS,
    JSON.stringify(topicSections)
  )
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
      .map((item) => item.resolved_id)

    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById, total }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchTopicData({ topic }) {
  try {
    const response = await getTopicFeed(topic, 12, 0, false)

    if (!response.curated) return { error: 'No Items Returned' }

    // Derive curated item data and create items by id
    const { curated = [] } = response
    const derivedCuratedItems = await deriveDiscoverItems(curated)
    const curatedIds = derivedCuratedItems.map((item) => item.resolved_id)
    const items = [...new Set(curatedIds)] // Unique entries only
    const itemsById = arrayToObject(derivedCuratedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('home.state.topics', error)
  }
}

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchCollectionData({ count }) {
  try {
    const response = await getCollectionSet(count)
    if (response.length) return { data: response }
    return { error: 'No data found' }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('home.state.topics', error)
  }
}
