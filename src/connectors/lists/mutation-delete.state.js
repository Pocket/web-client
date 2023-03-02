import { put, takeEvery, call, select } from 'redux-saga/effects'

import { SHAREABLE_LIST_DELETE_REQUEST } from 'actions'
import { SHAREABLE_LIST_DELETE_SUCCESS } from 'actions'
import { SHAREABLE_LIST_DELETE_FAILURE } from 'actions'

import { LIST_DELETE_ITEM_REQUEST } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_FAILURE } from 'actions'

import { deleteShareableList } from 'common/api/mutations/deleteShareableList'
import { deleteShareableListItem } from 'common/api/mutations/deleteShareableListItem'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListDelete = (id) => ({ type: SHAREABLE_LIST_DELETE_REQUEST, id })
export const mutateListItemDelete = ({ id, listId }) => ({ type: LIST_DELETE_ITEM_REQUEST, id, listId })

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListDeleteSagas = [
  takeEvery(SHAREABLE_LIST_DELETE_REQUEST, deleteList),
  takeEvery(LIST_DELETE_ITEM_REQUEST, deleteListItem)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getListExternalIds = (state) => state.pageListsIds
const getIndividualListIds = (state, id) => state.pageIndividualListIds[id]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* deleteList({ id }) {
  try {
    const { externalId: deletedId } = yield call(deleteShareableList, { id })
    const previousIds = yield select(getListExternalIds)
    const externalIds = previousIds.filter((e) => e !== deletedId)

    yield put({ type: SHAREABLE_LIST_DELETE_SUCCESS, deletedId, externalIds })
  } catch (error) {
    yield put({ type: SHAREABLE_LIST_DELETE_FAILURE, error })
  }
}

function* deleteListItem({ id, listId }) {
  try {
    const { externalId: deletedId } = yield call(deleteShareableListItem, { id })
    const previousIds = yield select(getIndividualListIds, listId)
    const externalIdList = previousIds.filter((e) => e !== deletedId)

    yield put({
      type: LIST_DELETE_ITEM_SUCCESS,
      externalId: listId,
      externalIdList
    })
  } catch (error) {
    yield put({ type: LIST_DELETE_ITEM_FAILURE, error })
  }
}
