import { takeLatest, put, takeEvery } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { deriveItemData } from 'connectors/my-list-items/items.state'
import { arrayToObject } from 'common/utilities'

import { MYLIST_DATA_REQUEST } from 'actions'
import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_DATA_FAILURE } from 'actions'
import { MYLIST_HYDRATE } from 'actions'
import { MYLIST_SAVE_REQUEST } from 'actions'
import { MYLIST_UNSAVE_REQUEST } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMylistData = (count, offset, sort) => ({ type: MYLIST_DATA_REQUEST, count, offset, sort }) //prettier-ignore
export const hydrateMylist = (hydrated) => ({ type: MYLIST_HYDRATE, hydrated }) //prettier-ignore
export const saveMylistItem = (id, url, position) => ({type: MYLIST_SAVE_REQUEST, id, url, position}) //prettier-ignore
export const unSaveMylistItem = (id) => ({ type: MYLIST_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  active: [],
  activeOffset: 0,
  archive: [],
  archiveOffset: 0,
  favorites: [],
  favoritesOffset: 0,
  articles: [],
  articlesOffset: 0,
  videos: [],
  videosOffset: 0
}

export const myListReducers = (state = initialState, action) => {
  switch (action.type) {
    case MYLIST_DATA_SUCCESS: {
      const { items, offset } = action
      return {
        ...state,
        active: [...state.active, ...items],
        activeOffset: offset
      }
    }

    case MYLIST_DATA_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case MYLIST_HYDRATE: {
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

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListSagas = [
  takeLatest(MYLIST_DATA_REQUEST, myListDataRequest)
  // takeEvery(MYLIST_DATA_SUCCESS, mylistSaveRequest),
  // takeEvery(MYLIST_DATA_FAILURE, mylistUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* myListDataRequest(action) {
  try {
    const { count = 50, offset = 0, sort = 'newest' } = action
    const { items, itemsById } = yield fetchMyListData({ count, offset, sort })
    const newOffset = offset + count
    console.log(count, offset)
    // Deriving data from the response
    yield put({
      type: MYLIST_DATA_SUCCESS,
      items,
      itemsById,
      offset: newOffset
    })
  } catch (error) {
    console.log(error)
    yield put({ type: MYLIST_DATA_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    const derivedItems = await deriveItemData(Object.values(response.list))

    const items = derivedItems
      .sort((a, b) => a.sort_id - b.sort_id)
      .map((item) => item.resolved_id)

    const itemsById = arrayToObject(derivedItems, 'resolved_id')

    return { items, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
