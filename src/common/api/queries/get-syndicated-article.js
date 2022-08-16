import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getSyndicatedArticleQuery = gql`
  query GetSyndicatedArticle($slug: String!) {
    syndicatedArticleBySlug(slug: $slug) {
      content
      authorNames
      topic
      excerpt
      expiresAt
      iabSubCategory
      iabTopCategory
      itemId
      localeCountry
      localeLanguage
      mainImage
      originalItemId
      publishedAt
      publisherUrl
      publisher {
        name
        recommendationName
        url
        showAuthors
        attributeCanonicalToPublisher
        showArticleCta
        appearedOnDomain
        logo
        logoWide
        logoWideBlack
        articleCta {
          url
          text
          leadIn
        }
      }
      showAds
      slug
      status
      title
    }
  }
`
/**
 * Fetches the content related to an article
 * @param {String} slug  title of article
 */
export async function getSyndicatedArticle(slug) {
  const variables = { slug }

  return requestGQL({
    query: getSyndicatedArticleQuery,
    operationName: "GetSyndicatedArticle",
    variables
  })
    .then((response) => response?.data?.syndicatedArticleBySlug)
    .catch((error) => console.error(error))
}
