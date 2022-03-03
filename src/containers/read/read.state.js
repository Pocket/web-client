import { put, takeEvery, select, call } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { arrayToObject } from 'common/utilities'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

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

import { HYDRATE_DISPLAY_SETTINGS } from 'actions'
import { UPDATE_LINE_HEIGHT } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_FONT_TYPE } from 'actions'

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

import { SNOWPLOW_SEND_EVENT } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemDataRequest = (itemId) => ({ type: ARTICLE_ITEM_REQUEST, itemId }) //prettier-ignore
export const saveAnnotation = ({ itemId, quote, patch }) => ({ type: ANNOTATION_SAVE_REQUEST, item_id: itemId, quote, patch }) //prettier-ignore
export const deleteAnnotation = ({ itemId, annotation_id }) => ({ type: ANNOTATION_DELETE_REQUEST, item_id: itemId, annotation_id }) //prettier-ignore
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
  favorite: null,
  tags: {},
  annotations: [],
  suggestedTags: [],
  lineHeight: 3,
  columnWidth: 3,
  fontSize: 3,
  fontFamily: 'blanco'
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

    case HYDRATE_DISPLAY_SETTINGS: {
      const { settings } = action
      return { ...state, ...settings }
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
  takeEvery(ARTICLE_ITEM_REQUEST, articleItemRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, hydrateDisplaySettings),
  takeEvery(ARTICLE_ITEM_SUCCESS, articleContentRequest),
  takeEvery(ANNOTATION_SAVE_REQUEST, annotationSaveRequest),
  takeEvery(ANNOTATION_DELETE_REQUEST, annotationDeleteRequest),
  takeEvery(ITEMS_DELETE_SUCCESS, redirectToList),
  takeEvery(ITEMS_ARCHIVE_SUCCESS, redirectToList),
  takeEvery(ITEMS_UNARCHIVE_SUCCESS, redirectToList),
  takeEvery(UPDATE_LINE_HEIGHT, saveDisplaySettings),
  takeEvery(UPDATE_COLUMN_WIDTH, saveDisplaySettings),
  takeEvery(UPDATE_FONT_SIZE, saveDisplaySettings),
  takeEvery(UPDATE_FONT_TYPE, saveDisplaySettings)
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
    if (global.history.length > 1) {
      global.history.go(-1)
    } else {
      document.location.href = '/my-list'
    }
  }
}

function* hydrateDisplaySettings() {
  const displaySettings = ['lineHeight', 'columnWidth', 'fontSize', 'fontFamily']

  const settings = displaySettings.reduce((obj, val) => {
    obj[val] = localStore.getItem(val) || initialState[val]
    return obj
  }, {})

  yield put({ type: HYDRATE_DISPLAY_SETTINGS, settings })
}

function* saveDisplaySettings({ type, ...settings }) {
  yield Object.keys(settings).forEach((val) => {
    localStore.setItem(val.toString(), settings[val])
  })

  const identifier = 'reader.display'
  const data = Object.keys(settings).map((label) => ({
    value: settings[label]?.toString(),
    label
  }))
  yield put({ type: SNOWPLOW_SEND_EVENT, identifier, data })
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
