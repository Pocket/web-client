import { put, call } from 'redux-saga/effects'
import { sendItemActions } from 'common/api/_legacy/item-actions'
import { chunk } from 'common/utilities/object-array/object-array'

import { ITEMS_BULK_BATCH_BEGIN } from 'actions'
import { ITEMS_BULK_BATCH_SUCCESS } from 'actions'
import { ITEMS_BULK_BATCH_FAILURE } from 'actions'
import { ITEMS_BULK_BATCH_COMPLETE } from 'actions'

import { BATCH_SIZE } from 'common/constants'

export function* batchSendActions(items, apiAction, tags) {
  const batches = yield chunk(items, BATCH_SIZE)

  let actionBatch
  let response
  let batchCount = batches.length
  let totalActions = []

  yield put({
    type: ITEMS_BULK_BATCH_BEGIN,
    batchCount,
    batchTotal: batchCount
  })

  for (var batch of batches) {
    actionBatch = buildActions(batch, apiAction, tags)
    batchCount -= 1
    response = yield call(sendItemActions, actionBatch)
    totalActions.push(actionBatch)

    // Break out of the loop when a batch fails
    if (response?.status !== 1) {
      yield put({ type: ITEMS_BULK_BATCH_FAILURE, batchCount: 0 })
      break
    }

    yield put({
      type: ITEMS_BULK_BATCH_SUCCESS,
      batchCount,
      actions: actionBatch
    })
  }

  yield put({ type: ITEMS_BULK_BATCH_COMPLETE })

  return totalActions.flat()
}

export function buildActions(items, apiAction, tags) {
  const time = Math.round(Date.now() / 1000)
  return items.map((item) => ({
    action: apiAction,
    item_id: item.id,
    tags,
    time
  }))
}
