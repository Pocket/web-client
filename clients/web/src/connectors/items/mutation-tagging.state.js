import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { arrayToObject } from 'common/utilities/object-array/object-array'
import { itemTagsReplace, itemTagsRemove, bulkTagging } from 'common/api/mutations/tagItem'
import { getTagSuggestionById } from 'common/api/queries/get-tag-suggestions'

import { MUTATION_TAGGING } from 'actions'
import { MUTATION_BULK_TAGGING } from 'actions'

import { MUTATION_TAG_ADD } from 'actions'
import { MUTATION_TAG_REMOVE } from 'actions'
import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_FAILURE } from 'actions'
import { MUTATION_TAG_CANCEL } from 'actions'
import { MUTATION_TAG_CONFIRM } from 'actions'
import { MUTATION_TAG_SUCCESS } from 'actions'
import { MUTATION_TAG_SELECT } from 'actions'
import { MUTATION_TAG_SELECTION_CLEAR } from 'actions'

import { MUTATION_TAG_SUGGESTION_REQUEST } from 'actions'
import { MUTATION_TAG_SUGGESTION_SUCCESS } from 'actions'
import { MUTATION_TAG_SUGGESTION_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutationTagConfirm = (value) => ({ type: MUTATION_TAG_CONFIRM, value })
export const mutationTagCancel = () => ({ type: MUTATION_TAG_CANCEL })
export const mutationTagItem = (itemId, tags) => ({ type: MUTATION_TAGGING, itemId, tags })
export const mutationBulkTag = (itemIds) => ({ type: MUTATION_BULK_TAGGING, itemIds })
export const mutationTagAdd = (tag) => ({ type: MUTATION_TAG_ADD, tag })
export const mutationTagRemove = (tags) => ({ type: MUTATION_TAG_REMOVE, tags })
export const mutationTagSelect = (tag) => ({ type: MUTATION_TAG_SELECT, tag })
export const mutationTagSelectionsClear = () => ({ type: MUTATION_TAG_SELECTION_CLEAR })
export const mutationTagGetSuggestions = (itemId) => ({type: MUTATION_TAG_SUGGESTION_REQUEST, itemId}) //prettier-ignore

/** ITEM REDUCERS
  --------------------------------------------------------------- */
const initialTaggingState = {
  tagNames: [],
  activeTags: [],
  itemIds: [],
  tagSuggestions: [],
  tagSuggestionStatus: 'idle',
  isBulk: false
}

export const mutationTaggingReducers = (state = initialTaggingState, action) => {
  switch (action.type) {
    case MUTATION_TAGGING: {
      const { itemId, tags = [] } = action
      const tagNames = tags.map((tag) => tag?.name)
      const tagsWithId = arrayToObject(tags, 'name')

      return {
        ...state,
        itemIds: [itemId],
        tagNames,
        tagsWithId
      }
    }

    case MUTATION_BULK_TAGGING: {
      const { itemIds } = action
      return { ...state, itemIds, isBulk: true }
    }

    case MUTATION_TAG_ADD: {
      const { tag } = action
      const updatedTags = new Set([...state.tagNames, tag])
      const tagNames = Array.from(updatedTags)
      return { ...state, tagNames }
    }

    case MUTATION_TAG_REMOVE: {
      // Create a remove action for the tag passed in
      const { tags: passedTag } = action
      const activeTags = state.activeTags
      const tagsToDelete = passedTag ? [passedTag] : activeTags
      const tagNames = state.tagNames.filter((tagName) => !tagsToDelete.includes(tagName))
      return { ...state, tagNames, activeTags: [] }
    }

    case MUTATION_TAG_SELECT: {
      const { tag } = action
      const activeTags = state.activeTags
      const tagActive = activeTags.includes(tag)
      const updatedActive = tagActive
        ? activeTags.filter((current) => current !== tag)
        : [...state.activeTags, tag]
      return { ...state, activeTags: updatedActive }
    }

    case MUTATION_TAG_SELECTION_CLEAR: {
      return { ...state, activeTags: [] }
    }

    case MUTATION_TAG_SUGGESTION_REQUEST: {
      return { ...state, tagSuggestionStatus: 'pending' }
    }

    case MUTATION_TAG_SUGGESTION_SUCCESS: {
      const { tagSuggestions } = action
      return { ...state, tagSuggestions, tagSuggestionStatus: 'complete' }
    }

    case MUTATION_TAG_SUGGESTION_FAILURE: {
      return { ...state, tagSuggestionStatus: 'complete' }
    }

    case MUTATION_SUCCESS:
    case MUTATION_TAG_CANCEL:
    case MUTATION_TAG_SUCCESS:
    case MUTATION_FAILURE: {
      return initialTaggingState
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationTaggingSagas = [
  takeEvery(MUTATION_TAG_CONFIRM, confirmTagMutations),
  takeLatest(MUTATION_TAG_SUGGESTION_REQUEST, getTagSuggestions)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
const getTagMutationState = (state) => state.mutationTagging

function* confirmTagMutations() {
  try {
    const tagMutationState = yield select(getTagMutationState)
    const { tagNames, itemIds, isBulk } = tagMutationState
    const taggingFunction = getTaggingFunction(tagNames, isBulk)

    const nodes = yield call(taggingFunction, itemIds, tagNames)

    if (nodes) {
      const count = nodes.count
      return yield put({ type: MUTATION_SUCCESS, nodes,  actionType:MUTATION_TAGGING, count})
    }
  } catch {
    yield put({ type: MUTATION_FAILURE })
  }
}

function* getTagSuggestions(action) {
  const { itemId } = action
  const tagSuggestionResponse = yield call(getTagSuggestionById, itemId)
  const tagSuggestions = tagSuggestionResponse.map((tag) => tag.name)
  yield put({ type: MUTATION_TAG_SUGGESTION_SUCCESS, tagSuggestions })
}

function getTaggingFunction(tagNames, isBulk) {
  if (isBulk) return bulkTagging
  if (!tagNames.length) return itemTagsRemove
  return itemTagsReplace
}
