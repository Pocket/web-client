import { put, select, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getCorpusSearch } from 'common/api/queries/get-corpus-search'

import { SEARCH_CORPUS_REQUEST } from 'actions'
import { SEARCH_CORPUS_FAILURE } from 'actions'
import { SEARCH_CORPUS_SUCCESS } from 'actions'
import { SEARCH_CORPUS_PAGE_INFO_SUCCESS } from 'actions'
import { SEARCH_CORPUS_LOAD_MORE } from 'actions'
import { SEARCH_CORPUS_HYDRATE } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestCorpusSearch = (query, language, cursor) => ({ type: SEARCH_CORPUS_REQUEST, query, language, cursor }) //prettier-ignore
export const loadMoreSearchItems = () => ({ type: SEARCH_CORPUS_LOAD_MORE })
export const loadPreviousSearchItems = () => ({ type: SEARCH_CORPUS_LOAD_MORE })
export const hydrateSearchResults = (response) => ({ type: SEARCH_CORPUS_HYDRATE, response })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageSearchCorpusIdsReducers = (state = [], action) => {
  switch (action.type) {
    case SEARCH_CORPUS_REQUEST: {
      return []
    }

    case SEARCH_CORPUS_SUCCESS: {
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
export const pageSearchCorpusInfoReducers = (
  state = { loading: true, startCursor: false },
  action
) => {
  switch (action.type) {
    case SEARCH_CORPUS_REQUEST: {
      return { loading: true, startCursor: false, error: false }
    }

    case SEARCH_CORPUS_FAILURE: {
      return { ...state, loading: false, error: true }
    }

    case SEARCH_CORPUS_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      return { ...state, ...pageInfo, error: false, loading: false }
    }

    case SEARCH_CORPUS_LOAD_MORE: {
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
export const pageSearchCorpusSagas = [
  takeEvery(SEARCH_CORPUS_REQUEST, searchRequest),
  takeEvery(SEARCH_CORPUS_LOAD_MORE, searchLoadMore),
  takeEvery(SEARCH_CORPUS_HYDRATE, hydrateSearch)
]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSearchPageInfo = (state) => state.pageSearchCorpusInfo

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* searchLoadMore() {
  try {
    const { endCursor: cursor, query, language } = yield select(getSearchPageInfo)
    const response = yield getSearchResults(query, language, cursor)
    yield hydrateSearch({ response, query, language })
  } catch (error) {
    yield put({ type: SEARCH_CORPUS_FAILURE, error })
  }
}

function* searchRequest({ query, language, cursor }) {
  try {
    const response = yield getSearchResults(query, language, cursor)

    yield hydrateSearch({ response, query, language })
  } catch (error) {
    yield put({ type: SEARCH_CORPUS_FAILURE, error })
  }
}

function* hydrateSearch({ response, query, language }) {
  try {
    const { itemsById, itemIds, pageInfo } = response
    const endOfList = pageInfo?.endCursor === null
    yield put({ type: SEARCH_CORPUS_SUCCESS, itemIds, itemsById })
    yield put({
      type: SEARCH_CORPUS_PAGE_INFO_SUCCESS,
      pageInfo: { ...pageInfo, query, language, endOfList }
    })
    return
  } catch (error) {
    yield put({ type: SEARCH_CORPUS_FAILURE, error })
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
