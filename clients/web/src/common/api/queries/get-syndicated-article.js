import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const getSyndicatedArticleQuery = gql`
  query GetSyndicatedArticle($slug: String!, $count: Int) {
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
      relatedEndOfArticle(count: $count) {
        corpusRecommendationId: id
        corpusItem {
          id
          imageUrl
          title
          url
          publisher
          target {
            ... on SyndicatedArticle {
              publisher {
                logoWideBlack
              }
            }
          }
        }
      }
      relatedRightRail(count: $count) {
        corpusRecommendationId: id
        corpusItem {
          id
          title
          url
        }
      }
    }
  }
`
/**
 * Fetches the content related to an article
 * @param {String} slug  title of article
 */
export async function getSyndicatedArticle(slug) {
  const variables = { slug, count: 5 }

  return requestGQL({
    query: getSyndicatedArticleQuery,
    operationName: 'GetSyndicatedArticle',
    variables
  })
    .then((response) => response?.data?.syndicatedArticleBySlug)
    .catch((error) => console.error(error))
}
