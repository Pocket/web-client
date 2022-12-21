import { READING_WPM } from 'common/constants'
import { domainForUrl } from 'common/utilities/urls/urls'

export function deriveReaderRecitItems(recommendations) {
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
  const recs = recommendations.map((feedItem) => ({
    resolved_id: feedItem.item?.resolved_id,
    item_id: feedItem.item?.item_id,
    title: displayTitle(feedItem),
    thumbnail: displayThumbnail(feedItem),
    publisher: displayPublisher(feedItem),
    excerpt: displayExcerpt(feedItem),
    save_url: saveUrl(feedItem),
    open_url: openUrl(feedItem),
    original_url: originalUrl(feedItem),
    resolved_url: feedItem.item?.resolved_url,
    read_time: readTime(feedItem),
    has_image: feedItem.item?.has_image,
    has_video: feedItem.item?.has_video,
    is_article: feedItem.item?.is_article,
    save_status: 'unsaved',
    openExternal: true
  }))

  // This is to make sure we don't promote borked content
  return recs.filter((item) => item?.title && item?.excerpt)
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
  return correct_image ? correct_image : null
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
function displayPublisher({ item }) {
  const urlToUse = openUrl({ item })
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
function openUrl({ item }) {
  return item?.given_url || item?.resolved_url || false
}

/** SAVE URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item }) {
  return item?.normal_url || item?.resolved_url || false
}

/** OPEN_ORIGINAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be opened when visiting the live page
 */
function originalUrl({ item }) {
  if (item?.save_url) return item?.save_url
  if (item?.normal_url) return item?.normal_url
  if (item?.resolved_url) return item?.resolved_url
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
 * CHECK EXTERNAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether to open an item in a new tab
 */
export function checkExternal(item) {
  if (item?.has_video === '2') return false
  if (item?.has_image === '2') return false
  if (item?.is_article === '1') return false
  return true
}
