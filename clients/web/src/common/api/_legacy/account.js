import { request, postMime } from 'common/utilities/request/request'

export const putAccountChange = (data) => {
  return request({
    method: 'POST',
    path: 'v3/acctchange',
    body: JSON.stringify({ ...data }),
    auth: true
  })
}

export const addEmailAlias = (data) => {
  return request({
    method: 'POST',
    path: 'v3/addAlias',
    body: JSON.stringify({ ...data }),
    auth: true
  })
}

export const removeEmailAlias = (data) => {
  return request({
    method: 'POST',
    path: 'v3/deleteAlias',
    body: JSON.stringify({ ...data }),
    auth: true
  })
}

export const resendConfirmation = (data) => {
  return request({
    method: 'POST',
    path: 'v3/resendEmailConfirmation',
    body: JSON.stringify({ ...data }),
    auth: true
  })
}

export const setAvatar = (data) => {
  return postMime({
    path: 'v3/setAvatar',
    body: data,
    auth: true
  })
}

export const setRssProtection = (isOn) => {
  const feed_protected = isOn ? '1' : '0'
  return request({
    method: 'POST',
    path: 'v3/setPrivacySettings',
    body: JSON.stringify({ feed_protected }),
    auth: true
  })
}

export const clearAccount = () => {
  return request({
    method: 'POST',
    path: 'v3/accountClear',
    auth: true
  })
}

export const deleteAccount = () => {
  return request({
    method: 'POST',
    path: 'v3/accountDelete',
    auth: true
  })
}
