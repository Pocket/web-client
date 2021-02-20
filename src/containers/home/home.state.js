import { takeLatest, put, takeEvery, select } from 'redux-saga/effects'

import { getTopicFeed } from 'common/api/topics'
import { getCollectionSet } from 'common/api/collections'
import { saveItem } from 'common/api/saveItem'
import { removeItem } from 'common/api/removeItem'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { arrayToObject } from 'common/utilities'

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

/** ACTIONS
 --------------------------------------------------------------- */
export const getCollections = () => ({ type: HOME_COLLECTION_REQUEST })
export const saveHomeItem = (id, topic, url, position) => ({type: HOME_SAVE_REQUEST, id, topic, url, position}) //prettier-ignore
export const unSaveHomeItem = (id, topic) => ({ type: HOME_UNSAVE_REQUEST, id, topic }) //prettier-ignore

export const setTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_SET, topic}) //prettier-ignore
export const unsetTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_UNSET, topic}) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  // State for active list items
  topicSections: [],
  topics: {},
  collectionSet: []
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

    case HOME_COLLECTION_SUCCESS: {
      const { data: collectionSet } = action
      return { ...state, collectionSet }
    }

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
  takeLatest(HOME_COLLECTION_REQUEST, collectionDataRequest),
  takeLatest(HOME_TOPIC_SECTION_SET, topicDataRequest),
  takeEvery(HOME_SAVE_REQUEST, homeSaveRequest),
  takeEvery(HOME_UNSAVE_REQUEST, homeUnSaveRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTopicData = (state) => state.home.topics

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

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
