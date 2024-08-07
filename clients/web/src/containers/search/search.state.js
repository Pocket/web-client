import { put, select, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getCorpusSearch } from 'common/api/queries/get-corpus-search'

import { CORPUS_SEARCH_REQUEST } from 'actions'
import { CORPUS_SEARCH_FAILURE } from 'actions'
import { CORPUS_SEARCH_SUCCESS } from 'actions'
import { CORPUS_SEARCH_DISMISS } from 'actions'
import { CORPUS_SEARCH_LOAD_MORE } from 'actions'
import { CORPUS_SEARCH_LOAD_PREVIOUS } from 'actions'
import { CORPUS_SEARCH_PAGE_INFO_SUCCESS } from 'actions'
import { HYDRATE_CORPUS_SEARCH } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestSearch = (query, language, cursor) => ({ type: CORPUS_SEARCH_REQUEST, query, language, cursor }) //prettier-ignore
export const loadMoreSearchItems = () => ({ type: CORPUS_SEARCH_LOAD_MORE })
export const loadPreviousSearchItems = () => ({ type: CORPUS_SEARCH_LOAD_PREVIOUS })
export const hydrateSearchResults = (response) => ({ type: HYDRATE_CORPUS_SEARCH, response })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageSearchIdsReducers = (state = [], action) => {
  switch (action.type) {
    case CORPUS_SEARCH_SUCCESS: {
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
export const pageSearchInfoReducers = (state = { loading: true, startCursor: false }, action) => {
  switch (action.type) {
    case CORPUS_SEARCH_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      return { ...state, ...pageInfo, error: false, loading: false }
    }

    case CORPUS_SEARCH_LOAD_MORE: {
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
export const pageSearchSagas = [
  takeEvery(CORPUS_SEARCH_REQUEST, searchRequest),
  takeEvery(CORPUS_SEARCH_LOAD_MORE, searchLoadMore),
  takeEvery(HYDRATE_CORPUS_SEARCH, hydrateSearch)
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
    yield put({ type: CORPUS_SEARCH_FAILURE, error })
  }
}

function* searchRequest({ query, language, cursor }) {
  try {
    const response = yield getSearchResults(query, language, cursor)

    yield hydrateSearch({ response, query, language })
  } catch (error) {
    yield put({ type: CORPUS_SEARCH_FAILURE, error })
  }
}

function* hydrateSearch({ response, query, language }) {
  try {
    const { itemsById, itemIds, pageInfo } = response
    const endOfList = pageInfo?.endCursor === null
    yield put({ type: CORPUS_SEARCH_SUCCESS, itemIds, itemsById })
    yield put({
      type: CORPUS_SEARCH_PAGE_INFO_SUCCESS,
      pageInfo: { ...pageInfo, query, language, endOfList }
    })
    return
  } catch (error) {
    yield put({ type: CORPUS_SEARCH_FAILURE, error })
  }
}
/**
 * ASYNC CALLS
 --------------------------------------------------------------- */
export async function getSearchResults(query, language, cursor) {
  try {
    const response = await getCorpusSearch({
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
