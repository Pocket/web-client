import style from './style.module.css'
import { SavedNotes } from '../saved-notes'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

import type { ExtPreview } from '../../types'
import type { NoteEdge } from '@common/types/pocket'

export function SavedScreen({
  preview,
  notes,
  tags,
  actionUnSave
}: {
  preview: ExtPreview
  notes?: NoteEdge[]
  tags?: string[]
  actionUnSave: () => void
}) {
  return preview ? (
    <div>
      <SavedPreview preview={preview} />
      <hr />
      <SavedNotes notes={notes} />
      <SavedTags tags={tags} />
      <div className={style.triggers}>
        <button onClick={actionUnSave}>Remove</button>
        {/* <button onClick={actionUnSave}>Update</button> */}
      </div>
    </div>
  ) : null
}
