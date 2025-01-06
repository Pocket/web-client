import { gql } from '@common/utilities/request'

export const FRAGMENT_ITEM_PREVIEW = gql`
  fragment ItemPreviewFragment on PocketMetadata {
    id
    authors {
      name
    }
    datePublished
    domain {
      name
    }
    excerpt
    title
    source
    url
    image {
      caption
      credit
      cachedImages(
        imageOptions: [
          { id: "WebP640", fileType: WEBP, width: 640 }
          { id: "WebP320", fileType: WEBP, width: 320 }
          { id: "WebPSquare", fileType: WEBP, width: 260, height: 260 }
        ]
      ) {
        url
        id
      }
    }
    ... on OEmbed {
      htmlEmbed
    }
  }
`
