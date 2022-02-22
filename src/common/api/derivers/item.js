import { domainForUrl, replaceUTM, readTimeFromWordCount } from 'common/utilities'
import { urlWithPermanentLibrary, getBool, getImageCacheUrl } from 'common/utilities'
import { BASE_URL } from 'common/constants'
/**
 * ————————————————————————————————————————————————————————————————————————
 * ITEM — as it exists in the graphQL (minus some fields we don't use)
 * ————————————————————————————————————————————————————————————————————————
 *
 * IDENTIFIERS
 * ————————————————————————————————————
 * @param {string} itemId — A server generated unique id for this item.
 * @param {string} resolvedId — The item id of the resolved_url
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
 * @param {int} wordCount — Number of words in the article (we use this to derive read time)
 * @param {DateString} datePublished — The date the article was published
 * @param {string} language — The detected language of the article
 * @param {int} timeToRead — How long it will take to read the article (WordCount / 220 WPM)
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
  const derivedItem = deriveItemData({ item, utmId: 'pocket_mylist', node: nodeDetails })
  return { item: derivedItem, node: nodeDetails }
}

export function deriveListItem(passedItem, legacy) {
  // if a legacy flag is passed, first we need to modernize the item
  const edge = legacy ? modernizeItem(passedItem) : passedItem

  // node contains user-item data as well as the item itself
  const { node = {}, cursor = null } = edge
  const { item, ...rest } = node
  return deriveItem({ item, node: rest, cursor, utmId: 'pocket_mylist' })
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

export function deriveReccit(recommendation) {
  const { item: passedItem, sort_id, ...rest } = recommendation //eslint-disable-line no-unused-vars
  const {
    node: { item }
  } = modernizeItem({ ...passedItem, sort_id })
  const derivedItem = deriveItem({ item, utmId: 'pocket_rec' })

  return derivedItem
}

export function deriveCollection(collection) {
  const collectionUrl = `/collections/${collection?.slug}`
  const firstImage = collection?.stories[0]?.thumbnail
  const authorImage = collection?.authors[0]?.imageUrl

  return deriveItem({
    item: {
      ...collection,
      heroImage: collection.thumbnail,
      thumbnail: authorImage || firstImage,
      status: false,
      givenUrl: `${BASE_URL}${collectionUrl}`,
      collectionUrl,
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

export function deriveProfile(feedItem, legacy) {
  const { item: passedItem, post } = feedItem
  // if a legacy flag is passed, first we need to modernize the item
  const edge = legacy ? modernizeItem(passedItem) : passedItem
  // node contains user-item data as well as the item itself
  const { node = {}, cursor = null } = edge
  const { item: nodeItem, ...rest } = node
  const item = { ...nodeItem, readUrl: false, openExternal: true, post }
  return deriveItem({ item, node: { ...rest, status: false }, cursor, utmId: 'pocket_profile' })
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
    publisher: publisher({ item, passedPublisher }),
    externalUrl: externalUrl({ item, itemEnrichment, utmId }),
    readUrl: readUrl({ item, status: node?.status }),
    saveUrl: saveUrl({ item, itemEnrichment }),
    permanentUrl: permanentUrl({ item, status: node?.status }),
    isSyndicated: syndicated({ item }),
    isReadable: isReadable({ item }),
    isCollection: isCollection({ item }),
    timeToRead: readTime({ item }),
    fromPartner: fromPartner({ itemEnrichment }),
    analyticsData: {
      id: item?.itemId || false,
      url: analyticsUrl({ item, itemEnrichment }),
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
function publisher({ item, passedPublisher }) {
  const urlToUse = item?.givenUrl || item?.resolvedUrl
  const derivedDomain = domainForUrl(urlToUse)
  const syndicatedPublisher = item?.syndicatedArticle?.publisher?.name
  return (
    syndicatedPublisher ||
    passedPublisher ||
    item?.domainMetadata?.name ||
    item?.domain ||
    derivedDomain ||
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
  return itemEnrichment?.excerpt || item?.excerpt || null
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

/** READ TIME
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {int} average number of minutes to read the item
 */
export function readTime({ item }) {
  return item?.timeToRead || readTimeFromWordCount(item?.wordCount) || null
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
function externalUrl({ item, itemEnrichment, utmId = 'pocket_mylist' }) {
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
function analyticsUrl({ item }) {
  return item?.resolvedUrl || item?.givenUrl || false
}

/** READ URl
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @return {string} url to use when reading
 */
export function readUrl({ item, itemEnrichment, status }) {
  const external = externalUrl({ item, itemEnrichment })
  const readable = isReadable({ item })
  const collection = isCollection({ item })

  // It's a collection, it should always open the original
  if (collection) {
    const slug = collectionSlug({ item })
    return `/collections/${slug}`
  }

  // If item has no status if should have a false readURL
  if (!status) return false

  // No reader view exists, return the external url
  if (!readable) return external

  // Otherwise we are gonna open it in reader view
  return `/read/${item.itemId}`
}

/** PERMANENT URL
 * ————————————————————————————————————
 * @param {object} item An item returned from the server
 * @returns {string} The url for permanent library
 */
function permanentUrl({ item, status }) {
  return status ? urlWithPermanentLibrary(item?.itemId) || false : false
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

function collectionSlug({ item }) {
  if (item?.stories) return item?.slug
  // We test for collection with the resolved and should use it to construct the slug
  const url = item?.resolvedUrl
  return url.substring(url.lastIndexOf('/') + 1)
}

// !! TEMPORARY FUNCTION while we transition to API next
// !! THIS SHOULD BE DELETED SHORTLY

function convertTags(tags) {
  if (!tags) return []
  return Object.values(tags).map((tag) => ({ name: tag.tag }))
}

function modernizeItem(item) {
  const {
    item_id,
    resolved_id,
    resolved_title,
    sort_id,
    has_image,
    has_video,
    is_article,
    is_index,
    favorite,
    status,
    time_added,
    time_favorited,
    time_read,
    time_updated,
    time_to_read,
    word_count,
    top_image_url,
    syndicated_article,
    domain_metadata,
    given_url,
    given_title,
    resolved_url,
    tags = [],
    annotations = [],
    authors,
    images,
    lang,
    ...rest
  } = item

  const statusEnum = {
    0: 'UNREAD',
    1: 'ARCHIVED',
    2: 'DELETED'
  }

  const imagesEnum = {
    0: 'NO_IMAGES',
    1: 'HAS_IMAGES',
    2: 'IS_IMAGE'
  }

  const videosEnum = {
    0: 'NO_VIDEOS',
    1: 'HAS_VIDEOS',
    2: 'IS_VIDEO'
  }

  const base = {
    cursor: '',
    node: {
      _createdAt: parseInt(time_added, 10),
      _updatedAt: parseInt(time_updated, 10),
      url: given_url,
      status: statusEnum[parseInt(status, 10)],
      isFavorite: favorite === '1',
      favoritedAt: parseInt(time_favorited),
      isArchived: status === '1',
      archivedAt: parseInt(time_read),
      hasAnnotations: annotations?.length,
      annotations,
      tags: convertTags(tags)
    }
  }

  const syndicatedObject = syndicated_article ? { syndicatedArticle: syndicated_article } : {}
  const collectionObject = isCollection({ item })
    ? { collection: { slug: collectionSlug(given_url) } }
    : {}

  const convertedItem = {
    itemId: item_id,
    resolvedId: resolved_id,
    resolvedTitle: resolved_title,
    sortId: sort_id,
    language: lang,
    hasImage: imagesEnum[parseInt(has_image, 10)],
    hasVideo: videosEnum[parseInt(has_video, 10)],
    isArticle: getBool(is_article),
    isIndex: getBool(is_index),
    timeToRead: time_to_read,
    wordCount: word_count,
    topImageUrl: top_image_url,
    domainMetadata: domain_metadata,
    givenUrl: given_url,
    givenTitle: given_title,
    resolvedUrl: resolved_url,
    authors: authors ? Object.values(authors) : [],
    images: images ? Object.values(images) : [],
    ...syndicatedObject,
    ...collectionObject,
    ...rest
  }

  // Derive checks if this key exists, so adding it without condition gives a false positive
  return { ...base, node: { ...base.node, item: convertedItem } }
}
