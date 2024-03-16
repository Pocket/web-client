import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getSavedItemByItemId } from 'common/api/queries/get-saved-item-by-id'
import { deriveReaderItem } from 'common/api/derivers/item'

import { READ_ITEM_REQUEST } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { READ_ITEM_FAILURE } from 'actions'

import { READ_SET_HIGHLIGHTS } from 'actions'

import { TOGGLE_READER_SIDEBAR } from 'actions'
import { READER_CLEAR_DELETION } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getReadItem = (id) => ({ type: READ_ITEM_REQUEST, id })
export const setHighlightList = (highlightList) => ({ type: READ_SET_HIGHLIGHTS, highlightList })
export const toggleSidebar = () => ({ type: TOGGLE_READER_SIDEBAR })
export const clearDeletion = () => ({ type: READER_CLEAR_DELETION })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  sideBarOpen: false,
  deleted: false,
  highlightList: []
}

export const readerReducers = (state = initialState, action) => {
  switch (action.type) {
    case READ_SET_HIGHLIGHTS: {
      const { highlightList } = action
      return { ...state, highlightList }
    }

    case TOGGLE_READER_SIDEBAR: {
      return { ...state, sideBarOpen: !state.sideBarOpen }
    }
    case READER_CLEAR_DELETION: {
      return { ...state, deleted: false }
    }
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const readerSagas = [
  // client-api
  takeEvery(READ_ITEM_REQUEST, readItemRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* readItemRequest({ id }) {
  try {
    const response = yield getSavedItemByItemId(id)

    const { item, savedData, relatedArticlesById } = response
    const derivedItem = deriveReaderItem(item, savedData)
    const idKey = savedData.id
    const relatedArticleIds = Object.keys(relatedArticlesById)
    yield put({
      type: READ_ITEM_SUCCESS,
      relatedItems: { [idKey]: relatedArticleIds },
      itemsById: { [idKey]: derivedItem, ...relatedArticlesById },
      nodes: { [idKey]: savedData }
    })
  } catch (error) {
    yield put({ type: READ_ITEM_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
