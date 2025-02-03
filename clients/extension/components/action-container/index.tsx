import { useState } from 'react'
import { ExtensionError } from '../action-error'
import { ExtensionHeader } from '../action-header'
import { Notes } from '../notes'
import { SavedScreen } from '../saved'
import { SavedLoader } from '../saved-loader'

// Types
import type { ExtItem } from '../../types'

export function ActionContainer({
  isOpen = false,
  errorMessage,
  item
}: {
  isOpen: boolean
  errorMessage?: string
  saveStatus?: string
  item?: ExtItem
  actionLogOut: () => void
  actionUnSave: () => void
}) {
  const [showNotes, setShowNotes] = useState<boolean>(false)

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
            <Notes notes={notes?.edges} setShowNotes={setShowNotes} />
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
        <SavedLoader />
      )}
      {errorMessage ? <ExtensionError errorMessage={errorMessage} /> : null}
    </div>
  ) : null
}
