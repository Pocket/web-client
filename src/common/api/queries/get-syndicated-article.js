import { gql } from 'graphql-request'
import { GraphQLClient } from 'graphql-request'
import { ARTICLE_API_URL, ARTICLE_API_KEY } from 'common/constants'
import fetch from 'isomorphic-unfetch'

const getSyndicatedArticleQuery = gql`
  query GetSyndicatedArticle($slug: String) {
    getArticleBySlug(slug: $slug) {
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
  const url = ARTICLE_API_URL
  const headers = {
    'x-api-key': ARTICLE_API_KEY
  }

  const client = new GraphQLClient(url, { headers })
  return await client
    .request(getSyndicatedArticleQuery, variables)
    .then((response) => response.getArticleBySlug)
    .catch((error) => console.error(error))
}

export async function getRandomSyndicatedArticle(baseUrl) {
  try {
    const { title } = await fetch(`http://${baseUrl}/mockAPI/article/random`).then((response) =>
      response.json()
    )

    return getSyndicatedArticle(title)
  } catch {
    throw new Error('All the things have gone wrong')
  }
}
