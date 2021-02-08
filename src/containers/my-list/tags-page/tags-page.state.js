import { put, call, takeEvery, select } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { fetchStoredTags } from 'common/api/tags'
import { renameStoredTag } from 'common/api/tags'
import { deleteStoredTag } from 'common/api/tags'
import { fetchMyListData } from 'containers/my-list/my-list.state'

import { USER_TAGS_GET_REQUEST } from 'actions'
import { USER_TAGS_GET_SUCCESS } from 'actions'
import { USER_TAGS_GET_FAILURE } from 'actions'
import { USER_TAGS_ITEM_SUCCESS } from 'actions'
import { USER_TAGS_PIN } from 'actions'
import { USER_TAGS_PINS_SET } from 'actions'

import { USER_TAGS_HYDRATE } from 'actions'

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
export const getUserTags = () => ({ type: USER_TAGS_GET_REQUEST }) //prettier-ignore
export const pinUserTag = (tag) => ({ type: USER_TAGS_PIN, tag })
export const editUserTag = (tag) => ({ type: USER_TAGS_EDIT, tag })
export const cancelEditUserTag = () => ({ type: USER_TAGS_EDIT_CANCEL })
export const confirmEditUserTag = (old_tag, new_tag, router) => ({ type: USER_TAGS_EDIT_CONFIRM, old_tag, new_tag, router}) //prettier-ignore
export const deleteUserTag = (tag) => ({ type: USER_TAGS_DELETE, tag })
export const cancelDeleteUserTag = () => ({ type: USER_TAGS_DELETE_CANCEL })
export const confirmDeleteUserTag = (tag, router) => ({ type: USER_TAGS_DELETE_CONFIRM, tag, router}) //prettier-ignore
export const hydrateUserTags = () => ({ type: USER_TAGS_HYDRATE })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  recentTags: [],
  pinnedTags: [],
  tagsList: [],
  tagsWithItems: {},
  itemsWithTags: [],
  tagToEdit: false,
  tagToDelete: false,
  since: false
}

export const userTagsReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_TAGS_GET_SUCCESS: {
      const {
        tagsList,
        tagsWithItems,
        since,
        recentTags,
        itemsWithTags
      } = action
      return {
        ...state,
        tagsList,
        tagsWithItems,
        since,
        recentTags,
        itemsWithTags
      }
    }

    case USER_TAGS_EDIT: {
      const { tag } = action
      return { ...state, tagToEdit: tag }
    }

    case USER_TAGS_EDIT_SUCCESS: {
      const { new_tag, old_tag, pinnedDraft } = action
      const tagsListDraft = state.tagsList.map((tag) => {
        return tag === old_tag ? new_tag : tag
      })

      return {
        ...state,
        pinnedTags: pinnedDraft,
        tagsList: tagsListDraft,
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
      const tagsListDraft = state.tagsList.filter((tag) => tag !== deletedTag)
      const pinnedTagsDraft = state.pinnedTags.filter(
        (tag) => tag !== deletedTag
      )

      return {
        ...state,
        tagsList: tagsListDraft,
        tagToDelete: false,
        pinnedTags: pinnedTagsDraft
      }
    }

    case USER_TAGS_DELETE_FAILURE:
    case USER_TAGS_DELETE_CANCEL: {
      return { ...state, tagToDelete: false }
    }

    case USER_TAGS_PINS_SET: {
      const { pins } = action
      return { ...state, pinnedTags: pins }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const userTagsSagas = [
  takeEvery(USER_TAGS_GET_REQUEST, userTagsRequest),
  takeEvery(USER_TAGS_PIN, userTagsTogglePin),
  takeEvery(USER_TAGS_EDIT_CONFIRM, userTagsEditConfirm),
  takeEvery(USER_TAGS_DELETE_CONFIRM, userTagsDeleteConfirm),
  takeEvery(USER_TAGS_HYDRATE, userTagsHydrate)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getPinnedTags = (state) => state.userTags.pinnedTags

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* userTagsRequest() {
  const response = yield fetchStoredTags()

  if (response.status !== 1) return yield put({ type: USER_TAGS_GET_FAILURE })

  const { tags: tagsList, since } = response

  const { itemsById } = yield fetchMyListData({
    count: 50,
    offset: 0,
    sort: 'newest'
  })

  yield put({ type: USER_TAGS_ITEM_SUCCESS, itemsById })

  // This just finds which of the most recent items have tags
  const itemsWithTags = Object.values(itemsById)
    .filter((item) => item?.tags)
    .slice(0, 4)
  const itemsWithTagsArray = itemsWithTags.map((item) => item?.tags)
  const itemsWithTagsList = itemsWithTags.map((item) => item?.item_id)

  // This fun jumble of code makes an object of tags, with their corresponding
  // items.  We have to do this since the endpoint does not natively support
  // advanced tagging data ... yet
  const tagsWithItems = itemsWithTagsArray.reduce((previous, current) => {
    Object.keys(current).map((tag) => {
      previous[tag] = previous[tag]
        ? [...previous[tag], current[tag]]
        : [current[tag]]
      return tag
    })
    return previous
  }, {})

  const recentTags = Array.from(new Set(Object.keys(tagsWithItems)))

  yield put({
    type: USER_TAGS_GET_SUCCESS,
    since,
    tagsList,
    tagsWithItems,
    itemsWithTags: itemsWithTagsList,
    recentTags
  })
}

function* userTagsTogglePin(actions) {
  const { tag } = actions
  const pinnedTags = yield select(getPinnedTags)
  const isPinned = pinnedTags.includes(tag)
  const tags = pinnedTags.slice()
  const draft = isPinned
    ? tags.filter((current) => current !== tag)
    : [...tags, tag]

  localStore.setItem('user_tags_pinned', JSON.stringify(draft))
  yield put({ type: USER_TAGS_PINS_SET, pins: draft })
}

function* getLocalTags() {
  const pinnedItems = yield localStore.getItem('user_tags_pinned')
  const pins =
    pinnedItems && pinnedItems !== 'undefined' ? JSON.parse(pinnedItems) : []
  return pins
}

function* userTagsEditConfirm(action) {
  const { new_tag, old_tag, router } = action
  const data = yield call(renameStoredTag, { new_tag, old_tag })

  if (data) {
    const pinnedItems = yield getLocalTags()
    const pinnedDraft = pinnedItems.map((pin) => (old_tag === pin ? new_tag : pin)) //prettier-ignore
    yield localStore.setItem('user_tags_pinned', JSON.stringify(pinnedDraft))
    yield put({ type: USER_TAGS_EDIT_SUCCESS, new_tag, old_tag, pinnedDraft }) //prettier-ignore
    return yield call(router.replace, `/my-list/tags/${encodeURI(new_tag)}`)
  }

  return yield put({ type: USER_TAGS_EDIT_FAILURE, old_tag })
}

function* userTagsDeleteConfirm(action) {
  const { tag, router } = action

  const data = yield call(deleteStoredTag, tag)

  if (data) {
    const pinnedItems = yield getLocalTags()
    const draft = pinnedItems.filter((pin) => pin !== tag)
    yield localStore.setItem('user_tags_pinned', JSON.stringify(draft))
    yield put({ type: USER_TAGS_DELETE_SUCCESS, tag })
    return yield call(router.replace, '/my-list/tags')
  }

  return yield put({ type: USER_TAGS_DELETE_FAILURE, tag })
}

function* userTagsHydrate() {
  const pinnedItems = yield getLocalTags()
  yield put({ type: USER_TAGS_PINS_SET, pins: pinnedItems })
}
