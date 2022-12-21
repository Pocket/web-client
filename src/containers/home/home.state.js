import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { saveItem } from 'common/api/_legacy/saveItem'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { deriveListItem } from 'common/api/derivers/item'
import { removeItemByUrl } from 'common/api/_legacy/removeItem'
import { STARTER_ARTICLES } from 'common/constants'
import { getSaves } from 'common/api/saves'

import { HOME_RECENT_SAVES_REQUEST } from 'actions'
import { HOME_RECENT_SAVES_SUCCESS } from 'actions'
import { HOME_RECENT_SAVES_FAILURE } from 'actions'

import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'

import { HOME_SAVE_REQUEST } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'

import { HOME_UNSAVE_REQUEST } from 'actions'
import { HOME_UNSAVE_SUCCESS } from 'actions'
import { HOME_UNSAVE_FAILURE } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (id) => ({ type: HOME_CONTENT_REQUEST, id })
export const saveHomeItem = (id, url) => ({ type: HOME_SAVE_REQUEST, id, url })
export const unSaveHomeItem = (id, url) => ({ type: HOME_UNSAVE_REQUEST, id, url })
export const getRecentSaves = () => ({ type: HOME_RECENT_SAVES_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  recentSaves: [],
  slates: [],
  itemsById: {}
}

export const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_SUCCESS: {
      const { itemsById, slatesById, slateArray } = action
      return { ...state, itemsById, slatesById, slates: slateArray }
    }

    case HOME_SAVE_SUCCESS: {
      const { corpusId, id } = action
      const item = state.itemsById[corpusId] || {}
      const recentSaves = Array.from(new Set([id, ...state.recentSaves]))

      return {
        ...state,
        recentSaves,
        itemsById: { ...state.itemsById, [corpusId]: { ...item, savedId: id, saveStatus: 'saved' } }
      }
    }

    case HOME_UNSAVE_SUCCESS: {
      const { corpusId } = action
      const item = state.itemsById[corpusId] || {}
      const recentSaves = state.recentSaves.filter((id) => id !== item.savedId)
      return {
        ...state,
        recentSaves,
        itemsById: { ...state.itemsById, [corpusId]: { ...item, saveStatus: 'unsaved' } }
      }
    }

    case HOME_SAVE_REQUEST:
    case HOME_UNSAVE_REQUEST: {
      const { id } = action
      const item = state.itemsById[id] || {}
      return {
        ...state,
        itemsById: { ...state.itemsById, [id]: { ...item, saveStatus: 'saving' } }
      }
    }

    case HOME_RECENT_SAVES_SUCCESS: {
      const { items } = action
      const recentSaves = new Set([...items])
      return { ...state, recentSaves: Array.from(recentSaves) }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const homeSagas = [
  takeEvery(HOME_CONTENT_REQUEST, homeContentRequest),
  takeEvery(SET_TOPIC_SUCCESS, homeContentRequest),
  takeEvery(HOME_SAVE_REQUEST, homeContentSaveRequest),
  takeEvery(HOME_RECENT_SAVES_REQUEST, recentDataRequest),
  takeEvery(HOME_UNSAVE_REQUEST, homeContentUnSaveRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homeContentRequest() {
  try {
    const { itemsById, slatesById, slateArray } = yield call(getUnifiedHome)

    yield put({ type: HOME_CONTENT_SUCCESS, itemsById, slatesById, slateArray })
  } catch (error) {
    console.warn(error)
  }
}

function* homeContentSaveRequest({ url, id }) {
  try {
    const response = yield saveItem(url, { id })
    if (response?.status !== 1) throw new Error('Unable to save')

    // Manually adding `status: "0"` will derive the readUrl
    const derivedItems = yield Object.values(response.action_results).map((item) =>
      deriveListItem({ ...item, status: '0' }, true)
    )

    const items = derivedItems.map((item) => item.resolvedId)
    const itemsById = arrayToObject(derivedItems, 'resolvedId')
    const saveId = items[0]

    yield put({ type: HOME_SAVE_SUCCESS, corpusId: id, id: saveId, items, itemsById })
  } catch (error) {
    console.warn(error)
  }
}

function* homeContentUnSaveRequest({ id, url }) {
  try {
    const response = yield removeItemByUrl(url)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: HOME_UNSAVE_SUCCESS, corpusId: id })
  } catch (error) {
    yield put({ type: HOME_UNSAVE_FAILURE, error })
  }
}

function* recentDataRequest() {
  try {
    const { itemsById, error } = yield fetchSavesData({
      count: 3,
      offset: 0,
      state: 'unread',
      sort: 'newest'
    })
    if (error) yield put({ type: HOME_RECENT_SAVES_FAILURE, error })

    // Remove default item for Home Experiment
    const items = Object.values(itemsById)
      .filter((item) => !STARTER_ARTICLES.includes(item.itemId))
      .sort((a, b) => b._createdAt - a._createdAt)
      .map((item) => item.itemId)

    yield put({ type: HOME_RECENT_SAVES_SUCCESS, items, itemsById }) // prettier-ignore
  } catch (error) {
    console.warn(error)
    yield put({ type: HOME_RECENT_SAVES_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */
/**
 * fetchSavesData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchSavesData(params) {
  try {
    const response = await getSaves(params)
    if (!response.list) return { error: 'No Items Returned' }

    const total = response.total

    const derivedItems = Object.values(response.list).map((item) => deriveListItem(item, true))
    const itemsById = arrayToObject(derivedItems, 'itemId')

    return { itemsById, total }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}
