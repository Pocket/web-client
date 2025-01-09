import style from './style.module.css'

import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

import type { ExtPreview } from '../../types'
import type { NoteEdge } from '@common/types/pocket'

export function SavedScreen({
  preview,
  tags
}: {
  preview: ExtPreview
  notes?: NoteEdge[]
  tags?: string[]
}) {
  return preview ? (
    <div className={style.container}>
      <SavedPreview preview={preview} />
      <SavedTags tags={tags} />
    </div>
  ) : null
}
