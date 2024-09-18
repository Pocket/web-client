import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { deriveSearchItem } from 'common/api/derivers/item'
import { FRAGMENT_ITEM_PREVIEW } from 'common/api/fragments/fragment.preview'

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
        cursor
        node {
          searchHighlights {
            excerpt
            fullText
            publisher
            title
          }
          item {
            preview {
              ...ItemPreview
            }
          }
        }
      }
      totalCount
    }
  }
  ${FRAGMENT_ITEM_PREVIEW}
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
    if (!current?.node?.item?.preview?.id) return previous

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
