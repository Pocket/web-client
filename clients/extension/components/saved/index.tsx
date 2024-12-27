import style from './style.module.css'
import { SavedNotes } from '../saved-notes'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

import type { ExtItem } from '@common/types'

export function SavedScreen({ item, actionUnSave }: { item: ExtItem; actionUnSave: () => void }) {
  return item ? (
    <div>
      <SavedPreview item={item} />
      <hr />
      <SavedNotes />
      <SavedTags />
      <div className={style.triggers}>
        <button onClick={actionUnSave}>Remove</button>
        {/* <button onClick={actionUnSave}>Update</button> */}
      </div>
    </div>
  ) : null
}
