import { takeEvery } from 'redux-saga/effects'
import { ARTICLE_HYDRATE, ARTICLE_GET_PONG } from 'actions'
import { getSyndicatedArticle } from 'common/api/queries/get-syndicated-article'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateArticle = (hydrated) => ({ type: ARTICLE_HYDRATE, hydrated }) //prettier-ignore
export const callGetPong = () => ({ type: ARTICLE_GET_PONG })

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
export const syndicatedArticleSagas = [takeEvery(ARTICLE_GET_PONG, articleGetPong)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* articleGetPong() {
  yield fetch('/api/pong/get', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ pongs: ['rightRail', 'rightRail2'], keywords: [] })
  })
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export function fetchArticleData(slug) {
  return getSyndicatedArticle(slug)
}

export function fetchHydrationData({ slug }) {
  return fetchArticleData(slug)
}
