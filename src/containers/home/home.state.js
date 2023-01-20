import { put, takeEvery, call } from 'redux-saga/effects'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { deriveListItem } from 'common/api/derivers/item'
import { STARTER_ARTICLES } from 'common/constants'
import { getSaves } from 'common/api/saves'

import { HOME_RECENT_SAVES_REQUEST } from 'actions'
import { HOME_RECENT_SAVES_SUCCESS } from 'actions'
import { HOME_RECENT_SAVES_FAILURE } from 'actions'

import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (locale) => ({ type: HOME_CONTENT_REQUEST, locale })
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
  takeEvery(HOME_RECENT_SAVES_REQUEST, recentDataRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homeContentRequest({ locale }) {
  try {
    const { itemsById, slatesById, slateArray } = yield call(getUnifiedHome, locale)

    yield put({ type: HOME_CONTENT_SUCCESS, itemsById, slatesById, slateArray })
  } catch (error) {
    console.warn(error)
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
