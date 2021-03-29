import dayjs from 'dayjs'
import { getUnleash } from 'common/api/unleash'
import { arrayToObject } from 'common/utilities'
import { FEATURES_HYDRATE, FEATURES_TOGGLE, HYDRATE } from 'actions'
import { DIFF_DELETE } from 'diff-match-patch'

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
      return { ...state, ...hydrate, flagsReady: true }
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
export async function fetchUnleashData(userId, sessionId, birth) {
  try {
    const response = await getUnleash(sessionId, userId, 'web-discover')
    const unleashData = filterUnleashAssignments(response, birth)
    return unleashData
  } catch (error) {
    console.log(error)
  }
}

/** UTILITIES
---------------------------------------------------------------- */
async function filterUnleashAssignments(response, birth) {
  if (!response?.assignments) return {}
  // Regex to only get flags for the web client
  const filterRegEx = /(?:temp|perm)\.web\.client\.(.+)/i
  const assignments = response.assignments
    .filter((flag) => filterRegEx.test(flag.name))
    .map((flag) => {
      const { name, assigned, payload: passedPayload, ...rest } = flag

      const matches = name?.match(filterRegEx)
      const payload = parsePayload(passedPayload)
      const eligible = checkAssignment(assigned, payload, birth)

      return {
        ...payload,
        ...rest,
        assigned,
        eligible,
        test: name,
        name: matches[1] || flag?.name //override the name
      }
    })

  return arrayToObject(assignments, 'name')
}

/**
 * This takes an alleged json string and parses it.
 * If it's not valid json, this keeps everything from breaking mid-assignment
 * @param {string} payload
 * @returns JSON Object
 */
function parsePayload(payload) {
  try {
    return JSON.parse(payload)
  } catch (error) {
    return {}
  }
}

/**
 * Check assignment based on payload
 */
export function checkAssignment(assigned, payload, birth) {
  if (!assigned) return false

  const { start, accountAge, accountAgeUnit } = payload

  // If new user is required for the test
  if (accountAge === 0) return isNewUser({ start, birth })

  // If account must be a certain age after start
  if (accountAge > 0 && start) return isOldEnough({ start, birth, accountAge, accountAgeUnit })

  // If account must be a certain age
  if (accountAge > 0) return isOldEnough({ birth, accountAge, accountAgeUnit })

  // Return the assignment with no eligibility check
  return assigned
}

export function isOldEnough({ start, birth, accountAge, accountAgeUnit = 'day' }) {
  const inception = start ? start : undefined
  return dayjs(birth).add(accountAge, accountAgeUnit).isBefore(dayjs(inception))
}

export function isNewUser({ start, birth }) {
  return dayjs(start).isBefore(dayjs(birth))
}
