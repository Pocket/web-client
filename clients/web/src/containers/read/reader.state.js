import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { getSavedItemByItemId, getItemByReaderSlug } from 'common/api/queries/get-saved-item-by-id' //prettier-ignore
import { deriveReaderItem, deriveSharedItem } from 'common/api/derivers/item'

import { READ_ITEM_REQUEST } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { READ_ITEM_FAILURE } from 'actions'
import { SHARED_ITEM_SUCCESS } from 'actions'
import { READER_CLEAR_FAILURE } from 'actions'
import { READ_ITEM_RESOLVED } from 'actions'

import { TOGGLE_READER_SIDEBAR } from 'actions'
import { READER_CLEAR_DELETION } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getReadItem = (slug) => ({ type: READ_ITEM_REQUEST, slug })
export const toggleSidebar = () => ({ type: TOGGLE_READER_SIDEBAR })
export const clearDeletion = () => ({ type: READER_CLEAR_DELETION })
export const clearFailure = () => ({ type: READER_CLEAR_FAILURE })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  sideBarOpen: false,
  deleted: false,
  readFailure: false,
  idMap: {},
  highlightList: [],
  hasResolved: false
}

export const readerReducers = (state = initialState, action) => {
  switch (action.type) {
    case READ_ITEM_RESOLVED: {
      return { ...state, hasResolved: true }
    }

    case READ_ITEM_SUCCESS:
    case READ_ITEM_REQUEST: {
      const { idKey, slug } = action
      return { ...state, idMap: { ...state.idMap, [slug]: idKey } }
    }

    case TOGGLE_READER_SIDEBAR: {
      return { ...state, sideBarOpen: !state.sideBarOpen }
    }

    case READER_CLEAR_DELETION: {
      return { ...state, deleted: false }
    }

    case READ_ITEM_FAILURE: {
      return { ...state, readFailure: true, hasResolved: true }
    }

    case READER_CLEAR_FAILURE: {
      return { ...state, readFailure: false }
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
function* readItemRequest({ slug }) {
  try {
    const response = yield getSavedItemByItemId(slug)

    // If things don't go right
    if (response.error) throw new Error(response.error)

    // Did we open a shared link? If we did, let's populate
    // the state and send them on to `home`
    if (response.share) {
      const derivedShare = deriveSharedItem(response.share)
      yield put({
        type: SHARED_ITEM_SUCCESS,
        shareItem: response.share,
        itemsById: { [derivedShare.itemId]: derivedShare }
      })
      yield put({ type: READ_ITEM_RESOLVED })
      return
    }

    const { item, savedData, relatedArticlesById } = response
    const derivedItem = deriveReaderItem(item, savedData)
    const idKey = derivedItem.savedId
    const relatedArticleIds = Object.keys(relatedArticlesById)
    yield put({
      type: READ_ITEM_SUCCESS,
      relatedItems: { [idKey]: relatedArticleIds },
      itemsById: { [idKey]: derivedItem, ...relatedArticlesById },
      nodes: { [idKey]: savedData },
      idKey,
      slug
    })
    yield put({ type: READ_ITEM_RESOLVED })
  } catch (error) {
    yield put({ type: READ_ITEM_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export async function getReaderItemMeta(slug) {
  try {
    const response = await getItemByReaderSlug(slug)

    // If things don't go right
    if (!response || response?.error) throw new Error(response.error)

    const derivedShare = deriveSharedItem(response.share)
    return {
      shareItem: response.share,
      itemsById: { [derivedShare.itemId]: derivedShare }
    }
  } catch {
    return {
      error: 'Bad Response'
    }
  }
}
