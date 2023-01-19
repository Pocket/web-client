import { put, takeLatest, take, race } from 'redux-saga/effects'
import { fireSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { ITEMS_REPORT_REQUEST } from 'actions'
import { ITEMS_REPORT_CONFIRM } from 'actions'
import { ITEMS_REPORT_CANCEL } from 'actions'
import { ITEMS_REPORT_SUCCESS } from 'actions'
import { ITEMS_REPORT_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemReportAction = (id) => ({ type: ITEMS_REPORT_REQUEST, id })
export const itemReportConfirm = (data) => ({ type: ITEMS_REPORT_CONFIRM, data })
export const itemReportCancel = () => ({ type: ITEMS_REPORT_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const mutationReportReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_REPORT_REQUEST: {
      const { id } = action
      return id
    }

    case ITEMS_REPORT_FAILURE:
    case ITEMS_REPORT_CANCEL: {
      return false
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationReportSagas = [takeLatest(ITEMS_REPORT_REQUEST, itemsReport)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsReport() {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(ITEMS_REPORT_CONFIRM),
    cancel: take(ITEMS_REPORT_CANCEL)
  })

  if (cancel) return
  // Send snowplow actions
  try {
    const { data } = confirm
    const analyticsData = {
      identifier: 'discover.report',
      data
    }

    yield fireSnowplowEvent(analyticsData)
    return yield put({ type: ITEMS_REPORT_SUCCESS })
  } catch {
    return yield put({ type: ITEMS_REPORT_FAILURE })
  }
}
