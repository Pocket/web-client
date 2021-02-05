import { getRecentSearches, saveRecentSearches } from 'common/api/search'
import { put, takeLatest, call } from 'redux-saga/effects'

import { USER_SEARCH_RECENT_GET } from 'actions'
import { USER_SEARCH_RECENT_SET } from 'actions'
import { USER_SEARCH_RECENT_SAVE } from 'actions'

const initialState = {
  recent: []
}

/** ACTIONS
 --------------------------------------------------------------- */
export const getRecentSearch = () => ({ type: USER_SEARCH_RECENT_GET}) //prettier-ignore
export const setRecentSearch = (recent_searches) => ({ type: USER_SEARCH_RECENT_SET, recent_searches }) //prettier-ignore
export const saveRecentSearch = (searchTerm) => ({ type: USER_SEARCH_RECENT_SAVE, searchTerm }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
export const userSearchReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SEARCH_RECENT_SET: {
      const { recent_searches } = action
      const recent = recent_searches
        .sort((itemA, itemB) => itemA.sort_id < itemB.sort_id)
        .map((item) => item.search)
      return { recent }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const userSearchSagas = [
  takeLatest(USER_SEARCH_RECENT_GET, recentSearchRequest),
  takeLatest(USER_SEARCH_RECENT_SAVE, recentSearchSave)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* recentSearchRequest() {
  // Grab Recent Searches
  const response = yield getRecentSearches()
  if (response.xErrorCode) return false

  const { recent_searches } = response
  if (recent_searches) {
    return yield put({ type: USER_SEARCH_RECENT_SET, recent_searches })
  }
}

function* recentSearchSave(action) {
  const { searchTerm } = action
  const response = yield call(saveRecentSearches, searchTerm)
  console.log(response)
}
