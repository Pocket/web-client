import { put, takeEvery, call, select } from 'redux-saga/effects'
import { SHAREABLE_LIST_DELETE_REQUEST } from 'actions'
import { SHAREABLE_LIST_DELETE_SUCCESS } from 'actions'
import { SHAREABLE_LIST_DELETE_FAILURE } from 'actions'
import { deleteShareableList } from 'common/api/mutations/deleteShareableList'

/** ACTIONS
 --------------------------------------------------------------- */
export const mutateListDelete = (id) => ({
  type: SHAREABLE_LIST_DELETE_REQUEST,
  id
})

/** REDUCERS
 --------------------------------------------------------------- */
// maybe

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationListDeleteSagas = [takeEvery(SHAREABLE_LIST_DELETE_REQUEST, deleteList)]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getListExternalIds = (state) => state.pageListsIds

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
