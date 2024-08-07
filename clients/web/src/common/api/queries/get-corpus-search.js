import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { deriveSearchItem } from 'common/api/derivers/item'

const getSearchQuery = gql`
  query CorpusSearchQuery(
    $search: CorpusSearchQueryString!
    $filter: CorpusSearchFilters!
    $pagination: PaginationInput
  ) {
    searchCorpus(search: $search, filter: $filter, pagination: $pagination) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          preview {
            ... on ItemSummary {
              id
              image {
                url
              }
              excerpt
              title
              authors {
                name
              }
              domain {
                name
              }
              datePublished
              url
            }
            ... on OEmbed {
              id
              image {
                url
              }
              excerpt
              title
              authors {
                name
              }
              domain {
                name
              }
              datePublished
              url
              htmlEmbed
              type
            }
          }
          searchHighlights {
            excerpt
            publisher
            title
          }
        }
        cursor
      }
      totalCount
    }
  }
`

/**
 * getSearchCorpus is for ... wait for it ... searching the corpus of content provided content team
 */
export async function getCorpusSearch({ search, filter, pagination }) {
  return requestGQL({
    query: getSearchQuery,
    variables: { search, filter, pagination: { ...pagination, first: 30 } }
  })
    .then(handleResponse)
    .catch((error) => {
      return { error }
    })
}

function handleResponse(response) {
  const results = response?.data?.searchCorpus
  if (!results) throw new SearchRequestError()

  const { totalCount, edges, pageInfo } = results

  // If there are no results we just pass that along
  if (totalCount === 0) return { totalCount }
  const itemsById = getItemsByIdFromEdges(edges)
  const itemIds = Object.keys(itemsById)
  return { itemsById, itemIds, pageInfo: { ...pageInfo, totalCount } }
}

function getItemsByIdFromEdges(edges) {
  return edges.reduce((previous, current) => {
    if (!current?.node?.preview?.id) return previous

    const item = deriveSearchItem(current)
    const searchHighlights = current?.node?.searchHighlights
    return {
      ...previous,
      [item.id]: {
        ...item,
        searchHighlights,
        externalUrl: item.url,
        saveUrl: item.url,
        itemId: item.id,
        analyticsData: {
          url: item.url
        }
      }
    }
  }, {})
}

class SearchRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SearchRequestError'
  }
}
