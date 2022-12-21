import { READING_WPM } from 'common/constants'
import { domainForUrl } from 'common/utilities/urls/urls'
import { urlWithPocketRedirect } from 'common/utilities/urls/urls'

export function deriveItems(response) {
  /**
   * @title {string} The most appropriate title to show
   * @thumbnail {url} The most appropriate image to show as a thumbnail
   * @publisher {string} The best text to display as the domain or publisher of this item
   * @excerpt {string} The most appropriate excerpt to show
   * @save_url {url} The url that should be saved
   * @open_url {url} The url that should be opened
   * @read_time {string} An approximation of how long it takes to read the article based on
   * @original_url {url} The url that goes through a redirect
   * @openExternal {bool} Whether an item should open in a new tab or reader
   * @save_status {string} A string value (unsaved, saving, saved)
   * @post {object} Metadata around the recommendation; name, date, comment, etc.
   */
  return response.map((feedItem) => {
    return {
      feed_item_id: feedItem.feed_item_id,
      resolved_id: feedItem.item?.resolved_id,
      item_id: feedItem.item?.item_id,
      title: displayTitle(feedItem),
      thumbnail: displayThumbnail(feedItem),
      publisher: displayPublisher(feedItem),
      excerpt: displayExcerpt(feedItem),
      save_url: saveUrl(feedItem),
      open_url: openUrl(feedItem),
      read_time: readTime(feedItem),
      has_image: feedItem.item?.has_image,
      has_video: feedItem.item?.has_video,
      is_article: feedItem.item?.is_article,
      original_url: originalUrl(feedItem),
      openExternal: checkExternal(feedItem),
      save_status: 'unsaved',
      post: feedItem.post
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
function displayTitle({ item }) {
  return item?.title || item?.given_title || item?.resolved_url || null
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */
function displayThumbnail({ item }) {
  const correct_image =
    item?.image_src ||
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
function displayPublisher({ item }) {
  const urlToUse = saveUrl({ item })
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
  return item?.given_url || item?.resolved_url || null
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
  if (item?.save_url) return urlWithPocketRedirect(item?.save_url)
  if (item?.normal_url) return urlWithPocketRedirect(item?.normal_url)
  if (item?.resolved_url) return urlWithPocketRedirect(item?.resolved_url)
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
 * OPEN EXTERNAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether to open an item in a new tab
 */
export function checkExternal() {
  return true
}
