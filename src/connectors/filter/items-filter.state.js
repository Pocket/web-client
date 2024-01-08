import { put, call, select, takeEvery } from 'redux-saga/effects'

import { ITEMS_CLEAR_CURRENT } from 'actions'
import { ITEM_FILTER_UPDATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const updateFilter = (filter) => ({ type: ITEM_FILTER_UPDATE, filter })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  // queryString: null,
  // contentType: null, //'VIDEO' || 'ARTICLE'
  // domain: null,
  isFavorite: null // bool
  // status: null, //'UNREAD' || 'ARCHIVED'
  // tags: [],
  // title: null

  // sortBy: null, //'CREATED_AT' || 'TIME_TO_READ' || 'RELEVANCE' (premium search only)
}

export const itemsFilterReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_FILTER_UPDATE: {
      const { ...filter } = action?.filter
      return { ...state, ...filter }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemsFilterSagas = [takeEvery(ITEM_FILTER_UPDATE, itemFilterUpdate)]

/** SAGA :: SELECTORS
 --------------------------------------------------------------- */
const getSavedPageInfo = (state) => state.pageSavedInfo

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* itemFilterUpdate(action) {
  const { filter } = action
  const { searchTerm } = yield select(getSavedPageInfo)
  const sortOrder = 'DESC'

  // const filter = {
  //   isFavorite
  // }

  yield put({ type: ITEMS_CLEAR_CURRENT })
}
