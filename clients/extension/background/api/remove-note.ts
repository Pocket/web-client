import { extensionRequest } from '../../utilities/request'
import { verifySession } from '../auth'

const gql = String.raw
const query = gql`
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input)
  }
`

export async function removeNote(noteId: string) {
  // We need a token to save. This will create a session if need be
  // be requesting a new bearer if the current one is expired
  const token = await verifySession()

  // Set up the variables we need for this request
  const data = { variables: { input: { id: noteId } }, query }

  // Make the request and return it
  const response = await extensionRequest<{ deleteNote: boolean }>(data, token)

  return response
}
