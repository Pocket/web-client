import { arrayToObject } from 'common/utilities/object-array/object-array'
import { replaceUTM } from 'common/utilities/urls/urls'

// Process a list of lists, viewable to the user only
export function processAllList(responseData) {
  const allLists = responseData

  const lists = responseData.map(({ externalId, listItems, ...rest }) => {
    return deriveList(rest, externalId, listItems)
  })

  const externalIds = allLists.map((list) => list.externalId)
  const titleToIdList = lists.reduce((obj, list) => ({ ...obj, [list.title]: list.externalId }), {})
  const itemsById = arrayToObject(lists, 'externalId')

  return { externalIds, itemsById, titleToIdList }
}

// process an individual list, viewable to the user only
// returns an array of keys
export function processIndividualList(responseData, utmId) {
  const { listItems, externalId: listId, ...rest } = responseData

  const listItemsById = getListItemsById(listItems, listId, utmId)
  const individualList = deriveList(rest, listId, listItems)

  const itemsById = {
    ...listItemsById,
    [listId]: individualList
  }

  return { itemsById }
}

// Loops through each list item and derives it
// return an object with the external id as the keys and list info as the value
function getListItemsById(listItems, listId, utmId) {
  const processedItems = listItems.map((item) => {
    return deriveListItem(item, listId, utmId)
  }, {})

  return arrayToObject(processedItems, 'externalId')
}

// Builds a list item, compiles the analytics
// Adds a utm paramter to the external url
function deriveListItem(item, listId, utmId) {
  const { externalId, url, title, excerpt, imageUrl, publisher, note, createdAt } = item
  const analyticsData = {
    id: externalId,
    shareableListItemExternalId: externalId,
    shareableListExternalId: listId,
    givenUrl: url,
    title: title,
    excerpt: excerpt,
    imageUrl: imageUrl,
    publisher: publisher,
    createdAt: Date.parse(createdAt) / 1000
  }

  return {
    ...item,
    url: replaceUTM(url, utmId),
    note: decodeSpecialChars(note),
    analyticsData
  }
}

// Build a List and compile the analytics
// Process the card image
function deriveList(list, listId, listItems) {
  const { slug, title, description, status, moderationStatus, createdAt } = list
  const analyticsData = {
    id: listId,
    shareableListExternalId: listId,
    slug: slug || '',
    title: title,
    description: description,
    status: status,
    moderationStatus: moderationStatus,
    createdAt: Date.parse(createdAt) / 1000
  }

  const listItemIds = listItems.map((item) => item.externalId)

  return {
    ...list,
    title: decodeSpecialChars(title),
    description: decodeSpecialChars(description),
    itemImage: listItems?.[0]?.imageUrl,
    externalId: listId,
    listItemIds,
    analyticsData
  }
}

function decodeSpecialChars(string) {
  const GT_ENCODED = '&gt;' // >
  const LT_ENCODED = '&lt;' // <

  if (!string) return string

  return string.replaceAll(GT_ENCODED, '>').replaceAll(LT_ENCODED, '<')
}
