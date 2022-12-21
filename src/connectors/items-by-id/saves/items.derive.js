import { READING_WPM } from 'common/constants'
import { domainForUrl, replaceUTM } from 'common/utilities/urls/urls'
import { urlWithPermanentLibrary } from 'common/utilities/urls/urls'

export function deriveSavesItems(response) {
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
    // Status of 2 means it has been deleted and shouldn't be stored
    // Unclear why these items are being sent. This needs to be resolved by Backend
    if (item?.status === '2') return

    return {
      item_id: item?.item_id,
      resolved_id: item?.resolved_id,
      resolved_url: item?.resolved_url,
      sort_id: item?.sort_id,
      favorite: item?.favorite,
      has_image: item?.has_image,
      has_video: item?.has_video,
      is_article: item?.is_article,
      is_index: item?.is_index,
      lang: item?.lang,
      listen_duration_estimate: item?.listen_duration_estimate,
      status: item?.status,
      time_added: item?.time_added,
      time_favorited: item?.time_favorited,
      time_read: item?.time_read,
      time_updated: item?.time_updated,
      tags: item?.tags,
      annotations: item?.annotations,
      images: item?.images,
      videos: item?.videos,
      authors: item?.authors,
      title: displayTitle({ item }),
      thumbnail: displayThumbnail({ item }),
      publisher: displayPublisher({ item }),
      excerpt: displayExcerpt({ item }),
      read_time: readTime({ item }),
      syndicated: syndicated({ item }),
      save_url: saveUrl({ item }),
      open_url: openUrl({ item }),
      original_url: originalUrl({ item }),
      permanent_url: permanentUrl({ item }),
      openExternal: openExternal({ item }),
      isCollection: isCollection({ item })
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
    displayPublisher({ item }) ||
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
    item?.image?.src ||
    item?.images?.[Object.keys(item.images)[0]]?.src ||
    false
  return correct_image ? correct_image : false
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
export function displayPublisher({ item }) {
  const urlToUse = item?.given_url || item?.resolved_url
  const derivedDomain = domainForUrl(urlToUse)
  const syndicatedPublisher = item?.syndicated_article?.publisher?.name
  return syndicatedPublisher || item?.domain_metadata?.name || item?.domain || derivedDomain || null
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
  const linkWithUTM = replaceUTM(item?.given_url, 'pocket_saves')
  return devLink(item) || redirect_url || linkWithUTM
}

/** SAVE URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item }) {
  return item?.given_url || item?.resolved_url || false
}

/** OPEN_ORIGINAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be opened when visiting the live page
 */
function originalUrl({ item }) {
  return item?.given_url || item?.resolved_url || false
}

/** OPEN_PERMANENT
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url for permanent library
 */
function permanentUrl({ item }) {
  return urlWithPermanentLibrary(item?.item_id) || false
}

/** READ TIME
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {int} average number of minutes to read the item
 */
export function readTime({ item }) {
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

/**
 * OPEN EXTERNAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether to open an item in a new tab
 */
function openExternal({ item }) {
  if (item?.has_video === '2') return false
  if (item?.has_image === '2') return false
  if (item?.is_article === '1') return false
  return true
}

/**
 * IS COLLECTION
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether an item is a collection
 *
 * https://regexr.com/5volt - A place to test the regular expression
 */

function isCollection({ item }) {
  const url = item?.resolved_url || item?.given_url
  if (!url) return false

  const pattern = /.+?getpocket\.com\/(?:[a-z]{2}(?:-[a-zA-Z]{2})?\/)?collections\/(?!\?).+/gi
  return !!url.match(pattern)
}
