import { replaceUTM } from 'common/utilities/urls/urls'
import { domainForUrl } from 'common/utilities/urls/urls'
import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { urlWithPermanentLibrary } from 'common/utilities/urls/urls'

import { BASE_URL } from 'common/constants'
/**
 * ————————————————————————————————————————————————————————————————————————
 * ITEM — as it exists in the graphQL (minus some fields we don't use)
 * ————————————————————————————————————————————————————————————————————————
 *
 * IDENTIFIERS
 * ————————————————————————————————————
 * @param {string} itemId — A server generated unique id for this item.
 *
 * URLS
 * ————————————————————————————————————
 * @param {URL} givenUrl — The url as provided by the user when saving. Only http or https schemes allowed.
 * @param {URL} resolvedUrl — If the givenUrl redirects (once or many times), this is the final url. Otherwise, same as givenUrl
 *
 * ITEM INFO
 * ————————————————————————————————————
 * @param {Array} authors — List of Authors involved with this article
 *   @param {string} id — Unique id for that Author
 *   @param {string} name — Display name
 *   @param {URL} url - A url to that Author's site
 * @param {string} domain The domain, such as 'getpocket.com' of the {.resolved_url}
 * @param {object} domainMetadata — Additional information about the item domain, when present, use this for displaying the domain name
 *   @param {string} name — The name of the domain (e.g., The New York Times)
 *   @param {URL} logo — Url for the logo image
 * @param {string} excerpt — A snippet of text from the article
 * @param {enum} hasImage — (1) NO_IMAGES=no images, (2) HAS_IMAGES=contains images, (3) IS_IMAGE=is an image
 * @param {enum} hasVideo  — (1) NO_VIDEOS=no images, (2) HAS_VIDEOS=contains images, (3) IS_VIDEO=is an image
 * @param {array} images — Array of images within an article NOTE: more image data is available from the server, but we only use this for the item
 *   @param {URL} src — Absolute url to the image
 * @param {Boolean} isArticle — true if the item is an article
 * @param {Boolean} isIndex — true if the item is an index / home page, rather than a specific single piece of content
 * @param {String} title — The title as determined by the parser.
 * @param {URL} topImageUrl — The page's / publisher's preferred thumbnail image
 * @param {DateString} datePublished — The date the article was published
 * @param {string} language — The detected language of the article
 * @param {Boolean} fromPartner — If a story is sponsored/partnered
 *
 * INCLUDED ITEM ENRICHMENT
 * ————————————————————————————————————
 * @param {object} syndicatedArticle — If the item has a syndicated counterpart the syndication information
 *   @param {string} slug — Slug that pocket uses for this article in the url
 *   @param {object} publisher — The manually set publisher information for this article
 *     @param {string} name — Name of the publisher of the article
 *     @param {string} logo — Logo to use for the publisher
 *     @param {URL} url — Url of the publisher
 *
 * ————————————————————————————————————————————————————————————————————————
 * DERIVED ITEM — urls and display information based on return from the server
 * ————————————————————————————————————————————————————————————————————————
 *
 * URLS to use
 * ————————————————————————————————————
 * @param externalUrl — open original action from the publisher link with added UTM
 * @param readUrl — item action when the user clicks on the image or title of a saved item
 * @param saveUrl — the url to use when an item is to be saved from a save action
 * @param permanentUrl — url for Pockets internal library [premium feature]
 * @param syndicatedUrl — url using slug for a syndicated article [facilitates testing syndicated articles]
 *
 * Display Properties
 * ————————————————————————————————————
 * @param title — the best title to display
 * @param thumbnail — the best image to display
 * @param publisher — original article publisher
 * @param excerpt — curated excerpt, and if not, given excerpt
 * @param isReadable — true if the content type is video, image, or article
 * @param isSyndicated — true if this article is syndicated by pocket
 * @param isCollection — ?? Is this needed?
 * @param isUserList - TODO: will result in an added icon on item card
 * @param hasAnnotations — for filtering by annotation/highlights
 *
 * Analytics Properties
 * ————————————————————————————————————
 * @param analyticsData {Object} this is the static item analytics
 *   @param analyticsData.url — the url to add to analytics data
 *
 */

/*------------------------------- */

export function deriveSavedItem(node) {
  const { item, ...nodeDetails } = node
  // node contains user-item data as well as the item itself
  const derivedItem = deriveItemData({ item, utmId: 'pocket_saves', node: nodeDetails })
  return { item: derivedItem, node: nodeDetails }
}

export function deriveListItem(edge) {
  // node contains user-item data as well as the item itself
  const { node = {}, cursor = null } = edge
  const { item, ...rest } = node
  return deriveItem({ item, node: rest, cursor, utmId: 'pocket_saves' })
}

export function deriveCorpusItem(recommendation) {
  const item = recommendation.corpusItem
  const corpusRecommendationId = recommendation.corpusRecommendationId
  const { url, publisher } = item
  return deriveItemData({
    item,
    itemEnrichment: { url },
    analyticsData: { url, corpusRecommendationId },
    passedPublisher: publisher,
    utmId: 'pocket_home'
  })
}

export function deriveRecommendation(
  recommendationsFromSlate,
  analyticsData,
  utmId = 'pocket_discover'
) {
  const { item, recommendationId, curatedInfo: itemEnrichment } = recommendationsFromSlate
  return deriveItem({
    item,
    itemEnrichment,
    analyticsData: { ...analyticsData, recommendationId },
    utmId
  })
}

export function deriveCollection(collection) {
  const collectionUrl = `/collections/${collection?.slug}`
  const storyCount = collection?.stories?.length || null
  return deriveItem({
    item: {
      ...collection,
      status: false,
      givenUrl: `${BASE_URL}${collectionUrl}`,
      collectionUrl,
      storyCount,
      isArticle: true
    },
    passedPublisher: 'Pocket',
    utmId: 'pocket_collection'
  })
}

export function deriveStory(story) {
  const { item, ...itemEnrichment } = story
  return deriveItem({ item, itemEnrichment, utmId: 'pocket_collection_story' })
}

export function deriveReaderItem(item, savedItem) {
  const derivedItem = deriveItemData({ item, node: savedItem, utmId: 'pocket_reader' })
  return derivedItem
}

export function deriveItem({
  item,
  cursor = '',
  node = {},
  itemEnrichment,
  passedPublisher,
  analyticsData = {},
  utmId
}) {
  const derivedItem = deriveItemData({
    item,
    node,
    itemEnrichment,
    passedPublisher,
    utmId,
    analyticsData
  })
  const derived = {
    cursor,
    ...node,
    ...derivedItem
  }

  return derived
}
export function deriveItemData({
  item,
  node,
  itemEnrichment,
  passedPublisher,
  utmId,
  analyticsData
}) {
  return {
    ...item,
    authors: itemEnrichment?.authors || item?.authors || false,
    title: title({ item, itemEnrichment }),
    thumbnail: thumbnail({ item, itemEnrichment }),
    excerpt: excerpt({ item, itemEnrichment }),
    publisher: publisher({ item, itemEnrichment, passedPublisher }),
    publisherLogo: item?.domainMetadata?.logo || false,
    externalUrl: externalUrl({ item, itemEnrichment, utmId }),
    readUrl: readUrl({ item, node, status: node?.status }),
    itemUrl: node?.url || null,
    saveUrl: saveUrl({ item, itemEnrichment }),
    syndicatedUrl: syndicatedUrl({ item }),
    permanentUrl: permanentUrl({ item, status: node?.status }),
    isSyndicated: syndicated({ item }),
    isReadable: isReadable({ item }),
    isCollection: isCollection({ item }),
    isUserList: isUserList({ item }),
    isInternalItem: isInternalItem({ item, node, itemEnrichment, status: node?.status }),
    fromPartner: fromPartner({ itemEnrichment }),
    analyticsData: {
      url: analyticsUrl({ node, item, itemEnrichment }),
      ...analyticsData
    }
  }
}

/** TITLE
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @param {object} curatedInfo Additional information provided by the curation team
 * @returns {string} The most appropriate title to show
 */
function title({ item, itemEnrichment }) {
  // This is for matching images/files
  const urlToUse = item?.collectionUrl || item?.givenUrl || item?.resolvedUrl
  const file = urlToUse?.substring(urlToUse.lastIndexOf('/') + 1)
  const fileName = file ? file.replace(/\.[^/.]+$/, '') : false
  return (
    itemEnrichment?.title ||
    item?.collection?.title ||
    item?.title ||
    item?.resolvedTitle ||
    item?.givenTitle ||
    fileName ||
    item?.resolvedUrl ||
    publisher({ item })
  )
}

/** THUMBNAIL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @param {object} curatedInfo Additional information provided by the curation team
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */
function thumbnail({ item, itemEnrichment }) {
  const passedImage = itemEnrichment?.thumbnail || item?.thumbnail || item?.topImageUrl || false
  if (passedImage) return passedImage

  const firstImage = item?.images?.[Object.keys(item?.images)[0]]?.src
  if (firstImage) return getImageCacheUrl(firstImage, { width: 600 })
  return false
}

/** PUBLISHER
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The best text to display as the publisher of this item
 */
function publisher({ item, itemEnrichment, passedPublisher }) {
  const urlToUse = item?.givenUrl || item?.resolvedUrl
  const derivedDomain = domainForUrl(urlToUse)
  const syndicatedPublisher = item?.syndicatedArticle?.publisher?.name
  //prettier-ignore
  return (
    syndicatedPublisher ||        // Syndicated - provided by curation
    passedPublisher ||            // Collections - hardcoded as 'Pocket'
    itemEnrichment?.publisher ||  // Home - curatedInfo: provided by curation || Collection - publisher: provided by curation
    item?.domainMetadata?.name || // Metadata from a domain, originally populated from ClearBit. Takes precedence
    item?.domain ||               // Domain, such as 'getpocket.com' of the {.resolved_url}
    derivedDomain ||              // Regex - givenUrl: The url as provided by the user when saving. Only http or https schemes allowed || resolvedUrl: If the givenUrl redirects (once or many times), this is the final url. Otherwise, same as givenUrl
    null
  )
}

/** EXCERPT
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @param {object} curatedInfo Additional information provided by the curation team
 * @returns {string} The most appropriate excerpt to show
 */
function excerpt({ item, itemEnrichment }) {
  return itemEnrichment?.excerpt || item?.collection?.excerpt || item?.excerpt || null
}

/**
 * SYNDICATION
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {bool} if the item is syndicated or not
 */
const syndicated = function ({ item }) {
  if (item?.syndicatedArticle) return true
  return false
}

/**
 * READABLE
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {bool} whether to open an item in a new tab
 */
function isReadable({ item }) {
  return item?.hasVideo === 'IS_VIDEO' || item?.hasImage === 'IS_IMAGE' || item?.isArticle || false
}

/** EXTERNAL URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url that opens to a non-pocket site
 */
function externalUrl({ item, itemEnrichment, utmId = 'pocket_saves' }) {
  const urlToUse = itemEnrichment?.url || item?.givenUrl || item?.resolvedUrl
  const linkWithUTM = replaceUTM(urlToUse, utmId)
  return linkWithUTM
}

/** SAVE URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url that should be saved or opened
 */
function saveUrl({ item, itemEnrichment }) {
  return itemEnrichment?.url || item?.givenUrl || item?.resolvedUrl || false
}

/** ANALYTICS URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url that should be passed to analytics
 */
function analyticsUrl({ node, item, itemEnrichment }) {
  return node?.url || item?.givenUrl || item?.resolvedUrl || itemEnrichment?.url || false
}

/** READ URl
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @return {string} url to use when reading
 */
export function readUrl({ item, node, itemEnrichment, status }) {
  const external = externalUrl({ item, itemEnrichment })
  const readable = isReadable({ item })
  const collection = isCollection({ item })
  const userList = isUserList({ item })

  // It's a collection, it should always open the original
  if (collection) {
    const slug = collectionSlug({ item })
    return `/collections/${slug}`
  }

  // Always open the shared user list
  if (userList) {
    const path = publicListPath({ item })
    return path
  }

  // If item has no status if should have a false readURL
  if (!status) return false

  // No reader view exists, return the external url
  if (!readable) return external

  // Otherwise we are gonna open it in reader view
  const itemId = node?.id || item?.itemId
  return `/read/${itemId}`
}

/** PERMANENT URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url for permanent library
 */
function permanentUrl({ item, status }) {
  return status ? urlWithPermanentLibrary(item?.itemId) || false : false
}

/** SYNDICATED URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url for permanent library
 */
function syndicatedUrl({ item }) {
  const slug = item?.syndicatedArticle?.slug
  return slug ? `/explore/item/${slug}` : false
}

function fromPartner({ itemEnrichment }) {
  return itemEnrichment?.fromPartner || false
}

/**
 * IS COLLECTION
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {bool} whether an item is a collection
 * https://regexr.com/5volt - A place to test the regular expression
 */
function isCollection({ item }) {
  if (item?.stories) return true

  const urlToTest = item?.resolvedUrl
  if (!urlToTest) return false

  const pattern = /.+?getpocket\.com\/(?:[a-z]{2}(?:-[a-zA-Z]{2})?\/)?collections\/(?!\?).+/gi
  return !!urlToTest.match(pattern)
}

function isUserList({ item }) {
  const urlToTest = item?.resolvedUrl
  if (!urlToTest) return false

  const pattern = /.+?getpocket\.com\/(?:[a-z]{2}(?:-[a-zA-Z]{2})?\/)?sharedlists\/(?!\?).+/gi
  return !!urlToTest.match(pattern)
}

function isInternalItem({ item, node, itemEnrichment, status }) {
  const itemIsCollection = isCollection({ item })
  const itemIsSyndicated = syndicated({ item })
  const itemIsUserList = isUserList({ item })
  const itemReadUrl = readUrl({ item, node, itemEnrichment, status })

  if (itemIsCollection || itemIsSyndicated || itemIsUserList) return true

  if (!itemReadUrl) return false

  // https://regexr.com/6qm61 <- test regex pattern
  const pattern = /^\/read\/\d+/gim
  return !!itemReadUrl?.match(pattern)
}

function collectionSlug({ item }) {
  if (item?.stories) return item?.slug
  // We test for collection with the resolved and should use it to construct the slug
  const url = item?.resolvedUrl
  return url.substring(url.lastIndexOf('/') + 1)
}

function publicListPath({ item }) {
  // We test for shared list with the resolved and should use it to construct the path
  const url = item?.resolvedUrl
  return url.substring(url.lastIndexOf('/sharedlists'))
}
