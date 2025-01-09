import style from './style.module.css'
import type { Note, NoteEdge } from '@common/types/pocket'

export function SavedNotes({ notes }: { notes?: NoteEdge[] }) {
  return (
    <div className={style.notes}>
      <label htmlFor="note">Add note</label>
      <textarea name="note" id="note"></textarea>
      {Array.isArray(notes) && notes.length
        ? notes.map((note) => <Note key={note?.cursor} note={note} />)
        : null}
    </div>
  )
}

function Note({ note }: { note?: NoteEdge }) {
  const node = note?.node
  const contentPreview = node?.contentPreview as string
  return contentPreview ? <div>{contentPreview}</div> : null
}
