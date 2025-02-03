import style from './style.module.css'

import { DeleteIcon } from '@ui/icons/DeleteIcon'
import { NotesIcon } from '@ui/icons/NotesIcon'

// Types
import type { Dispatch, SetStateAction } from 'react'

export function SavedFooter({ setShowNotes }: { setShowNotes: Dispatch<SetStateAction<boolean>> }) {
  const handleNoteClick = () => setShowNotes(true)
  return (
    <footer className={style.footer}>
      <button onClick={handleNoteClick}>
        <NotesIcon /> Notes
      </button>
      <button>
        <DeleteIcon />
        UnSave
      </button>
    </footer>
  )
}
