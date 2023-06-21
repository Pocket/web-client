import { arrayToObject } from 'common/utilities/object-array/object-array'
import { deriveSavedItem } from './item'
import { deriveItemData } from './item'

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

// process an individual list
// used for both internal and public views
// returns an array of keys
export function processIndividualList(responseData, utmId, status) {
  const { listItems, externalId: listId, ...rest } = responseData

  const listItemsById = getListItemsById(listItems, listId, utmId, status)
  const individualList = deriveList(rest, listId, listItems)

  const itemsById = {
    ...listItemsById,
    [listId]: individualList
  }

  return { itemsById }
}

// Loops through each list item and derives it based on the public vs internal status
// return an object with the external id as the keys and list info as the value
function getListItemsById(listItems, listId, utmId, status) {
  const processedItems = listItems.map((listItem) => {
    return deriveListItem(listItem, listId, utmId, status)
  }, {})

  return arrayToObject(processedItems, 'externalId')
}

// Builds a list item from the server response data
// Derives list item & analytics data from item & (potentially) savedItem metadata
// Adds a utm parameter to the derived list item url
// Returns a list item
function deriveListItem(listItem, listId, utmId, status) {
  const { externalId, imageUrl, note, createdAt, item } = listItem
  const derivedItem = deriveItemMetadata(item, utmId, status)

  const { title, excerpt, publisher, givenUrl } = derivedItem

  const analyticsData = {
    id: externalId,
    shareableListItemExternalId: externalId,
    shareableListExternalId: listId,
    givenUrl: givenUrl,
    title: title,
    excerpt: excerpt,
    imageUrl: imageUrl,
    publisher: publisher,
    createdAt: Date.parse(createdAt) / 1000
  }

  return {
    externalId,
    imageUrl,
    note,
    createdAt,
    ...derivedItem,
    note: decodeSpecialChars(note),
    analyticsData
  }
}

// Based on public vs internal status
// Runs the item that is returned from the server through our item derivers to build the correct metadata
// Returns a derived item
function deriveItemMetadata(item, utmId, status) {
  if (status === 'internal') {
    const { savedItem } = item
    return deriveSavedItem({ ...savedItem, item }, utmId)
  }

  if (status === 'public') {
    return deriveItemData({ item, utmId })
  }

  // Sentry error here?
  return null
}

// Build a List and compile the analytics
// Process the card image
function deriveList(list, listId, listItems) {
  const { slug, title, description, status, moderationStatus, listItemNoteVisibility, createdAt } = list //prettier-ignore
  const analyticsData = {
    id: listId,
    shareableListExternalId: listId,
    slug: slug || '',
    title: title,
    description: description,
    status: status,
    moderationStatus: moderationStatus,
    listItemNoteVisibility: listItemNoteVisibility,
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

export function decodeSpecialChars(string) {
  const GT_ENCODED = '&gt;' // >
  const LT_ENCODED = '&lt;' // <

  if (!string) return string

  return string.replaceAll(GT_ENCODED, '>').replaceAll(LT_ENCODED, '<')
}
