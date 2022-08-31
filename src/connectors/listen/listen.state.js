import { put, takeEvery } from 'redux-saga/effects'
import { getItemAudio } from 'common/api/_legacy/audio'

export const LISTEN_REQUEST = 'LISTEN_REQUEST'
export const LISTEN_SUCCESS = 'LISTEN_SUCCESS'
export const LISTEN_FAILURE = 'LISTEN_FAILURE'

/** ACTIONS
 --------------------------------------------------------------- */
export const getAudioFile = (itemId) => ({ type: LISTEN_REQUEST, itemId })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const listenReducers = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_SUCCESS: {
      const { file, itemId } = action
      return { ...state, [itemId]: file }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const listenSagas = [
  takeEvery(LISTEN_REQUEST, audioFileRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* audioFileRequest({ itemId }) {
  try {
    const response = yield getItemAudio({ itemId })
    if (response?.status !== 1) throw new Error('Unable to fetch audio file')
    const file = response.files?.[0]

    yield put({ type: LISTEN_SUCCESS, file, itemId })
  } catch (error) {
    yield put({ type: LISTEN_FAILURE, error })
  }
}
