import { put, takeLatest } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'

import { PLACARD_REQUEST } from 'actions'
import { PLACARD_SUCCESS } from 'actions'
import { PLACARD_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getPlacards = (placements) => ({
  type: PLACARD_REQUEST,
  placements
})

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  contextId: null,
  placements: null
}

export const placardReducers = (state = initialState, action) => {
  switch (action.type) {
    case PLACARD_SUCCESS: {
      const { placements, contextId } = action
      return { ...state, placements, contextId }
    }

    case PLACARD_FAILURE: {
      const { err } = action
      return { ...state, processing: false, err }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const placardSagas = [takeLatest(PLACARD_REQUEST, requestPlacards)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* requestPlacards(action) {
  try {
    // Eventually this may be passed in if we start supporting more services
    const contextId = uuidv4()
    const placements = action?.placements

    if (!contextId) throw new Error('Context ID could not be generated')
    if (!placements?.length) throw new Error('No placements were provided')

    const body = JSON.stringify({ context_id: contextId, placements })

    const response = yield fetch('/web-client-api/placards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

    // It worked!
    const payload = yield response.json()
    yield put({ type: PLACARD_SUCCESS, placements: payload, contextId })
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: PLACARD_FAILURE, err: err.message })
    } else {
      yield put({ type: PLACARD_FAILURE, err: 'An unknown error occurred' })
    }
  }
}
