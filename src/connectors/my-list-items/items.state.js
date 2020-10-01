import { put, takeEvery } from 'redux-saga/effects'
import { READING_WPM } from 'common/constants'
import { getImageCacheUrl, domainForUrl } from 'common/utilities'
import { saveItem as saveItemAPI } from 'common/api/saveItem'
import { removeItem as removeItemAPI } from 'common/api/removeItem'

import { MYLIST_ITEMS_HYDRATE } from 'actions'
import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_ITEMS_SAVE_REQUEST } from 'actions'
import { MYLIST_ITEMS_SAVE_SUCCESS } from 'actions'
import { MYLIST_ITEMS_SAVE_FAILURE } from 'actions'
import { MYLIST_ITEMS_UNSAVE_REQUEST } from 'actions'
import { MYLIST_ITEMS_UNSAVE_SUCCESS } from 'actions'
import { MYLIST_ITEMS_UNSAVE_FAILURE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateItems = (hydrated) => ({ type: MYLIST_ITEMS_HYDRATE, hydrated }) //prettier-ignore
export const saveItem = (id, url, analytics) => ({type: MYLIST_ITEMS_SAVE_REQUEST, id, url, analytics}) //prettier-ignore
export const unSaveItem = id => ({ type: MYLIST_ITEMS_UNSAVE_REQUEST, id }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const myListItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case MYLIST_ITEMS_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated }
    }

    case MYLIST_DATA_SUCCESS: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case MYLIST_ITEMS_SAVE_REQUEST: {
      const { id } = action
      return updateSaveStatus(state, id, 'saving')
    }

    case MYLIST_ITEMS_SAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    case MYLIST_ITEMS_SAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case MYLIST_ITEMS_UNSAVE_SUCCESS: {
      const { id } = action
      return updateSaveStatus(state, id, 'unsaved')
    }

    case MYLIST_ITEMS_UNSAVE_FAILURE: {
      const { id } = action
      return updateSaveStatus(state, id, 'saved')
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE:
      const { discoverItemsById } = action.payload
      return { ...state, ...discoverItemsById }

    default:
      return state
  }
}

/** UPDATE SAVE STATUS
 * Helper function to update save status for a specific item based on id
 * @param {object} state Redux state object
 * @param {string} id Item id to operate on
 * @param {string} save_status Value to update save status to
 */
export function updateSaveStatus(state, id, save_status) {
  const updatedItem = { ...state[id], save_status }
  return { ...state, [id]: updatedItem }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListItemsSagas = [
  takeEvery(MYLIST_ITEMS_SAVE_REQUEST, itemsSaveRequest),
  takeEvery(MYLIST_ITEMS_UNSAVE_REQUEST, itemsUnSaveRequest)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

function* itemsSaveRequest(action) {
  try {
    const { url, id, analytics } = action

    const response = yield saveItemAPI(url, analytics)
    if (response?.status !== 1) throw new Error('Unable to save')

    yield put({ type: MYLIST_ITEMS_SAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: MYLIST_ITEMS_SAVE_FAILURE, error })
  }
}

function* itemsUnSaveRequest(action) {
  try {
    const { id } = action

    const response = yield removeItemAPI(id)
    if (response?.status !== 1) throw new Error('Unable to remove item')

    yield put({ type: MYLIST_ITEMS_UNSAVE_SUCCESS, id })
  } catch (error) {
    yield put({ type: MYLIST_ITEMS_UNSAVE_FAILURE, error })
  }
}

export function deriveItemData(response) {
  /**
   * @title {string} The most appropriate title to show
   * @thumbnail {url} The most appropriate image to show as a thumbnail
   * @domain {string} The best text to display as the domain or publisher of this item
   * @excerpt {string} The most appropriate excerpt to show
   * @open_url {url} The url that should be saved or opened
   * @share_url {url} The url that should be shared if the user shares this item
   * @read_time {string} An approximation of how long it takes to read the article based on
   * @save_status {string} A string value (unsaved, saving, saved)
   */
  return response.map((item) => {
    return {
      resolved_id: item?.resolved_id,
      sort_id: item?.sort_id,
      favorite: item?.favorite,
      has_image: item?.has_image,
      has_video: item?.has_video,
      is_article: item?.is_article,
      is_index: item?.is_index,
      lang: item?.lang,
      listen_duration_estimate: item?.listen_duration_estimate,
      sort_id: item?.sort_id,
      status: item?.status,
      time_added: '1600201689',
      time_favorited: item?.time_favorited,
      time_read: item?.time_read,
      time_updated: item?.time_updated,
      title: displayTitle({ item }),
      thumbnail: displayThumbnail({ item }),
      publisher: displayPublisher({ item }),
      excerpt: displayExcerpt({ item }),
      save_url: saveUrl({ item }),
      open_url: openUrl({ item }),
      read_time: readTime({ item }),
      syndicated: syndicated({ item }),
      save_status: 'unsaved'
    }
  })
}

/** DERIVE Functions
  * ? Derived fields to help clarify logic for what values to use in some common cases
  * ? The data we receive this is not normalized yet.
 --------------------------------------------------------------- */

/** TITLE
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The most appropriate title to show
 */
function displayTitle({ item, curated_info }) {
  return (
    curated_info?.title ||
    item?.title ||
    item?.resolved_title ||
    item?.given_title ||
    item?.display_url ||
    null
  )
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */

function displayThumbnail({ item, curated_info }) {
  const correct_image =
    curated_info?.image_src ||
    item?.top_image_url ||
    item?.images?.[Object.keys(item.images)[0]]?.src ||
    null
  return correct_image ? getImageCacheUrl(correct_image) : null
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
function displayPublisher({ item }) {
  const urlToUse = openUrl({ item })
  const derivedDomain = domainForUrl(urlToUse)
  const syndicatedPublisher = item?.syndicated_article?.publisher?.name
  return (
    syndicatedPublisher ||
    item?.domain_metadata?.name ||
    item?.domain ||
    derivedDomain ||
    null
  )
}

/** EXCERPT
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The most appropriate excerpt to show
 */
function displayExcerpt({ item, curated_info }) {
  return curated_info?.excerpt || item?.excerpt || null
}

/** OPEN URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function openUrl({ item, redirect_url }) {
  return (
    devLink(item) ||
    redirect_url ||
    item?.given_url ||
    item?.resolved_url ||
    null
  )
}

/** SAVE URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item }) {
  return item?.given_url || item?.resolved_url || null
}

/** READ TIME
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {int} average number of minutes to read the item
 */
function readTime({ item }) {
  return item?.time_to_read || readTimeFromWordCount(item?.word_count) || null
}

/**
 * READ TIME FROM WORD COUNT
 * @param {int} wordCount number of words in an article
 * @returns {int} number of words per minute in minutes
 */
function readTimeFromWordCount(wordCount) {
  if (!wordCount) return false
  return Math.ceil(parseInt(wordCount, 10) / READING_WPM)
}

/**
 * SYNDICATION
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} if the item is syndicated or not
 */
const syndicated = function ({ item }) {
  if (!item) return false
  return 'syndicated_article' in item
}

const devLink = function (item) {
  // In Dev, don't use redirect so we may test article view more easily
  const isSyndicated = syndicated({ item })
  const isDev = process.env.SHOW_DEV === 'included'
  const path = item?.resolved_url || false
  return isSyndicated && isDev && path
    ? `discover/item/${path.substring(path.lastIndexOf('/') + 1)}`
    : false
}
