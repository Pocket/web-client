import { request, postMime } from 'common/utilities/request/request'

export const putAccountChange = (data) => {
  return request({
    method: 'POST',
    path: 'v3/acctchange',
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
