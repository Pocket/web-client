import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { appReducers, appSagas } from 'connectors/app/app.state'
import { userReducers, userSagas } from 'connectors/user/user.state'

/* REDUCERS
 --------------------------------------------------------------- */
const pageReducers = {}

const connectorReducers = {
  app: appReducers, // App wide (mostly example at this time)
  user: userReducers // User profile and auth
}

const rootReducer = combineReducers({
  ...pageReducers,
  ...connectorReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([...appSagas, ...userSagas])
}

/* STORE
 --------------------------------------------------------------- */
export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Pocket Discover' })
      : compose

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(initializeStore, { debug: false })
