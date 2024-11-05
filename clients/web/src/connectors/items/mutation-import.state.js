import { put, takeLatest, take, race } from 'redux-saga/effects'
import { getImportUploadUrl } from 'common/api/mutations/import-upload-url'

// import { fireSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { MUTATION_IMPORT_SHOW } from 'actions'
import { MUTATION_IMPORT_CANCEL } from 'actions'
import { MUTATION_IMPORT_CONFIRM } from 'actions'
import { MUTATION_IMPORT_SUCCESS } from 'actions'
import { MUTATION_IMPORT_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const itemsImportShow = () => ({ type: MUTATION_IMPORT_SHOW })
export const itemsImportConfirm = (file) => ({ type: MUTATION_IMPORT_CONFIRM, file })
export const itemsImportCancel = () => ({ type: MUTATION_IMPORT_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  showModal: false,
  processing: false,
  success: null,
  err: null
}

export const mutationImportReducers = (state = initialState, action) => {
  switch (action.type) {
    case MUTATION_IMPORT_SHOW: {
      return { ...state, showModal: true }
    }

    case MUTATION_IMPORT_CONFIRM: {
      return { ...state, processing: true }
    }

    case MUTATION_IMPORT_SUCCESS: {
      return { ...state, success: true, processing: false }
    }

    case MUTATION_IMPORT_FAILURE: {
      const { err } = action
      return { ...state, processing: false, err }
    }

    case MUTATION_IMPORT_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const mutationImportSagas = [takeLatest(MUTATION_IMPORT_SHOW, setupImport)]

/** SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* setupImport() {
  // Wait for the user to confirm or cancel
  const { cancel, confirm } = yield race({
    confirm: take(MUTATION_IMPORT_CONFIRM),
    cancel: take(MUTATION_IMPORT_CANCEL)
  })

  if (cancel) return
  // Send snowplow actions
  try {
    // Eventually this may be passed in if we start supporting more services
    const importType = 'omnivore'
    const { file } = confirm

    const { url, message } = yield getImportUploadUrl(importType)
    if (!url) {
      const errorMessage = message ?? 'File Upload URL could not be retrieved'
      throw new Error(errorMessage)
    }

    const uploadResponse = yield fetch(
      `/web-client-api/import?preSignedUrl=${encodeURIComponent(url)}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/zip' },
        body: file
      }
    )

    if (!uploadResponse.ok) throw new Error(`${response.status}: ${response.statusText}`)

    // It worked!
    yield put({ type: MUTATION_IMPORT_SUCCESS, uploadResponse })
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MUTATION_IMPORT_FAILURE, err: err.message })
    } else {
      yield put({ type: MUTATION_IMPORT_FAILURE, err: 'An unknown error occurred' })
    }
  }
}
