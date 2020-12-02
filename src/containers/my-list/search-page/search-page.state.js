import { takeLatest, put, select } from 'redux-saga/effects'
import { getMyList } from 'common/api/my-list'
import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'
import { arrayToObject } from 'common/utilities'

import { MYLIST_SEARCH_REQUEST } from 'actions'
import { MYLIST_SEARCH_SUCCESS } from 'actions'
import { MYLIST_SEARCH_FAILURE } from 'actions'

import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_DELETE_SEND } from 'actions'
import { ITEMS_UNFAVORITE_REQUEST } from 'actions'

import { APP_SORT_ORDER_TOGGLE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getMylistSearchData = (count, offset, filter, query) => ({ type: MYLIST_SEARCH_REQUEST, count, offset, filter, query }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  query: undefined,
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
    const { count = 15, offset = 0, filter, query } = action
    const section = filter ? 'search' + filter : 'search'

    const parameters = { search: query }
    const sortOrder = yield select(getSortOrder)

    // Apply filters
    if (filter === 'active') parameters.state = 'unread'
    if (filter === 'archive') parameters.state = 'read'
    if (filter === 'favorites') parameters.favorite = 1

    const { itemsById, total, since, error } = yield fetchMyListData({
      count,
      offset,
      locale_lang: 'en-US',
      sort: sortOrder,
      ...parameters
    })

    if (error) return yield put({ type: MYLIST_SEARCH_FAILURE, error })

    const searchState = yield select(getCurrentState)
    const currentItems = searchState[section]
    console.log(currentItems)
    // console.log(itemsById, total, since, query)
    // const existingItemsById = yield select(getMyListItemsById)
    // const itemsByIdDraft = { ...existingItemsById, ...itemsById }

    // const filterFunction = filterSelector(subset, filter)

    // const sortFunction = sortSelector(subset, sortOrder) //TODO: hook this to selector
    // const items = Object.values(itemsByIdDraft)
    //   .filter((item) => filterFunction(item, tag))
    //   .sort(sortFunction)
    //   .map((item) => item.item_id)

    // const newOffset = offset + items?.length

    // yield put({
    //   type: MYLIST_SEARCH_SUCCESS,
    //   items,
    //   itemsById,
    //   offset: newOffset,
    //   subset,
    //   filter,
    //   tag,
    //   total,
    //   since
    // })
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
export async function fetchMyListData(params) {
  try {
    const response = await getMyList(params)
    if (!response.list) return { error: 'No Items Returned' }

    const total = response.total
    const since = response.since

    const derivedItems = await deriveMyListItems(Object.values(response.list))
    const itemsById = arrayToObject(derivedItems, 'item_id')

    return { itemsById, total, since }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.log('discover.state', error)
  }
}
