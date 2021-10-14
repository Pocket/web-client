import { gql } from 'graphql-request'
export const DEFAULT_SLATE_LINEUP = gql`
    fragment DefaultSlateLineup on getSlateLineup {
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
`
