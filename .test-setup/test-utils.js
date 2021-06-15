// test-utils.js
// https://testing-library.com/docs/react-testing-library/api/
import { render, queries } from '@testing-library/react'
import * as customQueries from './custom-queries'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../src/store'

/**
 * Custom basic render
 * @param {*} ui react element
 * @param {*} options passed in options from test-library
 * @returns
 */
const customRender = (ui, options) => {
  return render(ui, { queries: { ...queries, ...customQueries }, ...options })
}

/**
 * Render wrapped in provider for when you need that.  Use this sparingly since
 * tests really should be running in isolation
 * @param {*} ui react element
 * @param {*} options passed in options from test-library
 * @returns
 */
const wrappedRender = (ui, renderOptions = {}) => {
  const {
    initialState,
    store = createStore(rootReducer, initialState),
    router,
    ...options
  } = renderOptions

  const wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return render(ui, { wrapper, queries: { ...queries, ...customQueries }, ...options })
}

/**
 * Adding custom queries to screen element so we can follow best practices and get some
 * auto completions
 */
const boundQueries = Object.entries(customQueries).reduce((queries, [queryName, queryFn]) => {
  queries[queryName] = queryFn.bind(null, document.body)
  return queries
}, {})
const customScreen = { ...screen, ...boundQueries }

// re-export everything
export * from '@testing-library/react'

// export our enhanced elements
export { customScreen as screen, customRender as render, wrappedRender }
