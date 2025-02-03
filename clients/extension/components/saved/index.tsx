import style from './style.module.css'

import { SavedFooter } from '../saved-footer'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

//Types
import type { ExtPreview } from '../../types'
import type { Tag } from '@common/types/pocket'
import type { Dispatch, SetStateAction } from 'react'

export function SavedScreen({
  preview,
  tags,
  suggestedTags,
  setShowNotes
}: {
  preview: ExtPreview
  tags?: Tag[]
  suggestedTags?: Tag[]
  setShowNotes: Dispatch<SetStateAction<boolean>>
}) {
  return preview ? (
    <div>
      <div className={style.container}>
        <SavedPreview preview={preview} />
        <SavedTags tags={tags} suggestedTags={suggestedTags} />
      </div>
      <SavedFooter setShowNotes={setShowNotes} />
    </div>
  ) : null
}
