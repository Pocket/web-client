// !! NOTE: Used search specific saved item state here

import { put, select, takeEvery } from 'redux-saga/effects'

// Client API actions
import { itemFiltersFromGraph } from 'common/api/queries/get-saved-items.filters'

import { SEARCH_SAVED_ITEMS } from 'actions'
import { SEARCH_SAVED_ITEMS_UNREAD } from 'actions'
import { SEARCH_SAVED_ITEMS_ARCHIVED } from 'actions'
import { SEARCH_SAVED_ITEMS_FAVORITES } from 'actions'

import { SEARCH_SAVES_REQUEST } from 'actions'
import { SEARCH_SAVES_FAILURE } from 'actions'
import { SEARCH_SAVES_SUCCESS } from 'actions'

import { SEARCH_SAVES_LOAD_MORE } from 'actions'
import { SEARCH_SAVES_LOAD_PREVIOUS } from 'actions'
import { SEARCH_SAVES_PAGE_INFO_SUCCESS } from 'actions'
import { SEARCH_SAVES_HYDRATE } from 'actions'

// Special Hydrate
import { HYDRATE } from 'actions'
import { getSavedItems } from 'common/api/queries/get-saved-items'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestSavesSearch = (query, language, cursor, filter) => ({ type: SEARCH_SAVES_REQUEST, query, language, cursor, filter }) //prettier-ignore
export const loadMoreSavesSearch = () => ({ type: SEARCH_SAVES_LOAD_MORE })
export const loadPreviousSavesSearch = () => ({ type: SEARCH_SAVES_LOAD_PREVIOUS })
export const hydrateSavesSearch = (response) => ({ type: SEARCH_SAVES_HYDRATE, response })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageSearchSavesIdsReducers = (state = [], action) => {
  switch (action.type) {
    case SEARCH_SAVES_REQUEST: {
      return []
    }

    case SEARCH_SAVES_SUCCESS: {
      const { itemIds } = action
      const updatedItemIds = new Set([...state, ...itemIds])
      return Array.from(updatedItemIds)
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageSearchIds } = action.payload
      return pageSearchIds
    }

    default:
      return state
  }
}

/** PAGINATION REDUCERS
 --------------------------------------------------------------- */
export const pageSearchSavesInfoReducers = (
  state = { loading: true, startCursor: false },
  action
) => {
  switch (action.type) {
    case SEARCH_SAVES_REQUEST: {
      return { loading: true, startCursor: false }
    }

    case SEARCH_SAVES_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      return { ...state, ...pageInfo, error: false, loading: false }
    }

    case SEARCH_SAVES_LOAD_MORE: {
      return { ...state, startCursor: state.endCursor, loading: true }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageSearchInfo } = action.payload
      return pageSearchInfo
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageSearchSavesSagas = [
  takeEvery(SEARCH_SAVES_REQUEST, searchRequest),
  takeEvery(SEARCH_SAVES_LOAD_MORE, searchLoadMore),
  takeEvery(SEARCH_SAVES_HYDRATE, hydrateSearch)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSearchPageInfo = (state) => state.pageSearchInfo

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* searchLoadMore() {
  try {
    const { endCursor: cursor, query, language } = yield select(getSearchPageInfo)
    const response = yield getSearchResults(query, language, cursor)
    yield hydrateSearch({ response, query, language })
  } catch (error) {
    yield put({ type: SEARCH_SAVES_FAILURE, error })
  }
}

function* searchRequest({ query, language, cursor, filter }) {
  try {
    const response = yield getSearchResults(query, language, cursor, filter)

    yield hydrateSearch({ response, query, language })
  } catch (error) {
    yield put({ type: SEARCH_SAVES_FAILURE, error })
  }
}

function* hydrateSearch({ response, query, language }) {
  try {
    const { itemsById, itemIds, pageInfo } = response
    const endOfList = pageInfo?.endCursor === null
    yield put({ type: SEARCH_SAVES_SUCCESS, itemIds, itemsById })
    yield put({
      type: SEARCH_SAVES_PAGE_INFO_SUCCESS,
      pageInfo: { ...pageInfo, query, language, endOfList }
    })
    return
  } catch (error) {
    yield put({ type: SEARCH_SAVES_FAILURE, error })
  }
}
/**
 * ASYNC CALLS
 --------------------------------------------------------------- */
export async function getSearchResults(query, language, cursor, filter) {
  try {
    const response = await getSavedItems({
      search: { query },
      filter: { language },
      ...(cursor && { pagination: { after: cursor } })
    })

    // If things don't go right
    if (response.error) throw new Error(response.error)

    return response
  } catch (error) {
    return { error }
  }
}
