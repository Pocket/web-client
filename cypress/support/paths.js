/**
 * Paths for our pages. Used in tests for navigation.
 */

const paths = {
  explore: '/discover',
  article: '/discover/item'
  // pocketHitsSignup: '/explore/pocket-hits-signup'
}

function getTopicUrl(topicSlug) {
  return `${paths.explore}/${topicSlug}`
}

function getArticleUrl(articleId) {
  return `${paths.article}/${articleId}`
}

const Paths = {
  ...paths,
  getTopicUrl,
  getArticleUrl
}

export default Paths
