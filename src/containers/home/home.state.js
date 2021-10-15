import { put, takeEvery, select, call } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { getHomeLineup as apiGetHomeLineup } from 'common/api/home'
import { getHomeTopicFeed } from 'common/api/topics'
import { getCollections as apiGetCollections } from 'common/api/collections'
import { saveItem } from 'common/api/saveItem'
import { removeItem } from 'common/api/removeItem'
import { deriveDiscoverItems } from 'connectors/items-by-id/discover/items.derive'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { arrayToObject } from 'common/utilities'

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

import { HOME_LINEUP_REQUEST } from 'actions'
import { HOME_LINEUP_SUCCESS } from 'actions'
import { HOME_LINEUP_FAILURE } from 'actions'

import { RECENT_RECS_SUCCESS } from 'actions'
import { RECENT_RECS_FAILURE } from 'actions'
import { HOME_SIMILAR_REC_REQUEST } from 'actions'
import { HOME_SIMILAR_RECS_CLEAR } from 'actions'

import { HOME_SIMILAR_REC_SAVE_REQUEST } from 'actions'
import { HOME_SIMILAR_REC_SAVE_SUCCESS } from 'actions'
import { HOME_SIMILAR_REC_SAVE_FAILURE } from 'actions'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { PINNED_TOPICS_SET } from 'actions'

import { MYLIST_DATA_REQUEST } from 'actions'
import { MYLIST_UPDATE_REQUEST } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const homeHydrate = (topicSections) => ({ type: HOME_HYDRATE, topicSections })

export const getHomeLineup = () => ({ type: HOME_LINEUP_REQUEST })
export const getSimilarRecs = (id) => ({ type: HOME_SIMILAR_REC_REQUEST, id })
export const saveSimilarRec = (id, url, position) => ({type: HOME_SIMILAR_REC_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const clearSimilarRecs = () => ({ type: HOME_SIMILAR_RECS_CLEAR })
export const getCollections = () => ({ type: HOME_COLLECTION_REQUEST })
export const getRecentSaves = () => ({ type: HOME_RECENT_SAVES_REQUEST })
export const saveHomeItem = (id, url, position) => ({type: HOME_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveHomeItem = (id, topic) => ({ type: HOME_UNSAVE_REQUEST, id, topic }) //prettier-ignore

export const setTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_SET, topic}) //prettier-ignore
export const unsetTopicSection = (topic) => ({type : HOME_TOPIC_SECTION_UNSET, topic}) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  collectionSet: [],
  recentSaves: [],
  slates: [],
  slatesById: {},
  newSaves: 0,
  similarRecsResolved: false
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_LINEUP_SUCCESS: {
      const { generalSlates, topicSlates, slatesById, isPersonalized } = action
      return { ...state, generalSlates, topicSlates, slatesById, isPersonalized }
    }

    case HOME_SIMILAR_REC_REQUEST: {
      const { id } = action
      return { ...state, similarRecId: id, similarRecsResolved: false }
    }

    case RECENT_RECS_SUCCESS:
    case RECENT_RECS_FAILURE: {
      return { ...state, similarRecsResolved: true }
    }

    case HOME_SIMILAR_RECS_CLEAR:
    case MYLIST_DATA_REQUEST:
    case MYLIST_UPDATE_REQUEST:
    case HYDRATE: {
      return { ...state, similarRecId: false, similarRecsResolved: false }
    }

    case HOME_TOPIC_SECTION_SUCCESS: {
      const { topic, items } = action
      return { ...state, [`${topic}Topic`]: items }
    }

    case HOME_COLLECTION_SUCCESS: {
      const { data: collectionSet } = action
      return { ...state, collectionSet }
    }

    case HOME_SAVE_SUCCESS:
    case HOME_SIMILAR_REC_SAVE_SUCCESS: {
      const { id } = action
      const recentSaves = new Set([id, ...state.recentSaves])
      return { ...state, recentSaves: Array.from(recentSaves), newSaves: ++state.newSaves }
    }

    case HOME_RECENT_SAVES_SUCCESS: {
      const { items } = action
      const recentSaves = new Set([...items, ...state.recentSaves])
      return { ...state, recentSaves: Array.from(recentSaves) }
    }

    case SNOWPLOW_TRACK_PAGE_VIEW: {
      return { ...state, newSaves: 0 }
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
  takeEvery(HOME_HYDRATE, homePreferences),
  takeEvery(HOME_LINEUP_REQUEST, homeLineupRequest),
  takeEvery(HOME_RECENT_SAVES_REQUEST, recentDataRequest),
  takeEvery(HOME_COLLECTION_REQUEST, collectionDataRequest),
  takeEvery(HOME_TOPIC_SECTION_REQUEST, topicDataRequest),
  takeEvery(HOME_SIMILAR_REC_SAVE_REQUEST, homeSimilarRecSaveRequest),
  takeEvery(HOME_SAVE_REQUEST, homeSaveRequest),
  takeEvery(HOME_UNSAVE_REQUEST, homeUnSaveRequest),
  takeEvery(HOME_TOPIC_SECTION_SET, setTopicPreferences),
  takeEvery(HOME_TOPIC_SECTION_UNSET, unsetTopicPreferences)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTopicData = (state, topic) => state.home[`${topic}Topic`]
const getTopicSections = (state) => state.settings.pinnedTopics

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homePreferences({ topicSections }) {
  for (var i = 0; i < topicSections.length; i++) {
    yield put({ type: HOME_TOPIC_SECTION_REQUEST, topic: topicSections[i] })
  }
}

function* homeLineupRequest() {
  try {
    const data = yield call(fetchLineupData)
    yield put({ type: HOME_LINEUP_SUCCESS, ...data })
  } catch (error) {
    console.warn(error)
  }
}

function* recentDataRequest() {
  try {
    const { items, itemsById, error } = yield fetchMyListData({
      count: 3,
      offset: 0,
      state: 'unread',
      sort: 'newest'
    })
    if (error) yield put({ type: HOME_RECENT_SAVES_FAILURE, error })

    // Remove default item for Home Experiment
    const itemsNoDefault = items.filter((item) => item !== '2333373270' && item !== '3242033017')

    yield put({ type: HOME_RECENT_SAVES_SUCCESS, items: itemsNoDefault, itemsById }) // prettier-ignore
  } catch (error) {
    console.warn(error)
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
    console.warn('catch', error)
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
    console.warn('catch', error)
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

    const derivedItems = yield deriveMyListItems(Object.values(response.action_results))

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

function* homeSimilarRecSaveRequest({ url, id, position }) {
  try {
    const analytics = {
      view: 'web',
      section: 'home',
      page: '/home/',
      cxt_item_position: position
    }

    const response = yield saveItem(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    const derivedItems = yield deriveMyListItems(Object.values(response.action_results))

    const items = derivedItems.map((item) => item.resolved_id)
    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    yield put({ type: HOME_SIMILAR_REC_SAVE_SUCCESS, id, items, itemsById })
    yield put({ type: ITEMS_ADD_SUCCESS })
  } catch (error) {
    yield put({ type: HOME_SIMILAR_REC_SAVE_FAILURE, error })
  }
}

function* setTopicPreferences({ topic }) {
  const topicSections = yield select(getTopicSections)
  const set = new Set([topic, ...topicSections])

  yield put({ type: PINNED_TOPICS_SET, pinnedTopics: Array.from(set) })
}

function* unsetTopicPreferences({ topic }) {
  const topicSections = yield select(getTopicSections)
  const pinnedTopics = topicSections.filter((section) => section.topic_slug !== topic.topic_slug)

  yield put({ type: PINNED_TOPICS_SET, pinnedTopics })
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

    const items = derivedItems.sort((a, b) => a.sort_id - b.sort_id).map((item) => item.resolved_id)

    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById, total }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}

/**
 * fetchTopicData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchTopicData({ topic }) {
  try {
    const response = await getHomeTopicFeed(topic)

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
    console.warn('home.state.topics', error)
  }
}

/**
 * fetchCollectionData
 * Make and async request for a Pocket Client API (mocked) and return best data
 * @return items {array} An array of derived items
 */
export async function fetchCollectionData({ count }) {
  try {
    const collections = await apiGetCollections()
    if (!collections.length) return { error: 'No data found' }

    const collectionsWithUrl = collections.map((collection) => ({
      ...collection,
      url: `/collections/${collection.slug}`
    }))
    const data = collectionsWithUrl.slice(0, count)
    return { data }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('home.state.topics', error)
  }
}

/**
 * fetchLineupData
 * Make and async request the home lineup
 */
export async function fetchLineupData() {
  try {
    const response = await apiGetHomeLineup({})

    const { slatesById, itemsById, slateLineup, isPersonalized } = response
    const { generalSlates, topicSlates } = response

    if (!generalSlates?.length || !slatesById || !itemsById) return {}

    return { generalSlates, topicSlates, slatesById, itemsById, slateLineup, isPersonalized }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('home.state.lineup', error)
  }
}
