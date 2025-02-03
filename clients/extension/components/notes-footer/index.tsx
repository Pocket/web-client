import style from './style.module.css'
import { AddNoteIcon } from '@ui/icons/AddNoteIcon'
import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'

// Types
import type { Dispatch, SetStateAction } from 'react'

export function NotesFooter({
  setShowNotes,
  noteStatus,
  handleAddNote = () => {}
}: {
  setShowNotes: Dispatch<SetStateAction<boolean>>
  noteStatus: string | undefined
  handleAddNote: () => void
}) {
  const handleBackClick = () => setShowNotes(false)
  const handleAddClick = () => handleAddNote()
  const isLoading = Boolean(noteStatus)

  return (
    <footer className={style.footer}>
      <button onClick={handleBackClick}>
        <ChevronLeftIcon className={style.backIcon} /> Back
      </button>
      <button onClick={handleAddClick} disabled={isLoading}>
        <AddNoteIcon /> Add Note
      </button>
    </footer>
  )
}
