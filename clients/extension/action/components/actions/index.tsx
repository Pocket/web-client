import style from './style.module.css'
import { IconSave } from '../icons/icon-save'
import { IconSnippets } from '../icons/icon-snippets'

export function SaveActions() {
  return (
    <main>
      <h2 className={style.title}>Save To Pocket</h2>
      <div className={style.actions}>
        <button>
          <IconSave /> Save Url
        </button>
        <button>
          <IconSnippets /> Add Clipping
        </button>
      </div>
    </main>
  )
}
