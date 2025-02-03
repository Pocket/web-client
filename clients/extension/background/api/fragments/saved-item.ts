const gql = String.raw

export const FRAGMENT_SAVED_ITEM = gql`
  fragment ItemSaved on SavedItem {
    savedId: id
    id
    suggestedTags {
      id
      name
    }
    tags {
      id
      name
    }
    notes {
      edges {
        cursor
        node {
          archived
          createdAt
          deleted
          id
          updatedAt
          title
          contentPreview
        }
      }
    }
  }
`
