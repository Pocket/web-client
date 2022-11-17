import { put, takeEvery, select, call } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { arrayToObject } from 'common/utilities'

// V3 actions
import { ARTICLE_ITEM_REQUEST } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'
import { ARTICLE_ITEM_FAILURE } from 'actions'

import { ARTICLE_CONTENT_SUCCESS } from 'actions'
import { ARTICLE_CONTENT_FAILURE } from 'actions'

import { ANNOTATION_SAVE_REQUEST } from 'actions'
import { ANNOTATION_SAVE_SUCCESS } from 'actions'
import { ANNOTATION_SAVE_FAILURE } from 'actions'

import { ANNOTATION_DELETE_REQUEST } from 'actions'
import { ANNOTATION_DELETE_SUCCESS } from 'actions'
import { ANNOTATION_DELETE_FAILURE } from 'actions'

import { ITEMS_DELETE_SUCCESS } from 'actions'

import { ITEMS_FAVORITE_REQUEST } from 'actions'
import { ITEMS_FAVORITE_FAILURE } from 'actions'
import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_UNFAVORITE_FAILURE } from 'actions'

import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'

import { ITEMS_TAG_SEND } from 'actions'

import { API_ACTION_ADD_ANNOTATION } from 'common/constants'
import { API_ACTION_DELETE_ANNOTATION } from 'common/constants'

import { getArticleText } from 'common/api/_legacy/reader'
import { getArticleFromId } from 'common/api/_legacy/reader'
import { sendItemActions } from 'common/api/_legacy/item-actions'

import { deriveListItem } from 'common/api/derivers/item'

import { HYDRATE } from 'actions'
import { READER_CLEAR_DELETION } from 'actions'


/** ACTIONS
 --------------------------------------------------------------- */
export const itemDataRequest = (itemId) => ({ type: ARTICLE_ITEM_REQUEST, itemId }) //prettier-ignore
export const saveAnnotation = ({ itemId, quote, patch }) => ({ type: ANNOTATION_SAVE_REQUEST, item_id: itemId, quote, patch }) //prettier-ignore
export const deleteAnnotation = ({ itemId, annotation_id }) => ({ type: ANNOTATION_DELETE_REQUEST, item_id: itemId, annotation_id }) //prettier-ignore
export const clearDeletion = () => ({ type: READER_CLEAR_DELETION })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  articleState: 'pending',
  articleData: null,
  articleContent: null,
  favorite: null,
  tags: {},
  annotations: [],
  suggestedTags: [],

  lineHeight: 3,
  columnWidth: 3,
  fontSize: 3,
  fontFamily: 'blanco',
  sideBarOpen: false,
  deleted: false
}

export const readReducers = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_ITEM_SUCCESS: {
      const { item } = action
      return {
        ...state,
        articleData: item,
        favorite: item?.favorite,
        annotations: item?.annotations || [],
        tags: item?.tags || []
      }
    }

    case ARTICLE_CONTENT_SUCCESS: {
      const { article } = action
      return { ...state, articleContent: article }
    }

    case ANNOTATION_SAVE_SUCCESS: {
      const { annotations } = action
      return { ...state, annotations }
    }

    case ANNOTATION_DELETE_SUCCESS: {
      const { annotations } = action
      return { ...state, annotations }
    }

    // optimistic update
    case ITEMS_FAVORITE_REQUEST:
    case ITEMS_UNFAVORITE_FAILURE: {
      return { ...state, favorite: 1 }
    }
    // optimistic update
    case ITEMS_UNFAVORITE_REQUEST:
    case ITEMS_FAVORITE_FAILURE: {
      return { ...state, favorite: 0 }
    }
    // optimistic update
    case ITEMS_TAG_SEND: {
      const { tags } = action
      const newTags = tags.reduce((obj, key) => {
        return { ...obj, [key]: {} }
      }, {})
      return { ...state, tags: newTags }
    }

    case ITEMS_DELETE_SUCCESS: {
      const itemId = state.articleData?.item_id
      const { actions } = action
      const deletedItems = actions
        .filter((current) => {
          return current.action === 'delete' && current.item_id === itemId
        })
        .map((item) => item.item_id)

      const deleted = itemId && deletedItems.length

      return { ...state, deleted: !!deleted }
    }

    case READER_CLEAR_DELETION: {
      return { ...state, deleted: false }
    }

    case ARTICLE_ITEM_REQUEST: {
      return initialState
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { reader } = action.payload
      return { ...state, ...reader }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const readSagas = [
  // v3
  takeEvery(ARTICLE_ITEM_REQUEST, articleItemRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, articleContentRequest),
  takeEvery(ANNOTATION_SAVE_REQUEST, annotationSaveRequest),
  takeEvery(ANNOTATION_DELETE_REQUEST, annotationDeleteRequest),
  takeEvery(ITEMS_ARCHIVE_SUCCESS, redirectToList),
  takeEvery(ITEMS_UNARCHIVE_SUCCESS, redirectToList)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getAnnotations = (state) => state.reader.annotations

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* articleItemRequest({ itemId }) {
  try {
    const response = yield getArticleFromId(itemId)
    const item = response?.list[itemId]
    const { resolved_url: url } = item
    const derivedItem = deriveListItem(item, true)
    const itemsById = arrayToObject([derivedItem], 'itemId')

    if (item)
      return yield put({
        type: ARTICLE_ITEM_SUCCESS,
        item,
        itemId,
        url,
        itemsById
      })

    throw new Error('Item not in list')
  } catch (error) {
    yield put({ type: ARTICLE_ITEM_FAILURE, error })
  }
}

function* articleContentRequest({ url }) {
  try {
    const response = yield getArticleText(url)
    if (response?.status !== 1) throw new Error('Cannot get article text')

    const { article } = response
    yield put({ type: ARTICLE_CONTENT_SUCCESS, article })
  } catch (error) {
    yield put({ type: ARTICLE_CONTENT_FAILURE, error })
  }
}

function* annotationSaveRequest({ item_id, quote, patch }) {
  try {
    const annotation = {
      annotation_id: uuid(),
      version: '2',
      item_id,
      quote,
      patch
    }

    const storedAnnotations = yield select(getAnnotations)
    const annotations = [...storedAnnotations, annotation]

    // Update the server
    const actions = [
      {
        action: API_ACTION_ADD_ANNOTATION,
        cxt_view: 'reader',
        item_id,
        annotation
      }
    ]

    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ANNOTATION_SAVE_SUCCESS, annotations })
  } catch (error) {
    yield put({ type: ANNOTATION_SAVE_FAILURE, error })
  }
}

function* annotationDeleteRequest({ item_id, annotation_id }) {
  try {
    const storedAnnotations = yield select(getAnnotations)
    const annotations = storedAnnotations.filter(i => i.annotation_id !== annotation_id) //prettier-ignore

    // Update the server
    const actions = [
      {
        action: API_ACTION_DELETE_ANNOTATION,
        item_id,
        annotation_id
      }
    ]

    const data = yield call(sendItemActions, actions)

    if (data) return yield put({ type: ANNOTATION_DELETE_SUCCESS, annotations })
  } catch (error) {
    yield put({ type: ANNOTATION_DELETE_FAILURE, error })
  }
}

function redirectToList() {
  if (document.location.href.indexOf('/read/') !== -1) {
    // setup moment
    const getStarted = new URLSearchParams(window.location.search)?.has('getStarted')
    if (getStarted) return (document.location.href = '/home')

    // default behavior
    if (global.history.length > 1) {
      global.history.go(-1)
    } else {
      document.location.href = '/saves'
    }
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
