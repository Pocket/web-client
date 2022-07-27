import { getUnleashAssignments } from 'common/api'
import { arrayToObject } from 'common/utilities'
import { FEATURES_HYDRATE, FEATURES_TOGGLE, FEATURES_ASSIGN, HYDRATE } from 'actions'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const featuresHydrate = (hydrate) => ({ type: FEATURES_HYDRATE, hydrate }) //prettier-ignore
export const featuresToggle = (flag) => ({ type: FEATURES_TOGGLE, flag })
export const featuresAssign = (flag) => ({ type: FEATURES_ASSIGN, flag })

/** REDUCERS
 --------------------------------------------------------------- */
export const featureReducers = (state = initialState, action) => {
  switch (action.type) {
    case FEATURES_HYDRATE: {
      const { hydrate } = action
      return { ...state, ...hydrate, flagsReady: true }
    }

    case FEATURES_ASSIGN: {
      const { flag } = action
      const currentFlagState = state[flag]
      if (!currentFlagState) return state

      return { ...state, [flag]: { ...currentFlagState, active: true } }
    }

    case FEATURES_TOGGLE: {
      const { flag } = action
      const currentFlagState = state[flag]
      const activeState = currentFlagState?.active
      return { ...state, [flag]: { ...currentFlagState, active: !activeState } }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { features } = action.payload
      return { ...state, ...features }
    }
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
export async function fetchUnleashData(userId, sessionId, birth, locale, userModels = []) {
  try {
    const response = await getUnleashAssignments(
      sessionId,
      userId,
      birth,
      'web-client',
      locale,
      userModels
    )

    // Filter and derive proper test values from the unleash response
    const filteredAssignments = await filterUnleashAssignments(response)

    // Adjust those responses based on any override payloads we have sent down
    const adjustedAssignments = await checkOverrides(filteredAssignments)

    // Format the data to add to state
    const unleashData = arrayToObject(adjustedAssignments, 'name')

    return unleashData
  } catch (error) {
    console.warn(error)
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

  return assignments
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
  const variantRegEx = /control/i
  if (!assigned) return false
  if (!variant || variant === 'disabled') return assigned // This is a straight toggle
  if (variantRegEx.test(variant)) return false
  return true
}

export function checkOverrides(assignments) {
  // If we are assigned, active, and not in control for a test that has an override
  // add the override name to this array
  const overrides = assignments
    .filter((test) => test?.assigned && test.payload?.override)
    .map((test) => test.payload?.override)

  // Loop through the assignments and if the override test name exists, make sure
  // assigned, active, and variant are set to an off state which will stop this
  // test from being tracked
  const adjustedAssignments = assignments.map((test) => {
    if (overrides.includes(test?.name)) {
      return { ...test, assigned: false, active: false, variant: null }
    }

    return test
  })

  return adjustedAssignments
}
