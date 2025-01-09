import { ExtensionHeader } from '../action-header'
import { SavedScreen } from '../saved'

// Types
import { ExtensionFooter } from '../action-footer'
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
      {preview ? (
        <>
          <SavedScreen preview={preview} notes={notes} tags={tags} />
          <ExtensionFooter errorMessage={errorMessage} />
        </>
      ) : null}
    </div>
  ) : null
}
