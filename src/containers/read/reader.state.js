import { put, takeEvery, select, call } from 'redux-saga/effects'
import { arrayToObject } from 'common/utilities'

// Client API actions
import { getSavedItemByItemId } from 'common/api'

import { createHighlight } from 'common/api'
import { deleteHighlight } from 'common/api'
import { deriveReaderItem } from 'common/api/derivers/item'

import { READ_ITEM_REQUEST } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { READ_ITEM_FAILURE } from 'actions'

import { READ_SET_HIGHLIGHTS } from 'actions'

import { HIGHLIGHT_SAVE_REQUEST } from 'actions'
import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_SAVE_FAILURE } from 'actions'

import { HIGHLIGHT_DELETE_REQUEST } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getReadItem = (id) => ({ type: READ_ITEM_REQUEST, id })
export const setHighlightList = (highlightList) => ({ type: READ_SET_HIGHLIGHTS, highlightList })
export const saveHighlightRequest = ({ id, quote, patch }) => ({ type: HIGHLIGHT_SAVE_REQUEST, id, quote, patch }) //prettier-ignore
export const deleteHighlightRequest = ({ annotationId }) => ({ type: HIGHLIGHT_DELETE_REQUEST, annotationId }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  articleItem: null,
  highlightList: []
}

export const readerReducers = (state = initialState, action) => {
  switch (action.type) {
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

    const { item, savedData } = response
    const derivedItem = deriveReaderItem(item)
    const idKey = savedData.id

    yield put({
      type: READ_ITEM_SUCCESS,
      itemsById: { [idKey]: derivedItem },
      nodes: { [idKey]: savedData }
    })
  } catch (error) {
    yield put({ type: READ_ITEM_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
