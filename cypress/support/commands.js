import { waitForTestsReady } from './utils'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//

Cypress.Commands.add('logout', () => {
  // Clearing cookies will log the user out for all intents and purposes
  // We should still revisit this when the auth strategy is solidified
  // FIXME when we have an auth API.
  cy.clearCookies()
})

Cypress.Commands.add('login', (userKey) => {
  // Disabled for now due to insurmountable problems with existing auth setup:
  // login page performs a redirect which clobbers Cypress; there is no accessible
  // endpoint for login; there is no way to bypass Recaptcha without changes on
  // the backend. For now we will not test the logged-in experience, and once
  // we have an auth API this command should programmatically log the user in.
  // cy.visit('https://getpocket.com/explore', { waitForReact: false })
})

// -- This will overwrite the existing "visit" command --
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // after we change to any page, make sure React has a chance to load fully on the client side.
  function visitAndWait() {
    const waitForReact = options?.waitForReact !== false
    originalFn(url, options)
    if (waitForReact) waitForTestsReady()
  }

  return visitAndWait()
})
