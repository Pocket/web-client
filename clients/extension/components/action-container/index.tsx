import { ExtensionFooter } from '../action-footer'
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
  tags,
  actionUnSave
  // actionLogOut
}: {
  isOpen: boolean
  errorMessage?: string
  saveStatus?: string
  preview?: ExtPreview
  notes?: NoteEdge[]
  tags?: string[]
  actionUnSave: () => void
  actionLogOut: () => void
}) {
  return isOpen ? (
    <div className="extension">
      <ExtensionHeader />
      <hr />
      {preview ? (
        <SavedScreen preview={preview} notes={notes} tags={tags} actionUnSave={actionUnSave} />
      ) : (
        <SavedLoader />
      )}
      <ExtensionFooter error={errorMessage} />
    </div>
  ) : null
}
