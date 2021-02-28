const REACT_CLIENT_READY_ID = 'react-client-ready'

/**
 * Use within a React app's componentDidMount lifecycle to signal that the app
 * is mounted and ready to test - when the element is added/present on the page.
 * Use cy.get(markerId) to have cypress poll for that element, just after changing
 * routes or doing something that reloads the page. Once Cypress finds the element,
 * it will continue on with subsequent commands.
 *
 * This ensures that we don't try to interact with the Server-Side-Rendered page,
 * whose DOM will get clobbered by the client side React once it initializes. We
 * need to wait for the client side to initialize.
 */
export function signalTestsReady() {
  if (process.env.SHOW_DEV === 'included') {
    const testsReadyDiv = document.createElement('div')
    testsReadyDiv.id = REACT_CLIENT_READY_ID
    document.body.append(testsReadyDiv)
  }
}

/**
 * Alias for using cy.get to get the tests-ready marker element, so that only
 * this and signalTestsReady need to know what the id of the element is.
 *
 * @return  {[type]}  [return description]
 */
export function waitForTestsReady() {
  cy.get(`#${REACT_CLIENT_READY_ID}`)
}
