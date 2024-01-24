import { put, call, takeEvery, select } from 'redux-saga/effects'
import { renameStoredTag } from 'common/api/_legacy/tags'
import { deleteStoredTag } from 'common/api/_legacy/tags'
import { getUserTags as getUserTagsGraph } from 'common/api/queries/get-user-tags'

import { USER_TAGS_PIN } from 'actions'
import { USER_TAGS_PINS_SET } from 'actions'

//Client API
import { USER_TAGS_REQUEST } from 'actions'
import { USER_TAGS_SUCCESS } from 'actions'
import { USER_TAGS_FAILURE } from 'actions'

import { USER_TAGS_EDIT } from 'actions'
import { USER_TAGS_EDIT_CONFIRM } from 'actions'
import { USER_TAGS_EDIT_CANCEL } from 'actions'
import { USER_TAGS_EDIT_SUCCESS } from 'actions'
import { USER_TAGS_EDIT_FAILURE } from 'actions'

import { USER_TAGS_DELETE } from 'actions'
import { USER_TAGS_DELETE_CONFIRM } from 'actions'
import { USER_TAGS_DELETE_CANCEL } from 'actions'
import { USER_TAGS_DELETE_SUCCESS } from 'actions'
import { USER_TAGS_DELETE_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const pinUserTag = (tag) => ({ type: USER_TAGS_PIN, tag })
export const editUserTag = (tag) => ({ type: USER_TAGS_EDIT, tag })
export const cancelEditUserTag = () => ({ type: USER_TAGS_EDIT_CANCEL })
export const confirmEditUserTag = (old_tag, new_tag, router) => ({ type: USER_TAGS_EDIT_CONFIRM, old_tag, new_tag, router}) //prettier-ignore
export const deleteUserTag = (tag) => ({ type: USER_TAGS_DELETE, tag })
export const cancelDeleteUserTag = () => ({ type: USER_TAGS_DELETE_CANCEL })
export const confirmDeleteUserTag = (tag, router) => ({ type: USER_TAGS_DELETE_CONFIRM, tag, router}) //prettier-ignore
export const requestUserTags = () => ({ type: USER_TAGS_REQUEST })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  tagNames: [],
  tagToEdit: false,
  tagToDelete: false
}

export const userTagsReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_TAGS_SUCCESS: {
      const { tagNames } = action
      return { ...state, tagNames }
    }

    case USER_TAGS_EDIT: {
      const { tag } = action
      return { ...state, tagToEdit: tag }
    }

    case USER_TAGS_EDIT_SUCCESS: {
      const { new_tag, old_tag } = action
      const tagNamesDraft = state.tagNames.map((tag) => {
        return tag === old_tag ? new_tag : tag
      })

      return {
        ...state,
        tagNames: tagNamesDraft,
        tagToEdit: false
      }
    }

    case USER_TAGS_EDIT_CANCEL:
    case USER_TAGS_EDIT_FAILURE: {
      return { ...state, tagToEdit: false }
    }

    case USER_TAGS_DELETE: {
      const { tag } = action
      return { ...state, tagToDelete: tag }
    }

    case USER_TAGS_DELETE_SUCCESS: {
      const deletedTag = state.tagToDelete
      const tagNamesDraft = state.tagNames.filter((tag) => tag !== deletedTag)

      return {
        ...state,
        tagNames: tagNamesDraft,
        tagToDelete: false
      }
    }

    case USER_TAGS_DELETE_FAILURE:
    case USER_TAGS_DELETE_CANCEL: {
      return { ...state, tagToDelete: false }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const userTagsSagas = [
  takeEvery(USER_TAGS_REQUEST, userTagsOnly),
  takeEvery(USER_TAGS_PIN, userTagsTogglePin),
  takeEvery(USER_TAGS_EDIT_CONFIRM, userTagsEditConfirm),
  takeEvery(USER_TAGS_DELETE_CONFIRM, userTagsDeleteConfirm)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getPinnedTags = (state) => state.settings.pinnedTags

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* userTagsOnly() {
  // This will need to be part of the larger request organization
  const response = yield getUserTagsGraph()

  if (!response) yield put({ type: USER_TAGS_FAILURE })

  const { tagNames } = response
  yield put({ type: USER_TAGS_SUCCESS, tagNames })
}

function* userTagsTogglePin(actions) {
  const { tag } = actions
  const storedTags = yield select(getPinnedTags)
  const isPinned = storedTags.includes(tag)
  const tags = storedTags.slice()
  const pinnedTags = isPinned ? tags.filter((current) => current !== tag) : [...tags, tag]

  yield put({ type: USER_TAGS_PINS_SET, pinnedTags })
}

function* userTagsEditConfirm(action) {
  const { new_tag, old_tag, router } = action
  const data = yield call(renameStoredTag, { new_tag, old_tag })

  if (data) {
    const pinnedItems = yield select(getPinnedTags)
    const pinnedTags = pinnedItems.map((pin) => (old_tag === pin ? new_tag : pin)) //prettier-ignore
    yield put({ type: USER_TAGS_EDIT_SUCCESS, new_tag, old_tag, pinnedTags }) //prettier-ignore
    return yield call(router.replace, `/saves/tags/${encodeURIComponent(new_tag)}`)
  }

  return yield put({ type: USER_TAGS_EDIT_FAILURE, old_tag })
}

function* userTagsDeleteConfirm(action) {
  const { tag, router } = action
  const data = yield call(deleteStoredTag, tag)

  if (data) {
    const pinnedItems = yield select(getPinnedTags)
    const pinnedTags = pinnedItems.filter((pin) => pin !== tag)
    yield put({ type: USER_TAGS_DELETE_SUCCESS, tag, pinnedTags })
    return yield call(router.replace, '/saves/tags')
  }

  return yield put({ type: USER_TAGS_DELETE_FAILURE, tag })
}
