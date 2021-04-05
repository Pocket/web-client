/* GraphQL */
const getTopicForWeb = `
  query GetTopicForWeb($id: String!, $recommendationCount: Int) {
    getSlateLineup(slateLineupId: $id, recommendationCount: $recommendationCount) {
      experimentId
      id
      slates {
        id
        displayName
        description
        recommendations {
          item {
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
            syndicatedArticle {
              slug
            }
          }
          id
          curatedInfo {
            title
            excerpt
            imageSrc
          }
        }
      }
    }
  }
`

export default getTopicForWeb


/* Available parameters not used in the above request:
  item {
    ampUrl
    authors {
      id
      name
    }
    domainId
    originDomainId
    contentLength
    domainMetadata {
      logo
      logoGreyscale
    }
    mimeType
    encoding
    isIndex
    videos {
      height
      src
      type
      vid
      videoId
      width
      length
    }
    dateResolved
    datePublished
    language
    syndicatedArticle {
      publisher {
        name
        url
        logo
      }
    }
  }
*/
