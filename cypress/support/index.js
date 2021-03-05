// ***********************************************************
// This support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
  // before each test, make sure the user starts logged out, so we can make that
  // assumption in tests without having to log the user out prior to every single
  // spec set. Doing this only because we can't currently handle auth via an API
  // and so we have to attempt to do it through UI which is SLOW
  cy.logout()
})
