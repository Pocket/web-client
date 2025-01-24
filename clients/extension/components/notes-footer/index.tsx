import style from './style.module.css'
import { AddNoteIcon } from '../icons/AddNoteIcon'
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon'

// Types
import type { Dispatch, SetStateAction } from 'react'

export function NotesFooter({
  setShowNotes,
  handleAddNote = () => {}
}: {
  setShowNotes: Dispatch<SetStateAction<boolean>>
  handleAddNote: () => void
}) {
  const handleBackClick = () => setShowNotes(false)
  return (
    <footer className={style.footer}>
      <button onClick={handleBackClick}>
        <ChevronLeftIcon className={style.backIcon} /> Back
      </button>
      <button onClick={handleAddNote}>
        <AddNoteIcon /> Add Note
      </button>
    </footer>
  )
}
