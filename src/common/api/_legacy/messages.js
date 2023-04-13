import { request } from 'common/utilities/request/request'
import { arrayToObject } from 'common/utilities/object-array/object-array'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getShares() {
  return request({
    path: 'v3/getPendingShares',
    auth: true

  })
  .then(handleResponse)
  .catch((error) => console.error(error))
}

function handleResponse(response){
  if(response.status !== 1) return response // Error will get handled down the line: Legacy
  const { notifications, unconfirmed_shares } = response
  const itemsArray = [
    ...notifications.map((notification) => notification.item),
    ...unconfirmed_shares.map((share) => share.item)
  ]
  const derivedItems = itemsArray.map(modernizeItem)
  const itemsById = arrayToObject(derivedItems, 'itemId')

  return {status: 1, notifications, unconfirmed_shares, itemsById}
}

export function resendConfirmation(email) {
  return request({
    path: 'v3/resendEmailConfirmation',
    params: { email },
    auth: true
  })
}


function modernizeItem(node) {
  const item = node?.item || node
  const {
    item_id,
    given_url,
    resolved_id,
    resolved_title,
    resolved_url,
    excerpt,
    domain_metadata,
    authors,
    image,
    images,
    ...rest
  } = item

  const convertedItem = {
    itemId: item_id || resolved_id,
    title: resolved_title || given_url,
    excerpt,
    resolvedTitle: resolved_title,
    itemImage: image?.src,
    domainMetadata: domain_metadata,
    givenUrl: given_url,
    resolvedUrl: resolved_url,
    authors: authors ? Object.values(authors) : [],
    images: images ? Object.values(images) : [],
    externalUrl: given_url,
    saveUrl: given_url,
    ...rest
  }

  // Derive checks if this key exists, so adding it without condition gives a false positive
  return convertedItem
}
