import { READING_WPM } from 'common/constants'
import { domainForUrl } from 'common/utilities'

export function deriveDiscoverItems(response) {
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
  return response.map((feedItem) => {
    return {
      resolved_id: feedItem.item?.resolved_id,
      title: displayTitle(feedItem),
      thumbnail: displayThumbnail(feedItem),
      publisher: displayPublisher(feedItem),
      excerpt: displayExcerpt(feedItem),
      save_url: saveUrl(feedItem),
      open_url: openUrl(feedItem),
      read_time: readTime(feedItem),
      syndicated: syndicated(feedItem),
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
    false
  return correct_image ? correct_image : false
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
