const gql = String.raw

export const FRAGMENT_ITEM_PREVIEW = gql`
  fragment ItemPreview on PocketMetadata {
    ... on ItemSummary {
      previewId: id
      id
      image {
        caption
        credit
        url
        cachedImages(imageOptions: [{ width: 80, id: "ext", height: 80, fileType: PNG }]) {
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
      source
    }
  }
`
