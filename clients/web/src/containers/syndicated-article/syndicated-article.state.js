import { put, takeEvery } from 'redux-saga/effects'
import {
  ARTICLE_HYDRATE,
  ARTICLE_SAVE_REQUEST,
  ARTICLE_SAVE_SUCCESS,
  ARTICLE_SAVE_FAILURE,
  ARTICLE_UNSAVE_REQUEST,
  ARTICLE_UNSAVE_SUCCESS,
  ARTICLE_UNSAVE_FAILURE
} from 'actions'
import { getSyndicatedArticle } from 'common/api/queries/get-syndicated-article'
import { saveItem } from 'common/api/_legacy/saveItem'
import { removeItem } from 'common/api/_legacy/removeItem'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateArticle = (hydrated) => ({ type: ARTICLE_HYDRATE, hydrated }) //prettier-ignore
export const saveArticleItem = (url) => ({ type: ARTICLE_SAVE_REQUEST, url })
export const unSaveArticleItem = (id) => ({ type: ARTICLE_UNSAVE_REQUEST, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  articleData: {},
  saveStatus: 'unsaved'
}

export const syndicatedArticleReducers = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case ARTICLE_SAVE_REQUEST: {
      return { ...state, saveStatus: 'saving' }
    }

    case ARTICLE_SAVE_SUCCESS: {
      return { ...state, saveStatus: 'saved' }
    }

    case ARTICLE_SAVE_FAILURE: {
      return { ...state, saveStatus: 'unsaved' }
    }

    case ARTICLE_UNSAVE_SUCCESS: {
      return { ...state, saveStatus: 'unsaved' }
    }

    case ARTICLE_UNSAVE_FAILURE: {
      return { ...state, saveStatus: 'saved' }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { syndicatedArticle } = action.payload
      return { ...state, ...syndicatedArticle }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const syndicatedArticleSagas = [
  takeEvery(ARTICLE_SAVE_REQUEST, articleSaveRequest),
  takeEvery(ARTICLE_UNSAVE_REQUEST, articleUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* articleSaveRequest({ url }) {
  try {
    const response = yield saveItem(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: ARTICLE_SAVE_SUCCESS })
  } catch (error) {
    yield put({ type: ARTICLE_SAVE_FAILURE, error })
  }
}

function* articleUnSaveRequest({ id }) {
  try {
    const response = yield removeItem(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: ARTICLE_UNSAVE_SUCCESS })
  } catch (error) {
    yield put({ type: ARTICLE_UNSAVE_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export function fetchArticleData(slug) {
  return getSyndicatedArticle(slug)
}

export function fetchHydrationData({ slug }) {
  return fetchArticleData(slug)
}
