import { put, call, select, takeLatest } from 'redux-saga/effects'

import { GET_ITEMS_FILTERED } from 'actions'
import { ITEMS_CLEAR_CURRENT } from 'actions'
import { ITEM_FILTER_UPDATE } from 'actions'
import { ITEMS_SAVED_FILTERED_REQUEST } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const updateFilter = (filter) => ({ type: ITEM_FILTER_UPDATE, filter })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  searchTerm: null,

  // // filter
  // contentType: null, //'VIDEO' || 'ARTICLE'
  // domain: null,
  // isFavorite: null // bool
  // status: 'ALL', //'UNREAD' || 'ARCHIVED'
  tags: null,
  // title: null

  // // sort
  sortOrder: 'DESC' // 'ASC' || 'DESC'
  // sortBy: null //'CREATED_AT' || 'TIME_TO_READ' || 'RELEVANCE' (premium search only)
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
export const itemsFilterSagas = [takeLatest(ITEM_FILTER_UPDATE, itemFilterUpdate)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* itemFilterUpdate() {
  yield put({ type: ITEMS_SAVED_FILTERED_REQUEST, actionType: GET_ITEMS_FILTERED })
}
