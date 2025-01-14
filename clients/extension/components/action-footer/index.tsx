import style from './style.module.css'

import { DeleteIcon } from '../icons/DeleteIcon'
import { NotesIcon } from '../icons/NotesIcon'

export function ExtensionFooter({ errorMessage }: { errorMessage?: string }) {
  return (
    <footer className={style.footer}>
      <button>
        <NotesIcon /> Notes
      </button>
      <button>
        <DeleteIcon />
        UnSave
      </button>

      {errorMessage ? (
        <div className={style.error}>
          <hr />
          {errorMessage}
        </div>
      ) : null}
    </footer>
  )
}
