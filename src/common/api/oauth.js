import { request } from 'common/utilities/request/request'

export function getRequestToken() {
  return request({
    method: 'POST',
    path: 'v3/oauth/request',
    params: {
      redirect_uri: 'http://localhost.discover.getpocket.com'
    }
  })
}

export function getAccessToken(code) {
  return request({
    method: 'POST',
    path: 'v3/oauth/authorize',
    params: { code }
  })
}
