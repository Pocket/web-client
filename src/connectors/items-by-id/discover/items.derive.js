import { READING_WPM } from 'common/constants'
import { domainForUrl } from 'common/utilities'
import { urlWithPocketRedirect } from 'common/utilities'
import { urlWithPermanentLibrary } from 'common/utilities'

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
    console.log(feedItem)
    return {
      resolved_id: feedItem.item?.resolvedId,
      item_id: feedItem.item?.itemId,
      title: displayTitle(feedItem),
      thumbnail: displayThumbnail(feedItem),
      publisher: displayPublisher(feedItem),
      excerpt: displayExcerpt(feedItem),
      save_url: saveUrl(feedItem),
      open_url: openUrl(feedItem),
      read_time: readTime(feedItem),
      syndicated: syndicated(feedItem),
      original_url: originalUrl(feedItem),
      permanent_url: permanentUrl(feedItem),
      openExternal: openExternal(feedItem),
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
function displayTitle({ item, curatedInfo }) {
  return curatedInfo?.title || item?.title || item?.normalUrl || null
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */

function displayThumbnail({ item, curatedInfo }) {
  const correct_image =
    curatedInfo?.imageSrc ||
    item?.topImageUrl ||
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
  const syndicatedPublisher = item?.syndicatedArticle?.publisher?.name
  return syndicatedPublisher || item?.domainMetadata?.name || item?.domain || derivedDomain || null
}

/** EXCERPT
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The most appropriate excerpt to show
 */
function displayExcerpt({ item, curatedInfo }) {
  return curatedInfo?.excerpt || item?.excerpt || null
}

/** OPEN URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function openUrl({ item }) {
  return devLink(item) || originalUrl({ item })
}

/** SAVE URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item }) {
  return item?.normalUrl || item?.resolvedUrl || false
}

/** OPEN_ORIGINAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be opened when visiting the live page
 */
function originalUrl({ item }) {
  if (item?.givenUrl) return urlWithPocketRedirect(item?.givenUrl)
  if (item?.normalUrl) return urlWithPocketRedirect(item?.normalUrl)
  if (item?.resolvedUrl) return urlWithPocketRedirect(item?.resolvedUrl)
}

/** OPEN_PERMANENT
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url for permanent library
 */
function permanentUrl({ item }) {
  return urlWithPermanentLibrary(item?.itemId) || false
}

/** READ TIME
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {int} average number of minutes to read the item
 */
function readTime({ item }) {
  return item?.timeToRead || readTimeFromWordCount(item?.wordCount) || null
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
  return item?.syndicatedArticle
}

const devLink = function (item) {
  // In Dev, don't use redirect so we may test article view more easily
  const isSyndicated = syndicated({ item })
  const path = saveUrl({ item })
  const url = path ? path.substring(path.lastIndexOf('/') + 1) : false
  return isSyndicated && url ? `/explore/item/${url}` : false
}

/**
 * OPEN EXTERNAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether to open an item in a new tab
 */
function openExternal({ item }) {
  if (item?.hasVideo === 'IS_VIDEO') return false // NO_VIDEOS || HAS_VIDEOS || IS_VIDEO
  if (item?.hasImage === 'IS_IMAGE') return false // NO_IMAGES || HAS_IMAGES || IS_IMAGE
  if (item?.isArticle) return false // Boolean
  return true
}
