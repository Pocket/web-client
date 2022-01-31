import { GraphQLClient } from 'graphql-request'
import getArticleBySlug from 'common/api/queries/get-article-by-slug'
import { ARTICLE_API_URL, ARTICLE_API_KEY } from 'common/constants'
import fetch from 'isomorphic-unfetch'

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
    .request(getArticleBySlug, variables)
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
