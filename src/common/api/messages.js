import { request } from 'common/utilities/request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getShares() {
  return request({
    path: 'v3/getPendingShares',
    auth: true
  })
}

export function addShare({ share_id, item_id, item }) {
  return request({
    path: 'v3/send',
    data: {
      actions: [
        {
          action: 'share_added',
          share_id: parseInt(share_id, 10),
          item_id: item_id,
          item
        }
      ]
    },
    auth: true
  })
}

export function ignoreShare({ share_id, item_id, item }) {
  return request({
    path: 'v3/send',
    data: {
      actions: [
        {
          action: 'share_ignored',
          share_id: parseInt(share_id, 10),
          item_id: item_id,
          item
        }
      ]
    },
    auth: true
  })
}

export function resendConfirmation(email) {
  return request({
    path: 'v3/resendEmailConfirmation',
    data: { email },
    auth: true
  })
}
