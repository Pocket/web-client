import { gql } from 'common/utilities/gql/gql'

export const FRAGMENT_SAVED_ITEM = gql`
  fragment SavedItemDetails on SavedItem {
    url
    _createdAt
    _updatedAt
    id
    status
    isFavorite
    favoritedAt
    isArchived
    archivedAt
    shareableListTotalCount
    tags {
      id
      name
    }
  }
`
