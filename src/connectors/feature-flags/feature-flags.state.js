import { getUnleash } from 'common/api/unleash'
import { arrayToObject } from 'common/utilities'

import { FEATURES_HYDRATE, FEATURES_TOGGLE, HYDRATE } from 'actions'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const featuresHydrate = (hydrate) => ({ type: FEATURES_HYDRATE, hydrate }) //prettier-ignore
export const featuresToggle = (flag) => ({ type: FEATURES_TOGGLE, flag })

/** REDUCERS
 --------------------------------------------------------------- */
export const featureReducers = (state = initialState, action) => {
  switch (action.type) {
    case FEATURES_HYDRATE: {
      const { hydrate } = action
      return { ...state, ...hydrate }
    }

    case FEATURES_TOGGLE: {
      const { flag } = action
      const currentFlagState = state[flag]?.assigned
      return { ...state, [flag]: { assigned: !currentFlagState } }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { features } = action.payload
      return { ...state, ...features }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const featureSagas = []

/** SAGA :: RESPONDERS
---------------------------------------------------------------- */

/** ASYNC Functions
---------------------------------------------------------------- */
export async function fetchUnleashData(userId, sessionId) {
  try {
    const response = await getUnleash(sessionId, userId, 'web-discover')
    const unleashData = filterUnleashAssignments(response)
    return unleashData
  } catch (error) {
    console.log(error)
  }
}

/** UTILITIES
---------------------------------------------------------------- */
async function filterUnleashAssignments(response) {
  if (!response?.assignments) return {}
  // Regex to only get flags for the web client
  const filterRegEx = /(temp|perm)\.web\.client\..+/i
  const assignments = response.assignments.map((flag) =>
    filterRegEx.test(flag.name) ? flag : false
  )

  return arrayToObject(assignments, 'name')
}
