import { gql } from 'graphql-request'
const getArticleBySlug = gql`
  query GetArticleBySlug($slug: String) {
    getArticleBySlug(slug: $slug) {
      items {
        id
        legacyId
        originalItemId
        itemId
        status
        slug
        showAds
        publisherUrl
        authorNames
        expiresAt
        contentId
        localeLanguage
        localeCountry
        title
        excerpt
        publishedAt
        publisherId
        mainImage
        iabTopCategory
        iabSubCategory
        curationCategory
        content {
          content
        }
        publisher {
          id
          legacyId
          name
          recommendationName
          url
          showAuthors
          attributeCanonicalToPublisher
          showArticleCta
          appearedOnDomain
          logo {
            name
            url
          }
          logoWide {
            name
            url
          }
          logoWideBlack {
            name
            url
          }
          articleCta {
            url
            text
            leadIn
          }
        }
      }
    }
  }
`

export default getArticleBySlug
