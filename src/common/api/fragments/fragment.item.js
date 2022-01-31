import { gql } from 'graphql-request'

export const FRAGMENT_ITEM = gql`
  fragment ItemDetails on Item {
    isArticle
    title
    itemId
    normalUrl
    resolvedId
    resolvedUrl
    domain
    domainMetadata {
      name
    }
    excerpt
    hasImage
    hasVideo
    images {
      caption
      credit
      height
      imageId
      src
      width
    }
    topImageUrl
    wordCount
    timeToRead
    givenUrl
    collection {
      imageUrl
      intro
      title
    }
    syndicatedArticle {
      slug
      publisher {
        name
        url
      }
    }
  }
`
