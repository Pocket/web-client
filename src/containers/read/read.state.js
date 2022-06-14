import { put, takeEvery, select, call } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { arrayToObject } from 'common/utilities'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

// Settings actions
import { HYDRATE_DISPLAY_SETTINGS } from 'actions'
import { UPDATE_LINE_HEIGHT } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_FONT_TYPE } from 'actions'
import { TOGGLE_READER_SIDEBAR } from 'actions'

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
import { SNOWPLOW_SEND_EVENT } from 'actions'

// Client API actions
import { getSavedItemByItemId } from 'common/api'
import { itemFavorite } from 'common/api'
import { itemUnFavorite } from 'common/api'
import { itemArchive } from 'common/api'
import { itemUnArchive } from 'common/api'
import { createHighlight } from 'common/api'
import { deleteHighlight } from 'common/api'

import { READ_ITEM_REQUEST } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { READ_ITEM_FAILURE } from 'actions'

import { READ_FAVORITE_REQUEST } from 'actions'
import { READ_FAVORITE_SUCCESS } from 'actions'
import { READ_FAVORITE_FAILURE } from 'actions'

import { READ_UNFAVORITE_REQUEST } from 'actions'
import { READ_UNFAVORITE_SUCCESS } from 'actions'
import { READ_UNFAVORITE_FAILURE } from 'actions'

import { MUTATION_DELETE_SUCCESS } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { READ_MUTATE_SAVED_DATA } from 'actions'

import { READ_ARCHIVE_REQUEST } from 'actions'
import { READ_ARCHIVE_SUCCESS } from 'actions'
import { READ_ARCHIVE_FAILURE } from 'actions'

import { READ_UNARCHIVE_REQUEST } from 'actions'
import { READ_UNARCHIVE_SUCCESS } from 'actions'
import { READ_UNARCHIVE_FAILURE } from 'actions'

import { READ_SET_HIGHLIGHTS } from 'actions'

import { HIGHLIGHT_SAVE_REQUEST } from 'actions'
import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_SAVE_FAILURE } from 'actions'

import { HIGHLIGHT_DELETE_REQUEST } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_FAILURE } from 'actions'

import { deriveReaderItem } from 'common/api/derivers/item'

/** ACTIONS
 --------------------------------------------------------------- */
// v3 actions
export const itemDataRequest = (itemId) => ({ type: ARTICLE_ITEM_REQUEST, itemId }) //prettier-ignore
export const saveAnnotation = ({ itemId, quote, patch }) => ({ type: ANNOTATION_SAVE_REQUEST, item_id: itemId, quote, patch }) //prettier-ignore
export const deleteAnnotation = ({ itemId, annotation_id }) => ({ type: ANNOTATION_DELETE_REQUEST, item_id: itemId, annotation_id }) //prettier-ignore
// client-api actions
export const getReadItem = (id) => ({ type: READ_ITEM_REQUEST, id }) //prettier-ignore
export const favoriteItem = (id) => ({ type: READ_FAVORITE_REQUEST, id }) //prettier-ignore
export const unFavoriteItem = (id) => ({ type: READ_UNFAVORITE_REQUEST, id }) //prettier-ignore
export const archiveItem = (id) => ({ type: READ_ARCHIVE_REQUEST, id }) //prettier-ignore
export const unArchiveItem = (id) => ({ type: READ_UNARCHIVE_REQUEST, id }) //prettier-ignore
export const setHighlightList = (highlightList) => ({ type: READ_SET_HIGHLIGHTS, highlightList }) //prettier-ignore
export const saveHighlightRequest = ({ id, quote, patch }) => ({ type: HIGHLIGHT_SAVE_REQUEST, id, quote, patch }) //prettier-ignore
export const deleteHighlightRequest = ({ annotationId }) => ({ type: HIGHLIGHT_DELETE_REQUEST, annotationId }) //prettier-ignore
// Settings actions
export const updateLineHeight = (lineHeight) => ({ type: UPDATE_LINE_HEIGHT, lineHeight }) //prettier-ignore
export const updateColumnWidth = (columnWidth) => ({ type: UPDATE_COLUMN_WIDTH, columnWidth }) //prettier-ignore
export const updateFontSize = (fontSize) => ({ type: UPDATE_FONT_SIZE, fontSize }) //prettier-ignore
export const updateFontType = (fontFamily) => ({ type: UPDATE_FONT_TYPE, fontFamily }) //prettier-ignore
export const toggleSidebar = () => ({ type: TOGGLE_READER_SIDEBAR }) //prettier-ignore

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

  articleItem: null,
  savedData: null,
  highlightList: []
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

    case READ_ITEM_SUCCESS: {
      const { item, savedData } = action
      return { ...state, articleItem: item, savedData }
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

    case TOGGLE_READER_SIDEBAR: {
      return { ...state, sideBarOpen: !state.sideBarOpen }
    }

    case READ_FAVORITE_SUCCESS:
    case READ_UNFAVORITE_SUCCESS: {
      const { node } = action
      const savedData = { ...state.savedData, ...node }
      return { ...state, savedData }
    }

    case READ_MUTATE_SAVED_DATA: {
      const { savedData } = action
      return { ...state, savedData }
    }

    case READ_SET_HIGHLIGHTS: {
      const { highlightList } = action
      return { ...state, highlightList }
    }

    case HIGHLIGHT_SAVE_SUCCESS:
    case HIGHLIGHT_DELETE_SUCCESS: {
      const { highlights } = action
      const savedData = {
        ...state.savedData,
        annotations: {
          highlights
        }
      }
      return { ...state, savedData }
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

    case ARTICLE_ITEM_REQUEST:
    case READ_ITEM_REQUEST: {
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
  takeEvery(ARTICLE_ITEM_SUCCESS, hydrateDisplaySettings),
  takeEvery(ARTICLE_ITEM_SUCCESS, articleContentRequest),
  takeEvery(ANNOTATION_SAVE_REQUEST, annotationSaveRequest),
  takeEvery(ANNOTATION_DELETE_REQUEST, annotationDeleteRequest),
  takeEvery(ITEMS_DELETE_SUCCESS, redirectToList),
  takeEvery(ITEMS_ARCHIVE_SUCCESS, redirectToList),
  takeEvery(ITEMS_UNARCHIVE_SUCCESS, redirectToList),
  // settings
  takeEvery(UPDATE_LINE_HEIGHT, saveDisplaySettings),
  takeEvery(UPDATE_COLUMN_WIDTH, saveDisplaySettings),
  takeEvery(UPDATE_FONT_SIZE, saveDisplaySettings),
  takeEvery(UPDATE_FONT_TYPE, saveDisplaySettings),
  // client-api
  takeEvery(READ_ITEM_REQUEST, readItemRequest),
  takeEvery(READ_FAVORITE_REQUEST, readFavoriteRequest),
  takeEvery(READ_UNFAVORITE_REQUEST, readUnFavoriteRequest),
  takeEvery(MUTATION_DELETE_SUCCESS, redirectToList),
  takeEvery(READ_ARCHIVE_REQUEST, readArchiveRequest),
  takeEvery(READ_ARCHIVE_SUCCESS, redirectToList),
  takeEvery(READ_UNARCHIVE_REQUEST, readUnArchiveRequest),
  takeEvery(READ_UNARCHIVE_SUCCESS, redirectToList),
  takeEvery(HIGHLIGHT_SAVE_REQUEST, highlightSaveRequest),
  takeEvery(HIGHLIGHT_DELETE_REQUEST, highlightDeleteRequest),
  takeEvery(MUTATION_SUCCESS, checkMutations)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getAnnotations = (state) => state.reader.annotations
const getHighlights = (state) => state.reader.savedData?.annotations?.highlights
const getSavedData = (state) => state.reader.savedData

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

function* readItemRequest({ id }) {
  try {
    const response = yield getSavedItemByItemId(id)

    const { item, savedData } = response
    const derivedItem = deriveReaderItem(item)

    yield put({ type: READ_ITEM_SUCCESS, item: derivedItem, savedData })
  } catch (error) {
    yield put({ type: READ_ITEM_FAILURE, error })
  }
}

function* readFavoriteRequest({ id }) {
  const node = yield call(itemFavorite, id)
  return yield put({ type: READ_FAVORITE_SUCCESS, node })
}

function* readUnFavoriteRequest({ id }) {
  const node = yield call(itemUnFavorite, id)
  return yield put({ type: READ_UNFAVORITE_SUCCESS, node })
}

function* readArchiveRequest({ id }) {
  const node = yield call(itemArchive, id)
  return yield put({ type: READ_ARCHIVE_SUCCESS, node })
}

function* readUnArchiveRequest({ id }) {
  const node = yield call(itemUnArchive, id)
  return yield put({ type: READ_UNARCHIVE_SUCCESS, node })
}

function* highlightSaveRequest({ id, quote, patch }) {
  try {
    const highlight = {
      version: 2,
      itemId: id,
      quote,
      patch
    }

    const data = yield call(createHighlight, highlight)
    const storedHighlights = yield select(getHighlights)
    const highlights = [...storedHighlights, ...data]

    return yield put({ type: HIGHLIGHT_SAVE_SUCCESS, highlights })
  } catch (error) {
    yield put({ type: HIGHLIGHT_SAVE_FAILURE, error })
  }
}

function* highlightDeleteRequest({ annotationId }) {
  try {
    // data === annotationId
    const data = yield call(deleteHighlight, annotationId)
    const storedHighlights = yield select(getHighlights)
    const highlights = storedHighlights.filter(i => i.id !== data) //prettier-ignore

    return yield put({ type: HIGHLIGHT_DELETE_SUCCESS, highlights })
  } catch (error) {
    yield put({ type: HIGHLIGHT_DELETE_FAILURE, error })
  }
}

function* checkMutations({ nodes }) {
  // if not on reader -or- if bulk edit
  if (document.location.href.indexOf('/read/') === -1 || nodes.length > 1) return

  const oldSavedData = yield select(getSavedData)
  const savedData = { ...oldSavedData, ...nodes[0] }
  yield put({ type: READ_MUTATE_SAVED_DATA, savedData })
}

function redirectToList() {
  if (document.location.href.indexOf('/read/') !== -1) {
    // setup moment
    const getStarted = new URLSearchParams(window.location.search)?.has('getStarted')
    if (getStarted) return document.location.href = '/home'

    // default behavior
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
