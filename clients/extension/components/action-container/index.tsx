import { ExtensionHeader } from '../action-header'
import { SavedScreen } from '../saved'
import { SavedLoader } from '../saved-loader'

// Types
import type { ExtPreview } from '../../types'
import type { NoteEdge } from '@common/types/pocket'

export function ActionContainer({
  isOpen = false,
  errorMessage,
  preview,
  notes,
  tags
}: {
  isOpen: boolean
  errorMessage?: string
  saveStatus?: string
  preview?: ExtPreview
  notes?: NoteEdge[]
  tags?: string[]
  actionUnSave: () => void
}) {
  return isOpen ? (
    <div className="extension">
      <ExtensionHeader />
      <hr />
      {preview ? <SavedScreen preview={preview} notes={notes} tags={tags} /> : <SavedLoader />}
      {errorMessage ? <footer>{errorMessage}</footer> : null}
    </div>
  ) : null
}
