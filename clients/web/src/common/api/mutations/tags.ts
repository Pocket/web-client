import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const renameTagQuery = gql`
  mutation RenameTagByName($oldName: String!, $newName: String!) {
    renameTagByName(oldName: $oldName, newName: $newName) {
      name
      id
    }
  }
`

export function renameTag({ oldName, newName }: { oldName: string; newName: string }) {
  return requestGQL({
    query: renameTagQuery,
    variables: { oldName, newName }
  })
    .then((response) => {
      const { name, id } = response?.data?.renameTagByName
      return { name, id }
    })
    .catch((error) => console.error(error))
}

const deleteTagQuery = gql`
  mutation deleteTag($tagName: String!) {
    deleteTagByName(tagName: $tagName)
  }
`

export function deleteTag(tagName: string) {
  return requestGQL({
    query: deleteTagQuery,
    variables: { tagName }
  })
    .then((response) => {
      const deletedTag = response?.data?.deleteTagByName
      return { deletedTag }
    })
    .catch((error) => console.error(error))
}
