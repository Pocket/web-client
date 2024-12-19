import style from './style.module.css'
import { IconSave } from '../icons/icon-save'
import { SavedNotes } from '../saved-notes'
import { SavedPreview } from '../saved-preview'
import { SavedTags } from '../saved-tags'

export function SavedScreen({ actionUnSave }: { actionUnSave: () => void }) {
  return (
    <main>
      <h2 className={style.title}>Saved To Pocket!</h2>
      <SavedPreview />
      <SavedNotes />
      <SavedTags />
      <div className={style.triggers}>
        <button onClick={actionUnSave}>
          <IconSave /> Remove from Saves
        </button>
      </div>
    </main>
  )
}
