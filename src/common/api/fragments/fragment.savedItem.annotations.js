import { gql } from 'graphql-request'

export const FRAGMENT_ANNOTATIONS = gql`
  fragment Annotations on SavedItem {
    annotations {
      highlights {
        id
        quote
        patch
        version
        _createdAt
        _updatedAt
        note {
          text
          _createdAt
          _updatedAt
        }
      }
    }
  }
`
