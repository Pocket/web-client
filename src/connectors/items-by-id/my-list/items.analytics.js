import { takeEvery, put } from 'redux-saga/effects'
import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const cardAnalyticsSagas = [
  takeEvery(SET_MY_LIST_IMPRESSION, fireItemImpression)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* fireItemImpression({ position, item }) {
  yield put(
    trackImpression(
      IMPRESSION_COMPONENT_CARD,
      IMPRESSION_REQUIREMENT_VIEWABLE,
      position,
      item,
      'web-my-list-card'
    )
  )
}
