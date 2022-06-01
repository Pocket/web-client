import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getSyndicatedArticleQuery = gql`
  query GetSyndicatedArticle($slug: String!) {
    syndicatedArticleBySlug(slug: $slug) {
      content
      authorNames
      curationCategory
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
        url
        logo
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

  return requestGQL({ query: getSyndicatedArticleQuery, variables })
    .then((response) => response?.data?.syndicatedArticleBySlug)
    .catch((error) => console.error(error))
}
