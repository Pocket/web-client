import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

/**
 * Create new highlight annotation(s). Returns the data for the created Highlight object(s).
 * https://studio.apollographql.com/graph/pocket-client-api/schema/reference/objects/Mutation?variant=current#createSavedItemHighlights
 */
const createHighlightQuery = gql`
  mutation CreateHighlight($input: [CreateHighlightInput!]!) {
    createSavedItemHighlights(input: $input) {
      id
      quote
      patch
      version
      note {
        _createdAt
        _updatedAt
        text
      }
    }
  }
`

/**
 * highlight {object} - a highlight object, it contains:
 *  quote {string} @required
 *  patch {string} @required
 *  version {int} @required
 *  itemId {string} @required
 *  note {string} @optional
 */
export function createHighlight(highlight) {
  return requestGQL({
    query: createHighlightQuery,
    operationName: 'CreateHighlight',
    variables: { input: [highlight] }
  })
    .then((response) => response?.data?.createSavedItemHighlights)
    .catch((error) => console.error(error))
}

/**
 * Delete a highlight by its ID.
 * https://studio.apollographql.com/graph/pocket-client-api/schema/reference/objects/Mutation?variant=current#deleteSavedItemHighlight
 */
const deleteHighlightQuery = gql`
  mutation DeleteHighlight($highlightId: ID!) {
    deleteSavedItemHighlight(id: $highlightId)
  }
`

export function deleteHighlight(highlightId) {
  return requestGQL({
    query: deleteHighlightQuery,
    variables: { highlightId }
  })
    .then((response) => response?.data?.deleteSavedItemHighlight)
    .catch((error) => console.error(error))
}

/**
 * Update an existing highlight annotation, by its ID. If the given highlight ID does not exist, will return error data and the highlight will not be created.
 * https://studio.apollographql.com/graph/pocket-client-api/schema/reference/objects/Mutation?variant=current#updateSavedItemHighlight
 */
const updateHighlightQuery = gql`
  mutation UpdateHighlight($highlightId: ID!, $input: CreateHighlightInput!) {
    updateSavedItemHighlight(id: $highlightId, input: $input) {
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
`

export function updateHighlight(highlightId, input) {
  return requestGQL({
    query: updateHighlightQuery,
    variables: { highlightId, input }
  })
    .then((response) => response?.data?.updateSavedItemHighlight)
    .catch((error) => console.error(error))
}
