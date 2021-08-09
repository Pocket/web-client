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
   * @recommendation_id {string} A string value needed for snowplow recommendation entity
   * @slateLineup {object} A object needed for snowplow slate-lineup entity
   * @slate {object} A object needed for snowplow slate entity
   */
  return response.map((feedItem) => {
    return {
      resolved_id: feedItem.item?.resolved_id || feedItem.item?.resolvedId,
      item_id: feedItem.item?.item_id || feedItem.item?.itemId,
      title: displayTitle(feedItem),
      thumbnail: displayThumbnail(feedItem),
      publisher: displayPublisher(feedItem),
      excerpt: displayExcerpt(feedItem),
      save_url: saveUrl(feedItem),
      open_url: openUrl(feedItem),
      read_time: readTime(feedItem),
      syndicated: syndicated(feedItem),
      original_url: originalUrl(feedItem),
      resolved_url: feedItem.item?.resolvedUrl,
      openExternal: false,
      save_status: 'unsaved',
      recommendationId: feedItem.id || feedItem.item?.resolved_id,
      slateLineup: feedItem.slateLineup,
      slate: feedItem.slate
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
function displayTitle({ item, curatedInfo, curated_info }) {
  return (
    curatedInfo?.title ||
    curated_info?.title ||
    item?.title ||
    item?.normalUrl ||
    item?.normal_url ||
    null
  )
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */

function displayThumbnail({ item, curatedInfo }) {
  const correct_image =
    curatedInfo?.imageSrc ||
    curatedInfo?.image_src ||
    item?.topImageUrl ||
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
  const urlToUse = saveUrl({ item })
  const derivedDomain = domainForUrl(urlToUse)
  const syndicatedPublisher =
    item?.syndicatedArticle?.publisher?.name || item?.syndicated_article?.publisher?.name
  return (
    syndicatedPublisher ||
    item?.domainMetadata?.name ||
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
function displayExcerpt({ item, curatedInfo, curated_info }) {
  return curatedInfo?.excerpt || curated_info?.excerpt || item?.excerpt || null
}

/** OPEN URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 * When to use given_url or item_id:
 * When using it as an identifier with the API (actions, saving, etc)
 * When opening an item in a web browser
 * When sharing a link
 * NOT as a display url, unless no resolved_url exists
 * NOT as the display domain, unless no resolved_url exists
 *
 * When to use resolved_url or resolved_id:
 * When displaying a url to a user
 * When displaying a domain to a user
 * NOT when communicating with the API or for saving
 * NOT for opening in a web browser
 *
 * Do NOT use the following for syncing or opening content:
 * normal_urls - They are meant for internal database syncing only
 * resolved_ids - They are just links to resolved_urls
 */
function openUrl({ item }) {
  const url = originalUrl({ item })
  if (url) return `${url}?utm_source=pocket_discover`
  return false
}

/** SAVE URL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item }) {
  return item?.givenUrl || false
}

/** OPEN_ORIGINAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The url that should be opened when visiting the live page
 */
function originalUrl({ item }) {
  return item?.givenUrl || false
}

/** READ TIME
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {int} average number of minutes to read the item
 */
function readTime({ item }) {
  const timeToRead = item?.timeToRead || item?.time_to_read
  const wordCount = item?.wordCount || item?.word_count
  return timeToRead || readTimeFromWordCount(wordCount) || null
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
  return 'syndicated_article' in item || !!item?.syndicatedArticle
}
