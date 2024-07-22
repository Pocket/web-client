import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getCorpusSearch } from 'common/api/queries/get-corpus-search'

import { CORPUS_SEARCH_REQUEST } from 'actions'
import { CORPUS_SEARCH_FAILURE } from 'actions'
import { CORPUS_SEARCH_SUCCESS } from 'actions'
import { CORPUS_SEARCH_DISMISS } from 'actions'
import { CORPUS_SEARCH_PAGE_INFO_SUCCESS } from 'actions'
import { HYDRATE_CORPUS_SEARCH } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const requestSearch = (query, language) => ({ type: CORPUS_SEARCH_REQUEST, query, language })
export const hydrateSearchResults = (response) => ({ type: HYDRATE_CORPUS_SEARCH, response })

/** REDUCERS
 --------------------------------------------------------------- */
export const pageSearchIdsReducers = (state = [], action) => {
  switch (action.type) {
    case CORPUS_SEARCH_SUCCESS: {
      return [...action.itemIds]
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
export const pageSearchInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case CORPUS_SEARCH_PAGE_INFO_SUCCESS: {
      const { pageInfo } = action
      return { ...pageInfo, error: false, loading: false }
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
  takeEvery(HYDRATE_CORPUS_SEARCH, hydrateSearch)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* searchRequest({ query, language }) {
  try {
    const response = yield getSearchResults(query, language)
    yield hydrateSearch(response)
  } catch (error) {
    yield put({ type: CORPUS_SEARCH_FAILURE, error })
  }
}

function* hydrateSearch({ response }) {
  try {
    const { itemsById, itemIds, pageInfo } = response

    yield put({ type: CORPUS_SEARCH_SUCCESS, itemIds, itemsById })
    yield put({ type: CORPUS_SEARCH_PAGE_INFO_SUCCESS, pageInfo })
    return
  } catch (error) {
    yield put({ type: CORPUS_SEARCH_FAILURE, error })
  }
}
/**
 * ASYNC CALLS
 --------------------------------------------------------------- */
export async function getSearchResults(query, language) {
  try {
    const response = await getCorpusSearch({ search: { query }, filter: { language } })

    // If things don't go right
    if (response.error) throw new Error(response.error)

    return response
  } catch (error) {
    return { error }
  }
}
