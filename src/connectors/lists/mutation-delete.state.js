import { put, takeEvery, call } from 'redux-saga/effects'
import { SHAREABLE_LIST_DELETE_REQUEST } from 'actions'
import { SHAREABLE_LIST_DELETE_SUCCESS } from 'actions'
import { SHAREABLE_LIST_DELETE_FAILURE } from 'actions'
import { deleteShareableList } from 'common/api/mutations/deleteShareableList'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListDelete = ({ externalId }) => ({
  type: SHAREABLE_LIST_DELETE_REQUEST,
  externalId
})

/** REDUCERS
 --------------------------------------------------------------- */
// maybe

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListDeleteSagas = [takeEvery(SHAREABLE_LIST_DELETE_REQUEST, deleteList)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* deleteList(action) {
  const { externalId } = action
  try {
    const deletedListId = yield call(deleteShareableList, { externalId })
    return yield put({ type: SHAREABLE_LIST_DELETE_SUCCESS, deletedListId })
  } catch {
    return yield put({ type: SHAREABLE_LIST_DELETE_FAILURE })
  }
}
