/**
 * Map of users for different account types (e.g. premium vs non-premium)
 *
 * Only user names are stored here, passwords are pulled from a Cypress env variable.
 */

const Users = {
  // standard non-premium account to use for logged-in actions
  defaultUser: 'frontend-test+fran@getpocket.com'
}

export default Users
