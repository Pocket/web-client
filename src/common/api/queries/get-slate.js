import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getSlate = gql`
  query GetSlate($id: String!, $recommendationCount: Int) {
    getSlate(slateId: $id, recommendationCount: $recommendationCount) {
      displayName
      description
      displayName
      description
      recommendations {
        item {
          ...ItemDetails
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
  ${FRAGMENT_ITEM}
`
export default getSlate
