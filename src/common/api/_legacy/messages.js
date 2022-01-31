import { request } from 'common/utilities/request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getShares() {
  return request({
    path: 'v3/getPendingShares',
    auth: true
  })
}

export function resendConfirmation(email) {
  return request({
    path: 'v3/resendEmailConfirmation',
    params: { email },
    auth: true
  })
}
