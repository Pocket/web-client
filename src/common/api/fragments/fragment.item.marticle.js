import { gql } from 'graphql-request'

export const FRAGMENT_MARTICLE = gql`
  fragment Marticle on Item {
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
`
