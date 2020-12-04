import { put, call, takeLatest } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/item-actions'

import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_FAILURE } from 'actions'

import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_FAILURE } from 'actions'

import { API_ACTION_ARCHIVE } from 'common/constants'
import { API_ACTION_UNARCHIVE } from 'common/constants'
import { ANALYTICS_INDEX } from 'common/constants'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsArchiveAction = (items) => ({ type: ITEMS_ARCHIVE_REQUEST, items }) //prettier-ignore
export const itemsUnArchiveAction = (items) => ({type: ITEMS_UNARCHIVE_REQUEST, items }) // prettier-ignore

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemArchiveSagas = [
  takeLatest(ITEMS_ARCHIVE_REQUEST, itemsArchive),
  takeLatest(ITEMS_UNARCHIVE_REQUEST, itemsUnArchive)
]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsArchive({ items }) {
  const actions = buildActions(items, API_ACTION_ARCHIVE)
  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_ARCHIVE_SUCCESS, data, actions })

  return yield put({ type: ITEMS_ARCHIVE_FAILURE, items })
}

function* itemsUnArchive({ items }) {
  const actions = buildActions(items, API_ACTION_UNARCHIVE)
  const data = yield call(sendItemActions, actions)

  if (data) return yield put({ type: ITEMS_UNARCHIVE_SUCCESS, data, actions })

  return yield put({ type: ITEMS_UNARCHIVE_FAILURE, items })
}

function buildActions(items, action) {
  return items.map((item) => ({ action, item_id: item.id }))
}
