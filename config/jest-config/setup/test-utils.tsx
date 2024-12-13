import { RenderOptions, render } from '@testing-library/react'
import { ViewportProvider } from '../../../clients/web/src/components/viewport-provider/viewport-provider'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer, initializeStore } from '../../../clients/web/src/store'

import { i18n } from './test-i18n'
import { I18nextProvider } from 'react-i18next'

import { type JSX } from 'react'
import type { PropsWithChildren, ReactElement } from 'react'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof initializeStore>
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: Partial<RootState>
  store?: AppStore
}

export function customRender(
  ui: ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return (
      <I18nextProvider i18n={i18n}>
        <ViewportProvider>
          <Provider store={store}>{children}</Provider>
        </ViewportProvider>
      </I18nextProvider>
    )
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

//Google ReCaptcha
// https://gist.github.com/Bartuz/baa4cb3cff45286a519acc5ad0313bd7
declare global {
  interface Window {
    grecaptcha: any
  }
}

const nop = () => {}

const reaptchaCallbackName = (type: string) => {
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
    ready: (callback: () => void) => callback(),
    render: (_html: any, reaptchaConfig: { [x: string]: any }) => {
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
  const ReactModalMock = ({ children }: PropsWithChildren) => <div>{children}</div>
  ReactModalMock.setAppElement = setAppElementStub
  jest.mock('react-modal', () => ReactModalMock)

  const portalRoot = document.getElementById('portal')
  if (!portalRoot) {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return { setAppElementStub }
}

// Mock the IntersectionObserver, see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
export class IntersectionObserver {
  root = null
  rootMargin = ''
  thresholds = []

  disconnect() {
    return null
  }

  observe() {
    return null
  }

  takeRecords() {
    return []
  }

  unobserve() {
    return null
  }
}
window.IntersectionObserver = IntersectionObserver
global.IntersectionObserver = IntersectionObserver
