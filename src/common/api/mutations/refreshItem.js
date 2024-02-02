import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'

const itemRefreshQuery = gql`
  mutation ItemRefresh($url: String!) {
    refreshItemArticle(url: $url) {
      ...ItemDetails
      savedItem {
        ...SavedItemDetails
      }
    }
  }
  ${FRAGMENT_ITEM}
  ${FRAGMENT_SAVED_ITEM}
`

export function itemRefresh(url) {
  return requestGQL({
    query: itemRefreshQuery,
    operationName: 'ItemRefresh',
    variables: { url }
  })
    .then((response) => {
      const { savedItem, ...item } = response?.data?.refreshItemArticle
      return { ...savedItem, item }
    })
    .catch((error) => console.error(error))
}
