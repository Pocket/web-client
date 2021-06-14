import { gql } from 'graphql-request'
const getSlate = gql`
  query GetSlate($id: String!, $recommendationCount: Int) {
    getSlate(slateId: $id, recommendationCount: $recommendationCount) {
      displayName
      description
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
            publisher {
              name
              url
            }
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
`
export default getSlate
