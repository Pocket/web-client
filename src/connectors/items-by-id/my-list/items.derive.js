import { READING_WPM } from 'common/constants'
import { getImageCacheUrl, domainForUrl } from 'common/utilities'

export function deriveMyListItems(response) {
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
      item_id: item?.item_id,
      resolved_id: item?.resolved_id,
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
      save_url: saveUrl({ item }),
      open_url: openUrl({ item }),
      read_time: readTime({ item }),
      syndicated: syndicated({ item }),
      openExternal: openExternal({ item })
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
  return correct_image
    ? getImageCacheUrl(correct_image, { width: 300, height: 200 })
    : null
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
export function displayPublisher({ item }) {
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
