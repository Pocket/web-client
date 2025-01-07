import { SavedNotes } from '../saved-notes'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

import type { ExtPreview } from '../../types'
import type { NoteEdge } from '@common/types/pocket'

export function SavedScreen({
  preview,
  notes,
  tags
}: {
  preview: ExtPreview
  notes?: NoteEdge[]
  tags?: string[]
}) {
  return preview ? (
    <div>
      <SavedPreview preview={preview} />
      <hr />
      <SavedNotes notes={notes} />
      <SavedTags tags={tags} />
    </div>
  ) : null
}
