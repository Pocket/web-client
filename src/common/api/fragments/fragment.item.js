import { gql } from 'graphql-request'

export const FRAGMENT_ITEM = gql`
  fragment ItemDetails on Item {
    isArticle
    title
    itemId
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
    videos {
      vid
      videoId
      type
      src
    }
    topImageUrl
    timeToRead
    givenUrl
    collection {
      imageUrl
      intro
      title
      excerpt
    }
    authors {
      id
      name
      url
    }
    datePublished
    syndicatedArticle {
      slug
      publisher {
        name
        url
      }
    }
  }
`
