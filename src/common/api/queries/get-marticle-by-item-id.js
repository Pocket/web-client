import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getMarticleByItemIdQuery = gql`
  query GetMarticleByItemId($itemId: ID!) {
    getItemByItemId(id: $itemId) {
      marticle {
        ... on MarticleText {
          content
        }
        ... on Image {
          caption
          credit
          src
          targetUrl
        }
        ... on MarticleDivider {
          content
        }
        ... on MarticleTable {
          html
        }
        ... on MarticleHeading {
          content
        }
        ... on MarticleCodeBlock {
          text
          language
        }
        ... on Video {
          src
          vid
        }
        ... on MarticleBulletedList {
          rows {
            content
            level
          }
        }
        ... on MarticleNumberedList {
          rows {
            content
            level
            index
          }
        }
        ... on MarticleBlockquote {
          content
        }
        ... on UnMarseable {
          html
        }
      }
    }
  }
`

export async function getMarticleByItemId(itemId) {
  return requestGQL({
    query: getMarticleByItemIdQuery,
    variables: { itemId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.getItemByItemId
  const marticle = responseData.marticle
  return { marticle }
}
