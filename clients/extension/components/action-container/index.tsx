import { useState } from 'react'
import { ExtensionError } from '../action-error'
import { ExtensionHeader } from '../action-header'
import { ActionLoader } from '../action-loader'
import { Notes } from '../notes'
import { SavedScreen } from '../saved'

// Types
import type { ExtItem } from '../../types'
import type { Dispatch, SetStateAction } from 'react'

export function ActionContainer({
  isOpen = false,
  errorMessage,
  noteStatus,
  setNoteStatus,
  item
}: {
  isOpen: boolean
  errorMessage?: string
  saveStatus?: string
  noteStatus?: string
  item?: ExtItem
  setNoteStatus: Dispatch<SetStateAction<string | undefined>>
  actionLogOut: () => void
  actionUnSave: () => void
}) {
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string | undefined>(errorMessage)

  const preview = item?.preview
  const notes = item?.savedItem?.notes
  const tags = item?.savedItem?.tags
  const suggestedTags = item?.savedItem?.suggestedTags

  return isOpen ? (
    <div className="extension">
      <ExtensionHeader />
      {item?.preview ? (
        <>
          {showNotes ? (
            <Notes
              noteStatus={noteStatus}
              notes={notes?.edges}
              setShowNotes={setShowNotes}
              setNoteStatus={setNoteStatus}
              setErrorText={setErrorText}
            />
          ) : (
            <SavedScreen
              preview={preview!}
              tags={tags}
              suggestedTags={suggestedTags}
              setShowNotes={setShowNotes}
            />
          )}
        </>
      ) : (
        <ActionLoader />
      )}
      {errorText ? <ExtensionError errorMessage={errorText} /> : null}
    </div>
  ) : null
}
