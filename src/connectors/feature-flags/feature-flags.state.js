import dayjs from 'dayjs'
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
      return { ...state, ...hydrate, flagsReady: true }
    }

    case FEATURES_TOGGLE: {
      const { flag } = action
      const currentFlagState = state[flag]?.assigned
      return { ...state, [flag]: { active: !currentFlagState } }
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
    const response = await getUnleash(sessionId, userId, birth, 'web-client')
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
  const filterRegEx = /(?:temp|perm)\.web\.client\.(.+)/i
  const assignments = response.assignments
    .filter((flag) => filterRegEx.test(flag.name))
    .map((flag) => {
      const { name, assigned, payload: passedPayload, variant, ...rest } = flag

      const matches = name?.match(filterRegEx)
      const payload = parsePayload(passedPayload)
      const active = checkActive(assigned, variant)

      return {
        ...rest,
        assigned,
        active,
        variant,
        test: name,
        payload,
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
export function checkActive(assigned, variant) {
  if (!assigned) return false
  if (!variant || variant === 'disabled') return assigned // This is a straight toggle
  if (variant === 'control') return false
  return true
}

export function isOldEnough({ start, birth, accountAge, accountAgeUnit = 'day' }) {
  const inception = start ? start : undefined
  return dayjs(birth).add(accountAge, accountAgeUnit).isBefore(dayjs(inception))
}

export function isNewUser({ start, birth }) {
  return dayjs(start).isBefore(dayjs(birth))
}
