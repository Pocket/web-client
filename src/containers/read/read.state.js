import { put, takeEvery, select, call } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { arrayToObject } from 'common/utilities'

import { ARTICLE_ITEM_REQUEST } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'
import { ARTICLE_ITEM_FAILURE } from 'actions'

import { ARTICLE_CONTENT_SUCCESS } from 'actions'
import { ARTICLE_CONTENT_FAILURE } from 'actions'

import { SUGGESTED_TAGS_SUCCESS } from 'actions'
import { SUGGESTED_TAGS_FAILURE } from 'actions'

import { ANNOTATION_SAVE_REQUEST } from 'actions'
import { ANNOTATION_SAVE_SUCCESS } from 'actions'
import { ANNOTATION_SAVE_FAILURE } from 'actions'

import { ANNOTATION_DELETE_REQUEST } from 'actions'
import { ANNOTATION_DELETE_SUCCESS } from 'actions'
import { ANNOTATION_DELETE_FAILURE } from 'actions'

import { UPDATE_LINE_HEIGHT } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_FONT_TYPE } from 'actions'
import { FRIENDS_SUCCESS } from 'actions'
import { FRIENDS_FAILURE } from 'actions'

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

import { getArticleText } from 'common/api/reader'
import { getSuggestedTags } from 'common/api/reader'
import { getRecentFriends } from 'common/api/reader'
import { getArticleFromId } from 'common/api/reader'
import { sendItemActions } from 'common/api/item-actions'

import { deriveMyListItems } from 'connectors/items-by-id/my-list/items.derive'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemDataRequest = (itemId) => ({ type: ARTICLE_ITEM_REQUEST, itemId }) //prettier-ignore
export const saveAnnotation = ({ item_id, quote, patch }) => ({ type: ANNOTATION_SAVE_REQUEST, item_id, quote, patch }) //prettier-ignore
export const deleteAnnotation = ({ item_id, annotation_id }) => ({ type: ANNOTATION_DELETE_REQUEST, item_id, annotation_id }) //prettier-ignore
export const updateLineHeight = (lineHeight) => ({ type: UPDATE_LINE_HEIGHT, lineHeight }) //prettier-ignore
export const updateColumnWidth = (columnWidth) => ({ type: UPDATE_COLUMN_WIDTH, columnWidth }) //prettier-ignore
export const updateFontSize = (fontSize) => ({ type: UPDATE_FONT_SIZE, fontSize }) //prettier-ignore
export const updateFontType = (fontFamily) => ({ type: UPDATE_FONT_TYPE, fontFamily }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  articleState: 'pending',
  articleData: null,
  articleContent: null,
  tags: {},
  annotations: [],
  suggestedTags: [],
  lineHeight: 3,
  columnWidth: 3,
  fontSize: 3,
  fontFamily: 'blanco',
  autoCompleteEmails: null,
  recentFriends: null
}

export const readReducers = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_ITEM_SUCCESS: {
      const { item } = action
      return {
        ...state,
        articleData: item,
        annotations: item?.annotations || [],
        tags: item?.tags || {}
      }
    }

    case ARTICLE_CONTENT_SUCCESS: {
      const { article } = action
      return { ...state, articleContent: article }
    }

    case SUGGESTED_TAGS_SUCCESS: {
      const { tags } = action
      return { ...state, suggestedTags: tags }
    }

    case ANNOTATION_SAVE_SUCCESS: {
      const { annotations } = action
      return { ...state, annotations }
    }

    case ANNOTATION_DELETE_SUCCESS: {
      const { annotations } = action
      return { ...state, annotations }
    }

    case UPDATE_LINE_HEIGHT: {
      const { lineHeight } = action
      return { ...state, lineHeight }
    }

    case UPDATE_COLUMN_WIDTH: {
      const { columnWidth } = action
      return { ...state, columnWidth }
    }

    case UPDATE_FONT_SIZE: {
      const { fontSize } = action
      return { ...state, fontSize }
    }

    case UPDATE_FONT_TYPE: {
      const { fontFamily } = action
      return { ...state, fontFamily }
    }

    case FRIENDS_SUCCESS: {
      const { autoCompleteEmails, recentFriends } = action
      return { ...state, autoCompleteEmails, recentFriends }
    }

    // optimistic update
    case ITEMS_FAVORITE_REQUEST:
    case ITEMS_UNFAVORITE_FAILURE: {
      const articleData = { ...state.articleData, favorite: 1 }
      return { ...state, articleData }
    }
    // optimistic update
    case ITEMS_UNFAVORITE_REQUEST:
    case ITEMS_FAVORITE_FAILURE: {
      const articleData = { ...state.articleData, favorite: 0 }
      return { ...state, articleData }
    }
    // optimistic update
    case ITEMS_TAG_SEND: {
      const { tags } = action
      const newTags = tags.reduce((obj, key) => { return { ...obj, [key]:{} }}, {})
      return { ...state, tags: newTags }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { reader } = action.payload
      return { ...state, ...reader }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const readSagas = [
  takeEvery(ARTICLE_ITEM_REQUEST, articleItemRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, articleContentRequest),
  takeEvery(ANNOTATION_SAVE_REQUEST, annotationSaveRequest),
  takeEvery(ANNOTATION_DELETE_REQUEST, annotationDeleteRequest),
  takeEvery(ITEMS_DELETE_SUCCESS, redirectToList),
  takeEvery(ITEMS_ARCHIVE_SUCCESS, redirectToList),
  takeEvery(ITEMS_UNARCHIVE_SUCCESS, redirectToList)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getAnnotations = (state) => state.reader.annotations
const getPremiumStatus = (state) => parseInt(state.user.premium_status, 10) === 1 || false //prettier-ignore

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* articleItemRequest({ itemId }) {
  try {
    const response = yield getArticleFromId(itemId)
    const item = response?.item[itemId]
    const { resolved_url: url } = item
    const derivedItems = deriveMyListItems(Object.values(response.item))
    const itemsById = arrayToObject(derivedItems, 'item_id')

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
    document.location.href = '/my-list'
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
