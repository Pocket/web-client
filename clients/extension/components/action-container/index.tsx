import { useState } from 'react'
import { ExtensionError } from '../action-error'
import { ExtensionHeader } from '../action-header'
import { Notes } from '../notes'
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
  const [showNotes, setShowNotes] = useState<boolean>(false)

  return isOpen ? (
    <div className="extension">
      <ExtensionHeader />
      {preview ? (
        <>
          {showNotes ? (
            <Notes notes={notes} setShowNotes={setShowNotes} />
          ) : (
            <SavedScreen
              preview={preview}
              tags={tags}
              errorMessage={errorMessage}
              setShowNotes={setShowNotes}
            />
          )}
        </>
      ) : (
        <SavedLoader />
      )}
      {errorMessage ? <ExtensionError errorMessage={errorMessage} /> : null}
    </div>
  ) : null
}
