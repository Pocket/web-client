import { put, call, takeEvery, take, race } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'
import { fetchStoredTags } from 'common/api/tags'
import { fetchMyListData } from 'containers/my-list/my-list.state'

import { USER_TAGS_GET_REQUEST } from 'actions'
import { USER_TAGS_GET_SUCCESS } from 'actions'
import { USER_TAGS_GET_FAILURE } from 'actions'
import { USER_TAGS_ITEM_SUCCESS } from 'actions'

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

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  recentTags: [],
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
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const userTagsSagas = [takeEvery(USER_TAGS_GET_REQUEST, userTagsRequest)]

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

// function buildActions(items, action) {
//   return items.map((item) => ({ action, item_id: item.id }))
// }
