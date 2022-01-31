import { request } from 'common/utilities/request/request'

export function fetchStoredTags() {
  const since = Date.now()
  return request({
    path: 'v3/get',
    params: {
      taglist: 1,
      forcetaglist: 1,
      since
    },
    auth: true
  }).then((response) => response)
}

export function fetchStoredTagChanges(since) {
  return request({
    path: 'v3/get',
    params: {
      taglist: 1,
      since
    },
    auth: true
  }).then((response) => response)
}

export function renameStoredTag({ new_tag, old_tag }) {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'tag_rename', new_tag, old_tag }]
    })
  }).then((response) => response)
}

export function deleteStoredTag(tag) {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'tag_delete', tag }]
    }),
    auth: true
  }).then((response) => response)
}

export function getSuggestedTags(item_id) {
  return request({
    path: 'v3/getSuggestedTags',
    auth: true,
    method: 'POST',
    body: JSON.stringify({
      version: 2,
      item_id
    })
  })
}
