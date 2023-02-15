import { put, takeEvery } from 'redux-saga/effects'

// Client API actions
import { READ_ITEM_SUCCESS } from 'actions'
import { READ_RECOMMENDED_REQUEST } from 'actions'
import { READ_RECOMMENDED_SUCCESS } from 'actions'
import { READ_RECOMMENDED_FAILURE } from 'actions'
import { getRelatedAfterArticle } from 'common/api/queries/get-related-after-article'

/** ACTIONS
 --------------------------------------------------------------- */
export const getReadRecommended = (id) => ({ type: READ_RECOMMENDED_REQUEST, id })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
//!! Note: This is all a stop gap until we can get proper item associations from the server for corpus items

export const itemsRelatedReducers = (state = {}, action) => {
  switch (action.type) {
    case READ_RECOMMENDED_SUCCESS: {
      const { id, relatedItems } = action
      return { ...state, [id]: relatedItems }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemsRelatedSagas = [
  // client-api
  takeEvery(READ_RECOMMENDED_REQUEST, readRecommendedRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* readRecommendedRequest({ id }) {
  try {
    const response = yield getRelatedAfterArticle(id)
    const { relatedArticlesById } = response

    yield put({
      type: READ_ITEM_SUCCESS,
      itemsById: relatedArticlesById,
      nodes: {}
    })

    yield put({
      type: READ_RECOMMENDED_SUCCESS,
      id,
      relatedItems: Object.keys(relatedArticlesById),
    })
  } catch (error) {
    yield put({ type: READ_RECOMMENDED_FAILURE, error })
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
