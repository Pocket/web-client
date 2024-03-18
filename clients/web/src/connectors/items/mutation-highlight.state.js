import { put, call, select, takeEvery } from 'redux-saga/effects'

import { HIGHLIGHT_SAVE_REQUEST } from 'actions'
import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_SAVE_FAILURE } from 'actions'

import { HIGHLIGHT_DELETE_REQUEST } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_FAILURE } from 'actions'

import { MUTATION_SUCCESS } from 'actions'

import { createHighlight } from 'common/api/mutations/savedItemHighlights'
import { deleteHighlight } from 'common/api/mutations/savedItemHighlights'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationHighlightItem = ({ id, quote, patch }) => ({ type: HIGHLIGHT_SAVE_REQUEST, id, quote, patch }) //prettier-ignore
export const mutationHighlightDelete = ({ annotationId, savedItemId}) => ({ type: HIGHLIGHT_DELETE_REQUEST, annotationId, savedItemId}) //prettier-ignore

/** REDUCERS
  --------------------------------------------------------------- */
const initialState = {}
export const mutationHighlightReducers = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationHighlightSagas = [
  takeEvery(HIGHLIGHT_SAVE_REQUEST, highlightSaveRequest),
  takeEvery(HIGHLIGHT_DELETE_REQUEST, highlightDeleteRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getHighlights = (state, id) => state.itemsSaved[id]?.annotations?.highlights

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* highlightSaveRequest({ id, quote, patch }) {
  try {
    const highlight = {
      version: 2,
      itemId: id,
      quote,
      patch
    }

    const data = yield call(createHighlight, highlight)
    const storedHighlights = yield select(getHighlights, id)
    const highlights = [...storedHighlights, ...data]
    const node = { id, annotations: { highlights } }
    return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: HIGHLIGHT_SAVE_SUCCESS })
  } catch (error) {
    yield put({ type: HIGHLIGHT_SAVE_FAILURE, error })
  }
}

function* highlightDeleteRequest({ annotationId, savedItemId }) {
  try {
    // data === annotationId
    const data = yield call(deleteHighlight, annotationId)
    const storedHighlights = yield select(getHighlights, savedItemId)
    const highlights = storedHighlights.filter((i) => i.id !== data)

    const node = { id: savedItemId, annotations: { highlights } }
    return yield put({ type: MUTATION_SUCCESS, nodes: [node], actionType: HIGHLIGHT_DELETE_SUCCESS })
  } catch (error) {
    yield put({ type: HIGHLIGHT_DELETE_FAILURE, error })
  }
}
