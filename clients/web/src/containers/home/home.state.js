import { put, takeEvery, call } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { getUnifiedHome } from 'common/api/queries/get-home-unified'
import { HOME_CONTENT_REQUEST } from 'actions'
import { HOME_CONTENT_SUCCESS } from 'actions'
import { HOME_REC_DEMOTE } from 'actions'
import { HOME_REC_REQUEST_PROMOTE } from 'actions'
import { HOME_REC_REQUEST_DEMOTE } from 'actions'
import { SET_TOPIC_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const getHomeContent = (locale) => ({ type: HOME_CONTENT_REQUEST, locale })
export const promoteHomeRec = (slateId, recId, saveUrl) => ({ type: HOME_REC_REQUEST_PROMOTE, slateId, recId, saveUrl}) //prettier-ignore
export const demoteHomeRec = (slateId, recId, saveUrl) => ({ type: HOME_REC_REQUEST_DEMOTE, slateId, recId, saveUrl}) //prettier-ignore
export const completeDemotion = (slateId, recId) => ({ type: HOME_REC_DEMOTE, slateId, recId }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  slates: [],
  promotedIds: [],
  demotedIds: [],
  slatesById: {}
}

export const pageHomeReducers = (state = initialState, action) => {
  switch (action.type) {
    case HOME_CONTENT_REQUEST: {
      return initialState
    }

    case HOME_CONTENT_SUCCESS: {
      const { slatesById, slateArray } = action
      return { ...state, slatesById, slates: slateArray }
    }

    case HOME_REC_REQUEST_PROMOTE: {
      const { recId } = action
      const set = new Set([...state.promotedIds, recId])
      return { ...state, promotedIds: Array.from(set) }
    }

    case HOME_REC_REQUEST_DEMOTE: {
      const { recId } = action
      const set = new Set([...state.demotedIds, recId])
      return { ...state, demotedIds: Array.from(set) }
    }

    case HOME_REC_DEMOTE: {
      const { slateId, recId } = action
      const { slatesById } = state
      const slateToOperateOn = slatesById[slateId]
      const recommendations = slateToOperateOn.recommendations.filter((id) => id !== recId)
      return {
        ...state,
        slatesById: { ...slatesById, [slateId]: { ...slateToOperateOn, recommendations } }
      }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const pageHomeSaga = [
  takeEvery(HOME_CONTENT_REQUEST, homeContentRequest),
  takeEvery(SET_TOPIC_SUCCESS, homeContentRequest),
  takeEvery(HOME_REC_REQUEST_DEMOTE, homeDemotionPersist)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* homeContentRequest({ locale }) {
  try {
    const { itemsById, slatesById, slateArray } = yield call(getUnifiedHome, locale)

    // Get the demoted items from local storage or use an empty array if not found
    const demoted = yield JSON.parse(localStore.getItem('demotedRecs')) || []
    const { updatedItemsById, updatedSlatesById } = yield adjustSlates({
      itemsById,
      slatesById,
      demoted
    })

    yield put({ type: ITEMS_SUCCESS, itemsById: updatedItemsById })
    yield put({ type: HOME_CONTENT_SUCCESS, slatesById: updatedSlatesById, slateArray })
  } catch (error) {
    console.warn(error)
  }
}

function homeDemotionPersist({ saveUrl }) {
  try {
    // Retrieve the currently demoted recommendations from local storage,
    // or use an empty array if not available
    const currentlyDemoted = JSON.parse(localStore.getItem('demotedRecs')) || []

    // Update the demoted recommendations by adding the new saveUrl and storing it
    const updatedDemotions = [...currentlyDemoted, saveUrl]
    localStore.setItem('demotedRecs', JSON.stringify(updatedDemotions))

    // Set the timestamp for today at midnight (00:00:00) and store it
    // This is a bit of a safeguard so if we need to remove these after a time
    // we will have something to anchor it against.  This will ultimately fall
    // to the DL team to impliment properly on the server side
    const today = new Date().setHours(0, 0, 0, 0)
    localStore.setItem('demotedRecsDate', today.toString())
  } catch (err) {
    return
  }
}

// NOTE: So so sorry for this function.  This is a hacky mc hack face function
// but that is by design as it will only be in place until the DL team
// has the turnaround on this sorted.
//
// NOTE CAVEAT:  If you are reading this three years from now
// ... double appologies to you
export async function adjustSlates({ itemsById, slatesById, demoted }) {
  // Create new copies of itemsById and slatesById objects
  const updatedItemsById = JSON.parse(JSON.stringify(itemsById))
  const updatedSlatesById = JSON.parse(JSON.stringify(slatesById))

  // Iterate over each item in updatedItemsById
  for (const itemId in updatedItemsById) {
    const { saveUrl } = updatedItemsById[itemId]

    // Check if the item is in the currently demoted list
    if (demoted.includes(saveUrl)) {
      // Remove the item from updatedItemsById
      delete updatedItemsById[itemId]

      // Iterate over each slate in updatedSlatesById
      for (const slateId in updatedSlatesById) {
        // Filter out the demoted item from the recommendations list of each slate
        updatedSlatesById[slateId] = {
          ...updatedSlatesById[slateId],
          recommendations: updatedSlatesById[slateId].recommendations.filter(
            (recId) => recId !== itemId
          )
        }
      }
    }
  }

  return { updatedItemsById, updatedSlatesById }
}
