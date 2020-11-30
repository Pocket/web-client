import { put, call, takeEvery, select } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { sendItemActions } from 'common/api/item-actions'
import { fetchStoredTags } from 'common/api/tags'
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
import { USER_TAGS_DELETE } from 'actions'
import { USER_TAGS_DELETE_CONFIRM } from 'actions'
import { USER_TAGS_DELETE_CANCEL } from 'actions'

import { API_ACTION_TAG_DELETE } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const getUserTags = () => ({ type: USER_TAGS_GET_REQUEST }) //prettier-ignore
export const pinUserTag = (tag) => ({ type: USER_TAGS_PIN, tag })
export const editUserTag = (tag) => ({ type: USER_TAGS_EDIT, tag })
export const hydrateUserTags = () => ({ type: USER_TAGS_HYDRATE })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  recentTags: [],
  pinnedTags: [],
  tagsList: [],
  tagsWithItems: {},
  itemsWithTags: [],
  tagToEdit: null,
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

    case USER_TAGS_GET_FAILURE: {
      return { ...state, tagToEdit: null }
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
  takeEvery(USER_TAGS_EDIT, userTagsEdit),
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

function* userTagsEdit(actions) {
  yield console.log(actions)
}

function* userTagsHydrate() {
  const pinnedItems = JSON.parse(localStore.getItem('user_tags_pinned')) || []
  yield put({ type: USER_TAGS_PINS_SET, pins: pinnedItems })
}
