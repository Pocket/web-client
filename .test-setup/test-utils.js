// test-utils.js
// https://testing-library.com/docs/react-testing-library/api/
import { render, queries } from '@testing-library/react'
import * as customQueries from './custom-queries'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../src/store'
import { ViewportProvider } from 'components/viewport-provider/viewport-provider'

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
    return (
      <ViewportProvider>
        <Provider store={store}>{children}</Provider>
      </ViewportProvider>
    )
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

//Google ReCaptcha
// https://gist.github.com/Bartuz/baa4cb3cff45286a519acc5ad0313bd7
const nop = () => {}

const reaptchaCallbackName = (type) => {
  switch (type) {
    case 'success':
      return 'callback'
      break
    case 'error':
      return 'error-callback'
    case 'expire':
      return 'expired-callback'
    default:
      throw `Unknown callback type ${type}. Supported types: success, error, expire`
  }
}

export const mockGrecaptcha = ({
  forceCallbackType = 'success',
  reset = nop,
  execute = nop,
  token = 'g-token'
} = {}) => {
  window.grecaptcha = {
    ready: (callback) => callback(),
    render: (_html, reaptchaConfig) => {
      const callback = reaptchaConfig[reaptchaCallbackName(forceCallbackType)]
      callback(token)
    },
    reset: reset,
    execute: execute
  }
}

export const mockModal = () => {
  // Mock modal
  const setAppElementStub = jest.fn()
  const ReactModalMock = ({ children }) => <div>{children}</div>
  ReactModalMock.setAppElement = setAppElementStub
  jest.mock('react-modal', () => ReactModalMock)

  let portalRoot = document.getElementById('portal')
  if (!portalRoot) {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return { setAppElementStub }
}
