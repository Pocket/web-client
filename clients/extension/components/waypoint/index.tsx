import style from './style.module.css'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SnippetsIcon } from '@ui/icons/SnippetsIcon'

export function SaveActions({ actionSave }: { actionSave: () => void }) {
  return (
    <main>
      <h2 className={style.title}>Save To Pocket</h2>
      <div className={style.actions}>
        <button onClick={actionSave}>
          <SaveIcon /> Save Url
        </button>
        <button>
          <SnippetsIcon /> Add Clipping
        </button>
      </div>
    </main>
  )
}
