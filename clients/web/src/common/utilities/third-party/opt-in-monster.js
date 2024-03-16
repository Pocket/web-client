import { injectLibScript } from 'common/utilities/inject-script'

export function loadOptinMonster() {
  const ACCOUNT_ID = 58246
  const USER_ID = 51753

  // Adds OptinMonster to page with custom attributes
  injectLibScript(
    '//a.omappapi.com/app/js/api.min.js',
    [
      { name: 'data-account', value: ACCOUNT_ID },
      { name: 'data-user', value: USER_ID }
    ],
    true
  )
}
