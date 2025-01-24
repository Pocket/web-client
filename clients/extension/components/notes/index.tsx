import style from './style.module.css'
import { useRef } from 'react'
import { NotesAdd } from '../notes-add'
import { NotesFooter } from '../notes-footer'
import { NotesList } from '../notes-list'

// Types
import type { NoteEdge } from '@common/types/pocket'
import type { Dispatch, SetStateAction } from 'react'

export function Notes({
  notes,
  setShowNotes
}: {
  notes?: NoteEdge[]
  setShowNotes: Dispatch<SetStateAction<boolean>>
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const handleAddNote = () => {
    if (!textRef.current) return
    console.log(textRef.current.value)
  }
  return (
    <div>
      <div className={style.container}>
        <NotesList notes={notes} />
        <hr />
        <NotesAdd textRef={textRef} />
      </div>
      <NotesFooter setShowNotes={setShowNotes} handleAddNote={handleAddNote} />
    </div>
  )
}
