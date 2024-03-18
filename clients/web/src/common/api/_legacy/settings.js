import { request } from 'common/utilities/request/request'

//https://github.com/Pocket/spec/blob/master/query/v3server/appSettings.md
export const getAppSettings = () => {
  return request({
    method: 'POST',
    path: 'v3/getAppSettings',
    auth: true
  })
}

export const putAppSettings = (data) => {
  return request({
    method: 'POST',
    path: 'v3/putAppSettings',
    body: JSON.stringify({ data }),
    auth: true
  })
}
