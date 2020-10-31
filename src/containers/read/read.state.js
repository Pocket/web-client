import { put, takeEvery, select } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import {
  READER_HYDRATE,
  ARTICLE_ITEM_REQUESTED,
  ARTICLE_ITEM_SUCCESS,
  ARTICLE_ITEM_FAILURE,
  // ARTICLE_CONTENT_REQUESTED,
  ARTICLE_CONTENT_SUCCESS,
  ARTICLE_CONTENT_FAILURE,
  // SUGGESTED_TAGS_REQUEST,
  SUGGESTED_TAGS_SUCCESS,
  SUGGESTED_TAGS_FAILURE,
  ANNOTATION_SAVE_REQUEST,
  ANNOTATION_SAVE_SUCCESS,
  ANNOTATION_SAVE_FAILURE,
  UPDATE_LINE_HEIGHT,
  UPDATE_COLUMN_WIDTH,
  UPDATE_FONT_SIZE,
  UPDATE_FONT_TYPE,
  FRIENDS_SUCCESS,
  FRIENDS_FAILURE
} from 'actions'
import { API_ACTION_ADD_ANNOTATION } from 'common/constants'
import {
  getArticleText,
  getSuggestedTags,
  getRecentFriends,
  getArticleFromId
} from 'common/api/reader'

// import { saveItem } from 'common/api/saveItem'
// import { removeItem } from 'common/api/removeItem'
import { HYDRATE } from 'actions'

import {
  ITEM,
  TAG_LIST,
  ARTICLE,
  SUGGESTED_TAGS,
  FRIENDS
} from './mock-responses'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemDataRequested = (itemId) => ({
  type: ARTICLE_ITEM_REQUESTED,
  itemId
})
export const saveAnnotation = ({ item_id, quote, patch }) => ({
  type: ANNOTATION_SAVE_REQUEST,
  item_id,
  quote,
  patch
})
export const updateLineHeight = (lineHeight) => ({
  type: UPDATE_LINE_HEIGHT,
  lineHeight
})
export const updateColumnWidth = (columnWidth) => ({
  type: UPDATE_COLUMN_WIDTH,
  columnWidth
})
export const updateFontSize = (fontSize) => ({
  type: UPDATE_FONT_SIZE,
  fontSize
})
export const updateFontType = (fontFamily) => ({
  type: UPDATE_FONT_TYPE,
  fontFamily
})

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  articleData: null,
  articleContent: null,
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
      return { ...state, articleData: item }
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
      const { item } = action
      return { ...state, articleData: item }
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
  takeEvery(ARTICLE_ITEM_REQUESTED, articleItemRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, articleContentRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, suggestedTagsRequest),
  takeEvery(ARTICLE_ITEM_SUCCESS, friendsRequest),
  takeEvery(ANNOTATION_SAVE_REQUEST, annotationSaveRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getArticleData = (state) => state.reader.articleData

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* articleItemRequest({ itemId }) {
  try {
    const response = yield getArticleFromId(itemId)
    const item = response?.item[itemId]

    console.log(item)
    // yield put({ type: ARTICLE_ITEM_SUCCESS, item })
  } catch (error) {
    yield put({ type: ARTICLE_ITEM_FAILURE, error })
  }
}

function* articleContentRequest({ item }) {
  try {
    const url = item?.resolved_url
    const response = yield getArticleText(url)
    // if (!response.article) return console.log('No Content')
    // const article = response.article
    const article = ARTICLE.article

    yield put({ type: ARTICLE_CONTENT_SUCCESS, article })
  } catch (error) {
    yield put({ type: ARTICLE_CONTENT_FAILURE, error })
  }
}

function* suggestedTagsRequest({ item }) {
  try {
    const itemId = item?.item_id
    const response = yield getSuggestedTags(itemId)
    // if (!response.suggested_tags) return console.log('No Tags')
    // const tags = response.suggested_tags?.map(item => item.tag)
    const tags = SUGGESTED_TAGS.suggested_tags.map((item) => item.tag)

    yield put({ type: SUGGESTED_TAGS_SUCCESS, tags })
  } catch (error) {
    yield put({ type: SUGGESTED_TAGS_FAILURE, error })
  }
}

function* friendsRequest() {
  try {
    const response = yield getRecentFriends()
    // if (!response.auto_complete_emails && !response.recent_friends) return console.log('No Friends!')
    const recentFriends = FRIENDS?.recent_friends
    const autoCompleteEmails = FRIENDS?.auto_complete_emails
    yield put({ type: FRIENDS_SUCCESS, recentFriends, autoCompleteEmails })
  } catch (error) {
    yield put({ type: FRIENDS_FAILURE, error })
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

    const articleData = yield select(getArticleData)
    const list = articleData.annotations || []
    const item = {
      ...articleData,
      annotation: list.push(annotation)
    }

    // Update the server
    const actions = [
      {
        action: API_ACTION_ADD_ANNOTATION,
        item_id: articleData.item_id,
        annotation: annotation,
        cxt_view: 'reader'
      }
    ]

    // const response = yield sendItemAction(actions)

    yield put({ type: ANNOTATION_SAVE_SUCCESS, item })
  } catch (error) {
    yield put({ type: ANNOTATION_SAVE_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
