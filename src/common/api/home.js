import { requestGQL } from 'common/utilities/request/request'
import { getRecIds, arrayToObject } from 'common/utilities'
import getSlateLineup from 'common/api/graphql-queries/get-slate-lineup'

// ?? NOTE: Do not use this in production.  Should be switch to the `homeLineup`
// ?? which will fall back to this.
const fallbackLineup = '249850f0-61c0-46f9-a16a-f0553c222800'
// const homeLineup = '05027beb-0053-4020-8bdc-4da2fcc0cb68'

export async function getHomeLineup({ recommendationCount = 5 }) {
  const id = fallbackLineup
  return requestGQL({
    query: getSlateLineup,
    variables: { id, recommendationCount }
  })
    .then(processLineup)
    .catch((error) => console.error(error))
}

function processLineup(response) {
  const slateLineup = getRecIds(response?.data?.getSlateLineup)
  const slatesResponse = response?.data?.getSlateLineup.slates
  const itemsById = getRecsById(slatesResponse)
  const slatesById = processSlates(slatesResponse)
  const slates = slatesResponse.map((slate) => slate?.id)

  return { slates, slatesById, itemsById, slateLineup }
}

function getRecsById(slates) {
  return slates.reduce((accumulator, current) => {
    const recommendations = deriveItems(current?.recommendations)
    const recsById = arrayToObject(recommendations, 'item_id')
    return { ...accumulator, ...recsById }
  }, {})
}

function processSlates(slates) {
  const slateWithIds = slates.map((slate) => {
    return { ...slate, recommendations: slate?.recommendations?.map((rec) => rec?.item?.itemId) }
  })
  return arrayToObject(slateWithIds, 'id')
}

export function deriveItems(recommendations) {
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
  return recommendations.map((recommendation) => {
    return {
      resolved_id: recommendation.item?.resolvedId,
      item_id: recommendation.item?.itemId,
      title: displayTitle(recommendation),
      thumbnail: displayThumbnail(recommendation),
      publisher: displayPublisher(recommendation),
      excerpt: displayExcerpt(recommendation),
      save_url: saveUrl(recommendation),
      open_url: openUrl(recommendation),
      original_url: originalUrl(recommendation),
      resolved_url: recommendation.item?.resolvedUrl,
      syndicated: syndicated(recommendation),
      openExternal: false,
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
  return curatedInfo?.imageSrc || item?.topImageUrl || false
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
function displayPublisher({ item, publisher }) {
  return item.domainMetadata?.name || publisher
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

/**
 * SYNDICATION
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} if the item is syndicated or not
 */
const syndicated = function ({ item }) {
  return !!item?.syndicatedArticle
}
