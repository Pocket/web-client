import { gql } from 'common/utilities/gql/gql'

export const FRAGMENT_ITEM_PREVIEW = gql`
  fragment ItemPreview on PocketMetadata {
    ... on ItemSummary {
      id
      image {
        caption
        credit
        url
        cachedImages(imageOptions: [{ id: "WebPImage", fileType: WEBP, width: 640 }]) {
          url
          id
        }
      }
      excerpt
      title
      authors {
        name
      }
      domain {
        name
      }
      datePublished
      url
    }
    ... on OEmbed {
      id
      image {
        caption
        credit
        url
        cachedImages(imageOptions: [{ id: "WebPImage", fileType: WEBP, width: 640 }]) {
          url
          id
        }
      }
      excerpt
      title
      authors {
        name
      }
      domain {
        name
      }
      datePublished
      url
      htmlEmbed
      type
    }
  }
`
