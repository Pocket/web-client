import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getSyndicatedArticleQuery = gql`
  query GetSyndicatedArticle($slug: String) {
    syndicatedArticleBySlug(slug: $slug) {
      items {
        id
        legacyId
        originalItemId
        itemId
        status
        slug
        showAds
        publisherUrl
        authorNames
        expiresAt
        contentId
        localeLanguage
        localeCountry
        title
        excerpt
        publishedAt
        publisherId
        mainImage
        iabTopCategory
        iabSubCategory
        curationCategory
        content {
          content
        }
        publisher {
          id
          legacyId
          name
          recommendationName
          url
          showAuthors
          attributeCanonicalToPublisher
          showArticleCta
          appearedOnDomain
          logo {
            name
            url
          }
          logoWide {
            name
            url
          }
          logoWideBlack {
            name
            url
          }
          articleCta {
            url
            text
            leadIn
          }
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
  const variables = { slug }

  return requestGQL({ query: getSyndicatedArticleQuery, variables })
    .then((response) => response?.data?.getArticleBySlug)
    .catch((error) => console.error(error))
}
