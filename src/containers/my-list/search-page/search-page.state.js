import { takeLatest, put, select } from 'redux-saga/effects'
import { searchMyList } from 'common/api/my-list'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { arrayToObject } from 'common/utilities'
import { sortByOrder } from '../my-list.sorters'

import { MYLIST_SEARCH_REQUEST } from 'actions'
import { MYLIST_SEARCH_SUCCESS } from 'actions'
import { MYLIST_SEARCH_FAILURE } from 'actions'

import { APP_SORT_ORDER_TOGGLE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMylistSearchData = (filter, query) => ({ type: MYLIST_SEARCH_REQUEST, filter, query }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  sortOrder: 'relevance',

  // State for search and search filters
  search: [],
  searchOffset: 0,
  searchSince: 0,
  searchTotal: false,

  searchunread: [],
  searchunreadOffset: 0,
  searchunreadSince: 0,
  searchunreadTotal: false,

  searcharchive: [],
  searcharchiveOffset: 0,
  searcharchiveSince: 0,
  searcharchiveTotal: false,

  searchfavorites: [],
  searchfavoritesOffset: 0,
  searchfavoritesSince: 0,
  searchfavoritesTotal: false
}

export const myListSearchReducers = (state = initialState, action) => {
  switch (action.type) {
    case MYLIST_SEARCH_SUCCESS: {
      const { items, offset, total, filter, since, query } = action

      const section = filter ? 'search' + filter : 'search'

      return {
        ...state,
        query,
        [section]: items,
        [`${section}Offset`]: offset,
        [`${section}Since`]: since,
        [`${section}Total`]: parseInt(total, 10)
      }
    }

    case MYLIST_SEARCH_FAILURE: {
      const { error } = action
      return { ...state, error }
    }

    case APP_SORT_ORDER_TOGGLE: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListSearchSagas = [
  takeLatest(MYLIST_SEARCH_REQUEST, myListSearchRequest)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSortOrder = (state) => state.myListSearch.sortOrder
const getCurrentState = (state) => state.myListSearch || {}

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* myListSearchRequest(action) {
  try {
    const { filter, query } = action
    const section = filter ? 'search' + filter : 'search'

    const parameters = { search: query }
    const sortOrder = yield select(getSortOrder)

    // Apply filters
    if (filter === 'active') parameters.state = 'unread'
    if (filter === 'archive') parameters.state = 'read'
    if (filter === 'favorites') parameters.favorite = 1

    const { itemsById, total, since, error } = yield fetchMyListSearch({
      locale_lang: 'en-US',
      state: 'all',
      count: 150,
      offset: 0,
      sort: sortOrder,
      ...parameters
    })

    if (error) return yield put({ type: MYLIST_SEARCH_FAILURE, error })

    const searchState = yield select(getCurrentState)
    const currentItems = searchState[section]

    const newItemIds = Object.values(itemsById)
      .sort(sortByOrder)
      .map((item) => item.item_id)

    const items = Array.from(new Set([...currentItems, ...newItemIds]))

    const newOffset = items.length

    yield put({
      type: MYLIST_SEARCH_SUCCESS,
      items,
      itemsById,
      subset: 'search',
      filter,
      total,
      query,
      offset: newOffset,
      since
    })
  } catch (error) {
    console.log(error)
    yield put({ type: MYLIST_SEARCH_FAILURE, error })
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */
/**
 * fetchDiscoverData
 * Make wand async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchMyListSearch(params) {
  try {
    const response = await searchMyList(params)
    if (!response.list) return { error: 'No Items Returned' }

    const { total, since } = response

    const derivedItems = await deriveMyListItems(Object.values(response.list))
    const itemsById = arrayToObject(derivedItems, 'item_id')

    return { itemsById, total, since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
