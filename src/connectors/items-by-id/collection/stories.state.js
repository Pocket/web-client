import { put, takeEvery } from 'redux-saga/effects'
import { saveItem as saveItemAPI } from 'common/api/_legacy/saveItem'
import { deriveStory } from 'common/api/derivers/item'
import { arrayToObject } from 'common/utilities/object-array/object-array'

import { COLLECTION_STORIES_REQUEST } from 'actions'
import { COLLECTION_STORIES_HYDRATE } from 'actions'
import { COLLECTION_STORIES_HYDRATE_SUCCESS } from 'actions'
import { COLLECTION_STORIES_HYDRATE_FAILURE } from 'actions'
import { COLLECTION_STORIES_SAVE_REQUEST } from 'actions'
import { COLLECTION_STORIES_SAVE_SUCCESS } from 'actions'
import { COLLECTION_STORIES_SAVE_FAILURE } from 'actions'
import { COLLECTION_STORIES_NO_IMAGE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getCollectionsStories = () => ({ type: COLLECTION_STORIES_REQUEST })
export const hydrateStories = (stories) => ({ type: COLLECTION_STORIES_HYDRATE, stories }) //prettier-ignore
export const saveStory = (id, url) => ({type: COLLECTION_STORIES_SAVE_REQUEST, id, url}) //prettier-ignore
export const setNoImage = (id) => ({ type: COLLECTION_STORIES_NO_IMAGE, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const collectionStoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_STORIES_HYDRATE_SUCCESS: {
      const { storiesById } = action
      return { ...state, ...storiesById }
    }

    case COLLECTION_STORIES_SAVE_REQUEST: {
      const { id } = action
      return updateSaveStatus(state, id, 'saving')
    }

    case COLLECTION_STORIES_SAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case COLLECTION_STORIES_SAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case COLLECTION_STORIES_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { collectionStoriesById } = action.payload
      return { ...state, ...collectionStoriesById }
    }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, saveStatus) {
  const updatedItem = { ...state[id], saveStatus }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const collectionStoriesSagas = [
  takeEvery(COLLECTION_STORIES_SAVE_REQUEST, storiesSaveRequest),
  takeEvery(COLLECTION_STORIES_HYDRATE, storiesDerive)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* storiesSaveRequest(action) {
  try {
    const { url, id } = action

    const response = yield saveItemAPI(url)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: COLLECTION_STORIES_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: COLLECTION_STORIES_SAVE_FAILURE, error })
  }
}

function* storiesDerive(action) {
  try {
    const { stories } = action
    const derivedStories = stories.map((story) => deriveStory(story))
    const storiesById = arrayToObject(derivedStories, 'itemId')

    yield put({ type: COLLECTION_STORIES_HYDRATE_SUCCESS, storiesById })
  } catch (error) {
    yield put({ type: COLLECTION_STORIES_HYDRATE_FAILURE, error })
  }
}
