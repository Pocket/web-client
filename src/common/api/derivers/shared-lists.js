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

// process an individual list, viewable to the user only
// returns an array of keys
export function processIndividualList(responseData, utmId) {
  const { listItems, externalId: listId, ...rest } = responseData

  const listItemsById = getListItemsById(listItems, listId, utmId, 'private')
  const individualList = deriveList(rest, listId, listItems)

  const itemsById = {
    ...listItemsById,
    [listId]: individualList
  }

  return { itemsById }
}

export function processPublicList(responseData, utmId) {
  const { listItems, externalId: listId, ...rest } = responseData

  const listItemsById = getListItemsById(listItems, listId, utmId, 'public')
  const individualList = deriveList(rest, listId, listItems)

  const itemsById = {
    ...listItemsById,
    [listId]: individualList
  }

  return { itemsById }
}

// Loops through each list item and derives it based on the public vs private status
// return an object with the external id as the keys and list info as the value
function getListItemsById(listItems, listId, utmId, status) {
  const deriveFunction = status === 'public' ? derivePublicListItem : deriveListItem
  const processedItems = listItems.map((listItem) => {
    return deriveFunction(listItem, listId, utmId)
  }, {})

  return arrayToObject(processedItems, 'externalId')
}

// Builds a saved list item
// Derives list item & analytics data from item & savedItem metadata
// Adds a utm parameter to the derived list item url
// Used for the individual list page
function deriveListItem(listItem, listId, utmId) {
  const { externalId, imageUrl, note, createdAt, item } = listItem
  const { savedItem } = item
  const derivedItem = deriveSavedItem({ ...savedItem, item }, utmId)
  const { title, excerpt, publisher, givenUrl } = derivedItem?.item

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

// Builds a public list item
// Derives list item & analytics data from item metadata only (since there is no savedItem)
// Adds a utm parameter to the derived list item url
// Used for the public list page
function derivePublicListItem(listItem, listId, utmId) {
  const { externalId, imageUrl, note, createdAt, item } = listItem
  const derivedItem = deriveItemData({ item, utmId })
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
