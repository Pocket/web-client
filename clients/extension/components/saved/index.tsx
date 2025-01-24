import style from './style.module.css'

import { SavedFooter } from '../saved-footer'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

//TYpes
import type { ExtPreview } from '../../types'
import type { Dispatch, SetStateAction } from 'react'

export function SavedScreen({
  preview,
  errorMessage,
  tags,
  setShowNotes
}: {
  preview: ExtPreview
  tags?: string[]
  errorMessage?: string
  setShowNotes: Dispatch<SetStateAction<boolean>>
}) {
  console.log(errorMessage)
  return preview ? (
    <div>
      <div className={style.container}>
        <SavedPreview preview={preview} />
        <SavedTags tags={tags} />
      </div>
      <SavedFooter setShowNotes={setShowNotes} />
    </div>
  ) : null
}
