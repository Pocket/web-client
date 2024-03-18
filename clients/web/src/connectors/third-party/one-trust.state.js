import { ONE_TRUST_DATA } from 'actions'
import { arrayToObject } from 'common/utilities/object-array/object-array'

// ID C0001 Necessary Cookies
// ID C0002 Analytics Cookies
// ID C0003 Functional Cookies
// ID C0004 Targeting/Tracking Cookies
// ID C0005 Social Media Cookies
const categories = [
  { name: 'necessary', id: 'C0001', enabled: true }, // Necessary Cookies
  { name: 'analytics', id: 'C0002', enabled: true }, // Analytics Cookies
  { name: 'tracking', id: 'C0004', enabled: false } // Tracking Cookies
]

const updateCategories = (groups) => {
  return categories.map((category) => {
    category.enabled = groups.includes(category.id)
    return category
  })
}

/** ACTIONS
 --------------------------------------------------------------- */
let OptanonAnalyticsCookie
// This function is called automatically by OneTrusts script
global.OptanonWrapper = () => {
  const onetrustCookies = arrayToObject(updateCategories(global.OptanonActiveGroups), 'name')
  const analyticsEnabled = onetrustCookies?.analytics.enabled

  if (OptanonAnalyticsCookie && !analyticsEnabled) return window.location.reload()
  OptanonAnalyticsCookie = analyticsEnabled
}

export const updateOnetrustData = (groups) => ({ type: ONE_TRUST_DATA, groups })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  trustReady: false,
  ...arrayToObject(categories, 'name')
}

export const oneTrustReducers = (state = initialState, action) => {
  switch (action.type) {
    case ONE_TRUST_DATA: {
      const { groups } = action
      if (!groups) return state

      const categoryUpdates = updateCategories(groups)
      return {
        ...state,
        ...arrayToObject(categoryUpdates, 'name'),
        trustReady: true
      }
    }

    default:
      return state
  }
}
