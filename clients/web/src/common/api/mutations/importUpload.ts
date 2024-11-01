// import { gql } from 'common/utilities/gql/gql'
// import { requestGQL } from 'common/utilities/request/request'

// const importUploadUrlQuery = gql`
//   mutation ImportUploadUrl($importType: ImportType!) {
//     importUploadUrl(importType: $importType) {
//       ... on PreSignedUrl {
//         ttl
//         url
//       }
//       ... on ImportLimited {
//         message
//         refreshInHours
//       }
//     }
//   }
// `

// export function getImportUploadUrl(importType: string) {
//   return requestGQL({
//     query: importUploadUrlQuery,
//     variables: { importType }
//   })
//     .then((response) => {
//       const { savedItem, ...item } = response?.data?.refreshItemArticle
//       return { ...savedItem, item }
//     })
//     .catch((error) => console.error(error))
// }
