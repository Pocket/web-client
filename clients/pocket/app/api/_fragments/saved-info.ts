import { gql } from '@common/utilities/pocket-request'

export const FRAGMENT_ITEM_SAVED_INFO = gql`
  fragment ItemSavedFragment on SavedItem {
    status
    suggestedTags {
      name
    }
    tags {
      name
    }
    isArchived
    isFavorite
    favoritedAt
    archivedAt
    annotations {
      highlights {
        quote
        note {
          text
        }
      }
    }
  }
`
