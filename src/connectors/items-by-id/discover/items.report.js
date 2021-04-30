import { put, takeLatest, take, race } from 'redux-saga/effects'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { createReportEntity } from 'connectors/snowplow/entities'
import { createContentEntity } from 'connectors/snowplow/entities'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_REPORT } from 'connectors/snowplow/events'

import { ITEMS_REPORT_REQUEST } from 'actions'
import { ITEMS_REPORT_CONFIRM } from 'actions'
import { ITEMS_REPORT_CANCEL } from 'actions'
import { ITEMS_REPORT_SUCCESS } from 'actions'
import { ITEMS_REPORT_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemReportAction = (id) => ({ type: ITEMS_REPORT_REQUEST, id })
export const itemReportConfirm = () => ({ type: ITEMS_REPORT_CONFIRM })
export const itemReportCancel = () => ({ type: ITEMS_REPORT_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const itemReportReducers = (state = initialState, action) => {
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
export const itemReportSagas = [takeLatest(ITEMS_REPORT_REQUEST, itemsReport)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* itemsReport({ save_url, item_id, reason, otherText }) {
  // Wait for the user to confirm or cancel
  const { cancel } = yield race({
    confirm: take(ITEMS_REPORT_CONFIRM),
    cancel: take(ITEMS_REPORT_CANCEL)
  })

  if (cancel) return

  // Send snowplow actions
  try {
    const snowplowEvent = createEngagementEvent(ENGAGEMENT_TYPE_REPORT)
    const reportEntity = createReportEntity(reason, otherText)
    const contentEntity = createContentEntity(save_url, item_id)
    const snowplowEntities = [reportEntity, contentEntity]
    sendCustomSnowplowEvent(snowplowEvent, snowplowEntities)
    return yield put({ type: ITEMS_REPORT_SUCCESS })
  } catch {
    return yield put({ type: ITEMS_REPORT_FAILURE })
  }
}
