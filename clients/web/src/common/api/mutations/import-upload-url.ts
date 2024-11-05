import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const importUploadUrlQuery = gql`
  mutation ImportUploadUrl($importType: ImportType!) {
    importUploadUrl(importType: $importType) {
      ... on PreSignedUrl {
        ttl
        url
      }
      ... on ImportLimited {
        message
        refreshInHours
      }
    }
  }
`

export function getImportUploadUrl(importType: string) {
  return requestGQL({
    query: importUploadUrlQuery,
    operationName: 'getImportUploadUrl',
    variables: { importType }
  })
    .then((response) => {
      const { url, ttl, message } = response?.data?.importUploadUrl
      return { url, ttl, message }
    })
    .catch((error) => console.error(error))
}
