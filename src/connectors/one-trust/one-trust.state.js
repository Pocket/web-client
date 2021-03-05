import { ONE_TRUST_DATA } from 'actions'
import { arrayToObject } from 'common/utilities'

const categories = [
  { name: 'necessary', id: 'C0001', enabled: true }, // Necessary Cookies
  { name: 'analytics', id: 'C0002', enabled: true }, // Analytics Cookies
  { name: 'functional', id: 'C0003', enabled: true }, // Functional Cookies
  { name: 'advertising', id: 'C0004', enabled: false }, // Advertising Cookies
  { name: 'socialMedia', id: 'C0005', enabled: false } //Social Media Cookies
]

const initialState = {
  trustReady: false,
  ...arrayToObject(categories, 'name')
}

/** REDUCERS
 --------------------------------------------------------------- */
export const oneTrustReducers = (state = initialState, action) => {
  switch (action.type) {
    case ONE_TRUST_DATA: {
      const { groups } = action
      if (!groups) return state

      const categoryUpdates = categories.map((category) => {
        category.enabled = groups.includes(category.id)
        return category
      })
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
