import { gql } from 'graphql-request'

export const FRAGMENT_SAVED_ITEM = gql`
  fragment SavedItemDetails on SavedItem {
    _createdAt
    _updatedAt
    id
    status
    isFavorite
    favoritedAt
    isArchived
    archivedAt
    tags {
      id
      name
    }
  }
`
